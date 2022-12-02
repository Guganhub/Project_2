var label = document.getElementById('label')
var shopCart = document.getElementById('shop-cart')

var bas = JSON.parse(localStorage.getItem("localData")) || []


var cartItems = () => {
    if (bas.length != 0) {
        //console.log("bas")
        return shopCart.innerHTML = bas.map((e) => {
            //console.log(e)
            var { id, item } = e
            var search = shopArrData.find((f) => f.id === id) || []
            return `
            <div class="cartItem">
             <img width="100" src =${search.img}>
                 <div class="details">
                   <div class="titlePrice">
                        <h4 class="titlePrices">
                        <p>${search.name}</p>
                        <p><i  class="fa-solid fa-indian-rupee-sign"></i>${search.price}</p>
                        </h4>
                        <i onclick="removeProduct(${id})" class="fa-solid fa-x"></i>
                    </div>
                    <div class="buttons">
                            <i onclick="dec(${e.id})" class="fa-solid fa-minus"></i>
                                <div id=${e.id} class="quantity">
                                ${item}
                                </div>
                            <i onclick="inc(${e.id})" class="fa-solid fa-plus"></i>
                    </div>
                    <h4><i  class="fa-solid fa-indian-rupee-sign"></i>${item*search.price}</h4>
                </div>
             </div>`
             

        }).join("")

    }
    else {
        shopCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="./home.html">
        <button class=homeButton>Back to home</button>
        </a>`
        //console.log("bas empty")
    }
}
cartItems()


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
    cartItems()
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
    cartItems()
    localStorage.setItem("localData",JSON.stringify(bas))

}

//To update the quantity
var update=(id)=>{
    var search=bas.find((e)=>e.id===id)
    //console.log(search.item)
    document.getElementById(id).innerHTML=search.item
    //cal()
    tAmount()
}

var removeProduct=(id)=>{
    var selectItem=id
    //console.log(selectItem.id)
    bas=bas.filter((e)=>e.id!=selectItem.id)
    cartItems()
    tAmount()

    localStorage.setItem("localData",JSON.stringify(bas))

}

var clearCart=(()=>{
    bas=[]
    cartItems()
    localStorage.setItem("localData",JSON.stringify(bas))
    //console.log("hi")

})

var checkout=()=>{
    window.location.href=('./payment.html')
}



var tAmount=(()=>{
    if(bas.length!=0){
        var amount=bas.map((e)=>{
            var {item,id}=e
            var search=shopArrData.find((y)=>y.id==id)||[]
            return item * search.price
        })
        .reduce((e,f)=>e+f,0)
        label.innerHTML=`
        <h2>Total Bill:<i  class="fa-solid fa-indian-rupee-sign"></i> ${amount}</h2>
        <button onclick="checkout()" class="checkout">Checkout</button>
        <button onclick="clearCart()" class="clear">Clear Cart</button>`
    }
    else{
        return
    }
})
tAmount()