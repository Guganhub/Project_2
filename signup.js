async function createUserData(){
    var firstname = document.getElementById('firstName')
    var lastname = document.getElementById('lastName')
    //console.log(firstname)
    var email=document.getElementById('email')
    var password= document.getElementById('password1')
    var confirmPassword= document.getElementById('password2')
    let url='https://6350df033e9fa1244e4f268b.mockapi.io/miniproject'
     var newUser={
        "firstname":`${firstname.value}`,
        "lastname":`${lastname.value}`,
        "email":`${email.value}`,
        "password":`${password.value}`,
        "confirmPassword":`${confirmPassword.value}`
     }
     if(firstname.value.trim()==""){
      //   document.getElementById('message').innerHTML="provide firstname"
        alert("Please provide firstname")

     }
     else if(lastname.value.trim()==""){
      
        alert("Please provide lastname")
     }
     else if(email.value==""){
        alert("please provide email")
     }
     else if(password.value==""){
        alert("please provide password")
     }
     else if(password.value.length<=5){
        alert("Password should be minimum of 5 characters")
     }
     else if(confirmPassword.value==""){
      alert("Please provide confirm password")
     }
     else if(confirmPassword.value!=password.value){
        alert("confirm password should be same as password entered")
     }
     

     else{

      
        var data = await fetch(url,{
            method:"POST",
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify(newUser)
        })
        

        //console.log(data)
        var res = await data.json()
        console.log(res)
        console.log(firstname.value,lastname.value)
        openPopup();
        }
      
        

     }
     var popup= document.getElementById('popup')
      function openPopup(){
      popup.classList.add("open-popup")
      var boy=document.getElementById('boy')
      boy.classList.add('boy-hid')
      }
    
     
     



//createUserData()

