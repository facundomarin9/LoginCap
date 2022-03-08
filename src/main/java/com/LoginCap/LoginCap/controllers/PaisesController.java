/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.LoginCap.LoginCap.controllers;

import com.LoginCap.LoginCap.dao.PaisDao;
import com.LoginCap.LoginCap.models.Pais;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author rauux1
 */

@Repository
@Transactional
public class PaisesController implements PaisDao {
    
    @Autowired
    private PaisDao paisDao;
    
      @RequestMapping(value = "api/paises", method = RequestMethod.GET)
    public List<Pais> getPaises(){
    
    return paisDao.getPaises();
    }
    
}
