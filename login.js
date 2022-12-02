async function login(){
    var email=document.getElementById('email1').value
    //console.log(email)
    var password=document.getElementById('password1').value
    const url='https://6350df033e9fa1244e4f268b.mockapi.io/miniproject'
    var res= await fetch(url)
    var data= await res.json(url)
    for(obj of data){
        console.log(obj)
        if(email===obj.email && password===obj.password){
            //console.log(obj.email)
           // console.log(obj.password)
            console.log('success')
            window.location.href=('./home.html')
        }
        else{
            alert("Enter Valid Email and Password")
            window.location.href=("./login.html")

            console.log("err")
        }

    }
}