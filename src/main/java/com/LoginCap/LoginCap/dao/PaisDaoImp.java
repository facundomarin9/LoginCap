/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.LoginCap.LoginCap.dao;

import com.LoginCap.LoginCap.models.Pais;
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
public class PaisDaoImp implements PaisDao {

    @PersistenceContext
   private EntityManager entityManager ;
    
    @Override
    @Transactional
    public List<Pais> getPaises() {
        
        String query = "FROM Pais";
        
        return entityManager.createQuery(query).getResultList();
        
    }
    
}
