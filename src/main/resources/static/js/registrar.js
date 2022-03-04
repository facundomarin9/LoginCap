$(document).ready(function(){
    
    //on ready
    
});

async function registrarUsuario(){
    
    let datos= {};
    datos.nombre= document.getElementById('boxFirstName').value;
    datos.apellido = document.getElementById('boxLastName').value;
    datos.email = document.getElementById('boxInputEmail').value;
    datos.password = document.getElementById('boxInputPassword').value;
    
    let repeatPassword = document.getElementById('boxRepeatPassword').value;
    
    if (repeatPassword !== datos.password){
        alert("Contraseñas Erroneas");
        return;
    }
    
    const request = await fetch('api/usuarios',{
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    
    alert("La cuenta fue creada con éxito");
    
    window.location.href= 'login.html';
    
}