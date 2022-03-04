/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.LoginCap.LoginCap.controllers;

import com.LoginCap.LoginCap.dao.UsuarioDao;
import com.LoginCap.LoginCap.models.Usuario;
import com.LoginCap.LoginCap.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Los controladores sirven para manejar las url. El usuario si ingresa a
 * nuestra web con estos controladores podemos devolver "algo". TRABAJA COMO LAS
 * RUTAS!!!
 *
 * @author rauux1
 */
@RestController
public class UsuarioController {

    @Autowired
    private UsuarioDao usuarioDao;
    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/usuario/{id}", method = RequestMethod.GET)//Seteamos el nombre de la ruta
    public Usuario getUsuario(@PathVariable Long id) { //@PathVariable se usa para decirle que tome el valor del id de la ruta

        Usuario usuario = new Usuario();
        usuario.setId(id);
        usuario.setNombre("Martin");
        usuario.setApellido("Palermo");
        usuario.setEmail("martin@gmail.com");
        usuario.setTelefono("1122334455");
        usuario.setPassword("12345");

        return usuario;

    }

    @RequestMapping(value = "api/usuarios", method = RequestMethod.GET)//Seteamos el nombre de la ruta
    public List<Usuario> getUsuarios(@RequestHeader(value = "Authorization") String token) {

        if(!validateToken(token)){return null;}

        return usuarioDao.getUsuarios();

    }

    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value = "Authorization") String token, @PathVariable long id) {
        if(!validateToken(token)){return;}
        usuarioDao.eliminar(id);

    }

    @RequestMapping(value = "api/usuarios", method = RequestMethod.POST)
    public void agregar(@RequestBody Usuario usuario) {

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);

        char[] password = usuario.getPassword().toCharArray();

        String hash = argon2.hash(1, 1024, 1, password);

        usuario.setPassword(hash);

        usuarioDao.registrar(usuario);

    }

    private boolean validateToken(String token) {

        String usuarioId = jwtUtil.getKey(token);

        return usuarioId != null;

    }

}
