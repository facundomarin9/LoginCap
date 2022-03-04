/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.LoginCap.LoginCap.controllers;

import com.LoginCap.LoginCap.dao.UsuarioDao;
import com.LoginCap.LoginCap.models.Usuario;
import com.LoginCap.LoginCap.utils.JWTUtil;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author facun
 */

@Configuration
@RestController
public class AuthController {

   @Autowired
   private UsuarioDao usuarioDao;
   
   @Autowired 
   private JWTUtil jwtUtil;
    
    @RequestMapping(value="api/login", method = RequestMethod.POST)
    public String login(@RequestBody Usuario usuario) throws IOException, ServletException{
        
        Usuario userLoggeado= usuarioDao.getCredenciales(usuario);
        
       if(userLoggeado != null){
           
           System.out.println(String.valueOf(userLoggeado.getId()) + " " + userLoggeado.getEmail());
         String tokenJwt = jwtUtil.create(String.valueOf(userLoggeado.getId()), userLoggeado.getEmail());
           
         return tokenJwt;
           
           
       
       }
           return "FAIL";
       
        
    
}
    
}
