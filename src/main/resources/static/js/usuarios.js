$(document).ready(function () {
    cargarUsuarios();
    getCountries();
    $('#usuarios').DataTable();
    setEmailUser();
});

async function cargarPersonas() {

    const request = await fetch('api/personas', {
        method: 'GET',
        headers: getHeaders()
    });

    return await request.json();

}

async function cargarUsuarios() {

    const personas = await cargarPersonas();



    const request = await fetch('api/usuarios', {
        method: 'GET',
        headers: getHeaders()


    });
    const usuarios = await request.json();



    let listadoHTML = '';

    for (let usuario of usuarios) {
        for (let i = 0; i < usuarios.length; i++) {

            if (usuario.persona_idpersona === personas[i].id) {

                let btnDelete = '<a onclick="eliminarUsuario(' + usuario.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>\n\
                               <a onclick="rellenarModalUsuario('+usuario.id+')" class="btn btn-danger btn-circle btn-sm" data-toggle="modal" data-target="#updateModal"><i class="bi bi-pencil-fill"></i></a>';
                let personaTelefono = personas[i].telefono === null ? '-' : personas[i].telefono;
                let usuarioHTML = '<tr>\n\
                      <td>' + usuario.id + '</td><td>' + personas[i].nombre + ' ' + personas[i].apellido + '</td>\n\
                      <td>' + personaTelefono + '</td><td>' + usuario.correo + '</td><td>******</td>\n\
                      <td> ' + btnDelete + '\n\
                      </td>\n\
                      </tr>';
                listadoHTML += usuarioHTML;


            }


        }

    }


    console.log(usuarios);


    document.querySelector('#usuarios tbody').outerHTML = listadoHTML;



}

async function editarUsuario(idUser, idPer) {
    
    
    
    if (!confirm('¿Desea actualizar este usuario?')) {
        return;
    }else{
        
        const personaHtml = {};
        const usuarioHtml = {};

    personaHtml.nombre = document.getElementById('boxFirstName').value;
    personaHtml.apellido = document.getElementById('boxLastName').value;
    usuarioHtml.correo = document.getElementById('boxInputEmail').value;
    usuarioHtml.password = document.getElementById('boxInputPassword').value;
    usuarioHtml.nick = document.getElementById('boxNick').value;
    personaHtml.telefono = document.getElementById('boxInputTelefono').value;
    personaHtml.pais_idpais = document.getElementById('boxSelect').value;

    const request = await fetch('api/personas/'+idUser, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(personaHtml)
    });
    
//    const request2 = await fetch('api/usuarios/'+idUser, {
//        method: 'PUT',
//        headers: {
//            'Accept': 'application/json',
//            'Content-Type': 'application/json',
//            'Authorization': localStorage.token
//        },
//        body: JSON.stringify(usuarioHtml)
//    });
    
    }
}

async function getOneUser(id) {


    const request = await fetch('api/usuarios/'+id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }
    });

    return await request.json();

}

async function getOnePerson(id) {


    const request = await fetch('api/personas/'+id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }
    });

    return await request.json();

}



async function rellenarModalUsuario(id) {

    document.getElementById('boxSelect').value = "a";
    const usuario = await getOneUser(id);
    const persona = await getOnePerson(usuario[0].persona_idpersona);
   


    document.getElementById('boxFirstName').value = persona[0].nombre;
    document.getElementById('boxLastName').value = persona[0].apellido;
    document.getElementById('boxInputEmail').value = usuario[0].correo;
    document.getElementById('boxInputPassword').value = "*****";
    document.getElementById('boxNick').value = usuario[0].nick;
    document.getElementById('boxInputTelefono').value = persona[0].telefono;
    document.getElementById('boxSelect').value = persona[0].pais_idpais;
     
     
     document.querySelector("#updateUser div").outerHTML = "<button class='btn btn-secondary' type='button' data-dismiss='modal'>Cancel</button>\n\
                                                            <a class='btn btn-primary' onclick='editarUsuario("+id+","+usuario[0].persona_idpersona+")'>Save</a>";
  
  
//  '<a class="btn btn-primary" onclick="editarUsuario('+id, usuario[0].persona_idpersona+')">Save</a>\n\
//                          <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>';
  
}



async function eliminarUsuario(id) {


    if (!confirm('¿Desea eliminar este usuario?')) {
        return;
    }

    const request = await fetch('api/usuarios/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }
    });

    location.reload();


}

async function traerUsuarios() {

    const request = await fetch('api/usuarios', {
        method: 'GET',
        headers: getHeaders()

    });

    return await request.json();

}

function getHeaders() {

    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    };
}

function setEmailUser() {


    document.getElementById('user_name_xxx').outerHTML = localStorage.correo;


}

async function getCountries() {



    let selectF = "<option selected >Select country</option>";

    const request = await fetch('api/paises', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const paises = await request.json();

    for (p of paises) {

        selectF += "<option value=" + p.idpais + ">" + p.paisname + "</option>"

    }

    document.querySelector('#boxSelect option').outerHTML = selectF;
    
    
    
    return paises;
}