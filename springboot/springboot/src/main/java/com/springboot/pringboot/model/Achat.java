package com.springboot.pringboot.model;

import jakarta.persistence.*;

import lombok.Data;

@Data
@Entity
@Table(name="Achat")
public class Achat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;

    @Column(name="INVENTAIREID")
    private String inventaireId;

    @Column(name="UTILISATEURID")
    private String utilisateurId;

    @Column(name="PRIX")
    private double prix;

//    @ManyToOne
//    @JoinColumn(name="INVENTAIREID", referencedColumnName = "CODE" , insertable = false, updatable = false)
//    private Inventaire inventaire;
//
//    // Establishing relationship with Utilisateur entity based on utilisateurId
//    @ManyToOne
//    @JoinColumn(name="UTILISATEURID", referencedColumnName = "IDENTITY", insertable = false, updatable = false)
//    private Utilisateur utilisateur;


}
