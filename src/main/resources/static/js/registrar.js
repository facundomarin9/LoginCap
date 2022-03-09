$(document).ready(function(){
    
    getCountries();
    
});

async function getCountries(){
    
    
    
  let selectF =  "<option selected >Select country</option>";
  
  const request = await fetch('api/paises', {
      method: 'GET',
      headers: {
          'Accept':'application/json',
          'Content-Type': 'application/json'
      }
  });
  
  const paises = await request.json();
   
   for(p of paises){
       
       selectF += "<option value="+p.idpais+">"+p.paisname+"</option>"
       
   }
    
    document.querySelector('#boxSelect option').outerHTML = selectF;
}

async function registrarUsuario(){
    
    let usuario= {};
    let persona={};
    persona.nombre= document.getElementById('boxFirstName').value;
    persona.apellido = document.getElementById('boxLastName').value;
    usuario.correo = document.getElementById('boxInputEmail').value;
    usuario.password = document.getElementById('boxInputPassword').value;
    usuario.nick = document.getElementById('boxNick').value;
    persona.telefono = document.getElementById('boxInputTelefono').value;
    persona.pais_idpais = document.getElementById('boxSelect').value;
    
    let obj = Object.assign({usuario},{persona});
    let repeatPassword = document.getElementById('boxRepeatPassword').value;
    
    if (repeatPassword !== usuario.password){
        alert("Contraseñas Erroneas");
        return;
    }
    
     const request = await fetch('api/personas',{
        
           method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(persona)
        
    });
    
  
       const request2 = await fetch('api/usuarios',{
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });
    
   
    
    alert("La cuenta fue creada con éxito");
       
   
    
    
    
    window.location.href= 'login.html';
    
}

//async function traerUltIdPer(){
//    const request = await fetch('api/personasid',{
//         method: 'GET',
//        headers: {
//            'Accept':'application/json',
//            'Content-Type': 'application/json'
//        }
//        
//    });
//    
//    const ultIdPer = await request.json();
//    
//    
//}