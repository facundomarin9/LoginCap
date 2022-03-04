$(document).ready(function() {
   
  setEmailUser();
});


function setEmailUser(){
    
    
    document.getElementById('user_name_xxx').outerHTML = localStorage.email;
    
    
}