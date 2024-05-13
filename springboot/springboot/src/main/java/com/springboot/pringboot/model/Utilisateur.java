package com.springboot.pringboot.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="Utilisateurs")
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;

    @Column(name="NOM")
    private String nom;

    @Column(name="ROLE")
    private String role;

    @Column(name="TELEPHONE")
    private long telephone;

    @Column(name="ADDRESSE")
    private String adresse;

    @Column(name="CODEPOSTAL")
    private String codePostal;


    @Column(name="IDENTITY")
    private String identity;

    @Column(name="PASSWORD")
    private String password;

    @PrePersist
    public void setRoleAutomatically() {
        this.role = (identity.equals("admin") ) ? "admin" : "user";
    }

}
