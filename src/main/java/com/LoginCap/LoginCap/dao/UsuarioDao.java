/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.LoginCap.LoginCap.dao;

import com.LoginCap.LoginCap.models.Persona;
import com.LoginCap.LoginCap.models.Usuario;
import java.util.List;

/**
 *
 * @author rauux1
 */
public interface UsuarioDao {
    
    List <Usuario> getUsuarios();
    

    void eliminar(long id);
   
    void registrar(Usuario usuario);
    
    List<Usuario> getUserId(long id);
    
    Usuario getCredenciales(Usuario usuario);
    
    void editarUsuario(long id, Usuario usuario);
    
}
