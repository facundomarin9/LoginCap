/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.LoginCap.LoginCap.dao;

import com.LoginCap.LoginCap.models.Persona;
import com.LoginCap.LoginCap.models.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


/**
 *
 * @author rauux1
 */

@Repository
@Transactional
public class UsuarioDaoImp implements UsuarioDao{
   
   @PersistenceContext
   private EntityManager entityManager ;

    @Override
    @Transactional
    public List<Usuario> getUsuarios() {
    
        String query = "FROM Usuario";
       
        return entityManager.createQuery(query).getResultList();
    
    
    }
    
    

    @Override
    public void eliminar(long id) {
        
        Usuario usuario = entityManager.find(Usuario.class, id);
        long idpersona = usuario.getPersona_idpersona();
        Persona persona = entityManager.find(Persona.class, idpersona);
        entityManager.remove(usuario);
        entityManager.remove(persona);
        
        
   
    }
    
    
    
    


    @Override
    public void registrar(Usuario usuario) {
        
        
        entityManager.merge(usuario);
        
    }

    @Override
    public Usuario getCredenciales(Usuario usuario) {
        
       String query = "FROM Usuario WHERE correo = :correo"; 
       List<Usuario> lista = entityManager.createQuery(query)
               .setParameter("correo", usuario.getCorreo())
               .getResultList();
       
       if(lista.isEmpty()){
       return null;
       }
       
       String passwordHashed = lista.get(0).getPassword();
       
       
      Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
       
      if(argon2.verify(passwordHashed, usuario.getPassword().toCharArray())){
      
      
         
          return lista.get(0);
      
      }
      
      
      return null;
                        
               
       
    
    }

    @Override
    public List<Usuario> getUserId(long id) {
        
        String query = "FROM Usuario WHERE idusuario = :id";
       List<Usuario> lista = entityManager.createQuery(query)
               .setParameter("id", id)
               .getResultList();
       
        return lista;
        
    }

    @Override
    public void editarUsuario(long id, Usuario usuario) {
        
        entityManager.merge(usuario);
        
    }

   

    
    
    
}
