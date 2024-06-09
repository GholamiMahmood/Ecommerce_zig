package com.springboot.pringboot.controllers;
import com.springboot.pringboot.jpa_repository.InventaireRepository;
import com.springboot.pringboot.model.Achat;

import com.springboot.pringboot.jpa_repository.AchatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/api")
public class AchatController {
    @Autowired
    private AchatRepository achatRepository;
    /*
    pour test en postman
    http://localhost:8080/api/achat/create
     {
      "inventaireId":"mn2154",
      "utilisateurId": "MR2015",
      "prix": 50.99

    }
    ***************************************************
        [
          {
            "inventaireId": "KKKK",
            "utilisateurId": "KKK",
            "prix": 50.99
          },
          {
            "inventaireId": "AAAA",
            "utilisateurId": "BBB",
            "prix": 30.50
          }
        ]
        =====================================
        Lorsqu'une personne achète un article, il doit être ajouté à
        la table Achat et retiré de la table Inventaire.Par conséquent,
         la valeur de la variable vendu doit être mise à jour à true
         selon le code de l'inventaire. Pour ce faire :

         1- On crée une méthode dans la classe Inventaire qui effectue cette opération.
         2- On utilise cette méthode dans notre méthode actuelle.
     */

    @Autowired
    private InventaireRepository inventaireRepository;

    @PostMapping("/achat/create")
    public ResponseEntity<List<Achat>> createAchat(@RequestBody List<Achat> achats) {
        try {
            List<Achat> savedAchats = achatRepository.saveAll(achats);

            savedAchats.forEach(achat -> inventaireRepository.updateVenduByCode(true, achat.getInventaireId()));

            return ResponseEntity.status(HttpStatus.CREATED).body(savedAchats);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}