// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarUsuarios();
  $('#usuarios').DataTable();
  setEmailUser();
});

async function cargarUsuarios(){
    
    
  const request = await fetch('api/usuarios', {
    method: 'GET',
    headers: getHeaders()
   
   
  });
  const usuarios = await request.json();
  let listadoHTML = '';
  
  for(let usuario of usuarios){
   let btnDelete = '<a onclick="eliminarUsuario('+usuario.id+')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
   let usuarioTelefono = usuario.telefono === null ? '-' : usuario.telefono;
   let usuarioHTML = '<tr>\n\
                      <td>'+usuario.id+'</td><td>'+usuario.nombre+ ' '+usuario.apellido+'</td>\n\
                      <td>'+usuarioTelefono+'</td><td>'+usuario.email+'</td><td>******</td>\n\
                      <td> '+btnDelete+'\n\
                      </td>\n\
                      </tr>';
        listadoHTML += usuarioHTML;
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
