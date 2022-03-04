$(document).ready(function(){
    
    setEmailUser();
    
});

async function startedSession(){
    
    let datos= {};
    datos.email = document.getElementById('boxInputEmail').value;
    datos.password = document.getElementById('boxInputPassword').value;
    
   
    
    const request = await fetch('api/login',{
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    
    const respuesta = await request.text();
    
    console.log(respuesta);
    if(respuesta != 'FAIL'){
        
        localStorage.token = respuesta;
        localStorage.email = datos.email;
        window.location.href = 'usuarios.html'
 
    }else{
        alert("Las credenciales son incorrectas. Por favor intente nuevamente");
    }
    
}


function cleanSess(){
    
    localStorage.clear();
    window.location.href = "login.html";
    
}

function setEmailUser(){
    
    
    document.getElementById('user_name_xxx').outerHTML = localStorage.email;
    
    
}