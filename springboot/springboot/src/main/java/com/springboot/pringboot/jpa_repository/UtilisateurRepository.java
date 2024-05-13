package com.springboot.pringboot.jpa_repository;

import com.springboot.pringboot.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UtilisateurRepository extends JpaRepository<Utilisateur,Long> {
//    public List< Utilisateur > findByNOM(boolean full);
         Utilisateur findByIdentityAndPassword(String identity, String password);
         boolean existsByIdentity(String identity);
         Utilisateur findByidentity(String identity);
}
