$(document).ready(function() {
    cargarUsuarios();
  $('#usuarios').DataTable();
  setEmailUser();
});

async function cargarPersonas(){
    
      const request = await fetch('api/personas', {
      method: 'GET',
      headers: getHeaders()
  });
  
  return await request.json();
  
}

async function cargarUsuarios(){
    
   const personas = await cargarPersonas();
   
  
    
  const request = await fetch('api/usuarios', {
    method: 'GET',
    headers: getHeaders()
   
   
  });
  const usuarios = await request.json();
  

  
  let listadoHTML = '';
  
  for(let usuario of usuarios){
      for(let i = 0; i < usuarios.length; i++){
          
          if(usuario.persona_idpersona === personas[i].id){
              
              let btnDelete = '<a onclick="eliminarUsuario('+usuario.id+')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
   let personaTelefono = personas[i].telefono === null ? '-' : personas[i].telefono;
   let usuarioHTML = '<tr>\n\
                      <td>'+usuario.id+'</td><td>'+personas[i].nombre+ ' '+personas[i].apellido+'</td>\n\
                      <td>'+personaTelefono+'</td><td>'+usuario.correo+'</td><td>******</td>\n\
                      <td> '+btnDelete+'\n\
                      </td>\n\
                      </tr>';
        listadoHTML += usuarioHTML;
              
              
          }
           
          
      }
  
 }
  

  console.log(usuarios);
 
  
  document.querySelector('#usuarios tbody').outerHTML = listadoHTML;
  
    
    
}



async function eliminarUsuario(id){
    
     
     if(!confirm('¿Desea eliminar este usuario?')){
         return;
     }
       
  const request = await fetch('api/usuarios/'+id, {
    method: 'DELETE',
    headers:getHeaders(),
   
  });
 
 location.reload();
 
    
}


function getHeaders(){
    
   return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.token
    };
}

function setEmailUser(){
    
    
    document.getElementById('user_name_xxx').outerHTML = localStorage.email;
    
    
}
