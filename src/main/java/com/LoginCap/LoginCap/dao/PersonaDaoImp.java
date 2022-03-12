/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.LoginCap.LoginCap.dao;

import com.LoginCap.LoginCap.models.Persona;
import com.LoginCap.LoginCap.models.Usuario;
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
public class PersonaDaoImp implements PersonaDao {

    @PersistenceContext
   private EntityManager entityManager ;
    
   @Override
    @Transactional
    public List<Persona> getPersona() {
    
        String query = "FROM Persona";
       
        return entityManager.createQuery(query).getResultList();
    
    
    }

    @Override
    public void registrar(Persona persona) {
        
         entityManager.merge(persona);

    }

    @Override
    public List <Long> getId() {
        
        String query = ("SELECT MAX(id) AS id FROM Persona");
        
        return entityManager.createQuery(query).getResultList();
        
    }

    @Override
    public List<Persona> getPersonId(long id) {
        
        String query = "FROM Persona WHERE idpersona = :id";
       List<Persona> lista = entityManager.createQuery(query)
               .setParameter("id", id)
               .getResultList();
       
        return lista;
        
    }

    @Override
    public void editarPersona(long id, Persona persona) {
        
       
        entityManager.merge(persona);
                
        
    }
    
    
    
    
    
    
    
    
    
}
