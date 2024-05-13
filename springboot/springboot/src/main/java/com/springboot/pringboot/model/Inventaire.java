package com.springboot.pringboot.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="Inventaires")
public class Inventaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;

    @Column(name="CODE")
    private String codeinventaire;

    @Column(name="PAYS")
    private String pays;

    @Column(name="Image")
    private String image;

    @Column(name="DATE")
    private String date;

    @Column(name="TYPE")
    private String type;

    @Column(name="PRIX")
    private double prix;

}
