/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.LoginCap.LoginCap.dao;

import com.LoginCap.LoginCap.models.Persona;
import java.util.List;

/**
 *
 * @author rauux1
 */
public interface PersonaDao {
    
    List <Persona> getPersona();
    
    void registrar(Persona persona);
    List<Long> getId();
    
}
