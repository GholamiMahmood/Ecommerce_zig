package com.springboot.pringboot.controllers;
import com.springboot.pringboot.JWT.Security;
import com.springboot.pringboot.jpa_repository.UtilisateurRepository;
import com.springboot.pringboot.model.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;



@RestController
@CrossOrigin
@RequestMapping("/api")
public class UtilisateurController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;


//    @GetMapping ("/tout-utilisateur")
//    public ResponseEntity<List<Utilisateur>> getTousUtilisateur() {
//        try {
//            List<Utilisateur> _liste =utilisateurRepository.findAll();
//            if(_liste == null || _liste.isEmpty()){
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            }
//            return new ResponseEntity<>(_liste,HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

@PostMapping("/sign-in")
public ResponseEntity<String> loginUser(@RequestBody Utilisateur request) throws NoSuchAlgorithmException {
    // Retrieve the user from the database based on the provided username
    Utilisateur utilisateur = utilisateurRepository.findByidentity(request.getIdentity());

    if (utilisateur != null) {
        //pass dans la BD
        String pass_bd = utilisateur.getPassword();
        String pass_sans_code = Security.extractToken(pass_bd);
        //  request.getPassword, celui qui entree par utilisateur ou admin
        if (pass_sans_code.equals(request.getPassword())) {
            String identity = utilisateur.getIdentity();
            return ResponseEntity.ok(identity);
        } else {
            // Passwords don't match, return unauthorized status
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    } else {
        // User not found, return unauthorized status
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }
}

    @PostMapping("/sign-up")
    public ResponseEntity<Utilisateur> createUtilisateur(@RequestBody Utilisateur utilisateur) {
        try {
            if (utilisateurRepository.existsByIdentity(utilisateur.getIdentity())) {
                // User already exists, return server error
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
             // generateToken cree un token, puis il va le mettre en BD
            String token = Security.generateToken(utilisateur.getPassword());
            utilisateur.setPassword(token);

            Utilisateur _utilisateur = utilisateurRepository.save(utilisateur);
            return new ResponseEntity<>(_utilisateur,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // modifier l'information d'utilisateur
//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateUtilisateur(@PathVariable Long id, @RequestBody Utilisateur utilisateur) {
//            Optional<Utilisateur> utilisateurData=utilisateurRepository.findById(id);
//
//            if (utilisateurData.isPresent()) {
//                Utilisateur _utilisateur=utilisateurData.get();
//                _utilisateur.setNom(utilisateur.getNom());
//                _utilisateur.setRole(utilisateur.getRole());
//                _utilisateur.setCodePostal(utilisateur.getCodePostal());
//                _utilisateur.setAdresse(utilisateur.getAdresse());
//                _utilisateur.setTelephone(utilisateur.getTelephone());
//                return new ResponseEntity<>(utilisateurRepository.save(_utilisateur),HttpStatus.OK);
//
//            } else {
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            }
//    }

    // DELETE method to delete a Utilisateur
//    @DeleteMapping("/utilisateur/{id}")
//    public ResponseEntity<HttpStatus> deleteUtilisateur(@PathVariable Long id) {
//        try {
//            utilisateurRepository.deleteById(id);
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
}







