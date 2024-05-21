package com.springboot.pringboot.controllers;
import com.springboot.pringboot.model.Inventaire;

import com.springboot.pringboot.jpa_repository.InventaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import java.awt.*;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class InventaireController {

    @Autowired
    private InventaireRepository inventaireRepository;
    /*
    pour test en postman
    http://localhost:8080/api/inventory/create
     {
          "codeinventaire": "MR412",
          "pays": "Canada",
          "image": "sample_image.jpg",
          "date": "2024-03-28",
          "type": "Sample Type",
          "prix": 10.99
        }
     */
    @PostMapping("/inventory/create")
    public ResponseEntity<Inventaire> createInventaire(@RequestBody Inventaire inventaire) {

        try {
            if (inventaireRepository.existsByCodeinventaire(inventaire.getCodeinventaire())) {
                // article already exists, return NOT_FOUND
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            Inventaire _inventaire = inventaireRepository.save(inventaire);
            return new ResponseEntity<>(_inventaire,HttpStatus.CREATED);
        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/inventory/delete/{codeinventaire}")
    public ResponseEntity<Void> deleteInventaire(@PathVariable String codeinventaire) {
        try {
            // Find the inventory item with the provided codeinventaire
            Optional<Inventaire> existingInventaire = inventaireRepository.findByCodeinventaire(codeinventaire);

            // Check if the inventory item exists
            if (existingInventaire.isEmpty()) {
                // If not found, return 404 NOT_FOUND
                return ResponseEntity.notFound().build();
            }

            // If found, delete the inventory
            inventaireRepository.delete(existingInventaire.get());

            // Return 200 OK to indicate successful deletion
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            // If any error occurs during the deletion process, return 500 INTERNAL_SERVER_ERROR
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PutMapping("/inventory/modify/{codeinventaire}")
    public ResponseEntity<Inventaire> modifyInventaire(@PathVariable String codeinventaire, @RequestBody Inventaire modifiedInventaire) {
        try {
            // Find the inventory item with the provided codeinventaire
            Optional<Inventaire> existingInventaire = inventaireRepository.findByCodeinventaire(codeinventaire);

            // Check if the inventory item exists
            if (existingInventaire.isEmpty()) {
                // If not found, return 404 NOT_FOUND
                return ResponseEntity.notFound().build();
            }

            // Update the existing inventory item with the modified information
            Inventaire updatedInventaire = existingInventaire.get();
            updatedInventaire.setPays(modifiedInventaire.getPays());
            updatedInventaire.setImage(modifiedInventaire.getImage());
            updatedInventaire.setDate(modifiedInventaire.getDate());
            updatedInventaire.setType(modifiedInventaire.getType());
            updatedInventaire.setPrix(modifiedInventaire.getPrix());

            // Save the updated inventory item
            inventaireRepository.save(updatedInventaire);

            // Return the updated inventory item with a 200 OK response
            return ResponseEntity.ok(updatedInventaire);
        } catch (Exception e) {
            // If any error occurs during the modification process, return 500 INTERNAL_SERVER_ERROR
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/toutInventaires")
    public ResponseEntity<List<Inventaire>> getTousInventaire() {
        try {
            List<Inventaire> _liste = inventaireRepository.findByVendu(false);
            if (_liste == null || _liste.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(_liste, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
