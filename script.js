var title= document.querySelectorAll('.card-title')
//console.log(title)
var taskDiv=document.getElementById('productDiv')

//Add product
function addProduct(){
    console.log("Product Added")
    createDiv()
    title.value=""
}
//New div for the created product
function createDiv(){
    var productDiv=document.createElement('div')
    productDiv.classList.add("card","w-25","m-3")
    productDiv.innerHTML=`
    <div class="col product">
    <div class="card">
                <img src="./atta.jpg" class="card-img-top" alt="colaimage">
                <div class="card-body d-flex justify-content-between">
                    <h5 class="card-title">Atta ₹350</h5>
                    <!-- <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> -->
                    <button>Add Item</button>
                </div>
                <div class="button">
                    <button type="button" class="btn btn-primary">Edit Product</button>
                    <button type="button" class="btn btn-danger"onclick="deleteProduct()">Delete Product</button>
                </div>
            </div>
    </div>
    `
    taskDiv.append(productDiv)
}


// Delete product
function deleteProduct(id){
    var deleteReq="Are you sure to delete the product"
    if(confirm(deleteReq)==true){
        document.getElementById("productDiv").remove()
        
        }
}



var shop= document.getElementById('shop')


var bas=JSON.parse(localStorage.getItem("localData"))|| []
var createShop=()=>{
    return (shop.innerHTML= shopArrData.map((e)=>{
        var search=bas.find((f)=>f.id===e.id)||[]
        return `
        <div id=product-id ${e.id} class="item">
                <img width="175" src=${e.img} alt="" srcset="">
                <div class="item-details">
                    <h3>${e.name}</h3>
                    <div class="price-quantity">
                        <h4><i  class="fa-solid fa-indian-rupee-sign"></i>${e.price}</h4>
                        <div class="buttons">
                            <i onclick="dec(${e.id})" class="fa-solid fa-minus"></i>
                            <div id=${e.id} class="quantity">
                                ${search.item===undefined? 0 : search.item}
                            </div>
                           
                            <i onclick="inc(${e.id})" class="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </div>
                
            </div>
        `
    }).join(""))
}
createShop()


var search=()=>{
    var searchBox=document.getElementById("search-item").value.toUpperCase();
    var storeItems=document.getElementById("shop")
    var product=document.querySelectorAll(".item")
    var pname=document.getElementsByTagName("h3")
    // console.log(pname.length)
    for(var i=0;i<pname.length;i++){
        let match= product[i].getElementsByTagName('h3')[0]
        // console.log(match)
        if(match){
           var textValue= match.textContent|| match.innerHTML;
        //    console.log(textValue)
        
           if(textValue.toUpperCase().indexOf(searchBox)>-1){
            // console.log(indexOf(searchBox))
            product[i].style.display=" ";
           }else{
            product[i].style.display="none";
                        
           }
        }
        // console.log(match)
    }
}
createShop()



// To increment the quantity
var inc=(id)=>{
    var selectItem=id;

    //search for the product to select in
    var search= bas.find((e)=>e.id===selectItem.id)

    // if product is not there push into the bas
    if(search===undefined){
        bas.push({
            id:selectItem.id,
            item:1
        })
        
    // if it is already present increment the item quantity
    }
    else{
        search.item+=1
    }
    // console.log(bas)
    update(selectItem.id)

    localStorage.setItem("localData",JSON.stringify(bas))


}

//To decrement the quantity
var dec=(id)=>{
    var selectItem=id
    //search for the product to select in
    var search= bas.find((e)=>e.id===selectItem.id)

    //if the local storage is empty it should do nothing
    if(search===undefined){
        return
    }

    // if product is not there push into the bas
    else if(search.item===0){
       return
        }
        
    // if it is already present decrement the item quantity
    
    else{
        search.item-=1
    }
    update(selectItem.id)

    bas=bas.filter((e)=>e.item!=0)
    // console.log(bas)

    localStorage.setItem("localData",JSON.stringify(bas))

}

//To update the quantity
var update=(id)=>{
    var search=bas.find((e)=>e.id===id)
    //console.log(search.item)
    document.getElementById(id).innerHTML=search.item
    cal()
}


var cal=()=>{
   // console.log("cal is runnig")
    var cartAmount=document.getElementById('cart-amount')
    cartAmount.innerHTML=bas.map((e)=>e.item).reduce((e,f)=>e+f,0)

}
cal()