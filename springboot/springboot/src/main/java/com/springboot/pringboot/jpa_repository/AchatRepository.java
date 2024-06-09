//package com.springboot.pringboot.jpa_repository;
//import com.springboot.pringboot.model.Achat;
//import com.springboot.pringboot.model.Inventaire;
//import jakarta.transaction.Transactional;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//import java.util.List;
//import java.util.Optional;
//
//public interface AchatRepository extends JpaRepository<Achat,Long> {
//      List<Achat> findAchatsByUtilisateurId(String utilisateurid)
package com.springboot.pringboot.jpa_repository;
import com.springboot.pringboot.model.Achat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AchatRepository extends JpaRepository<Achat, Long> {
      List<Achat> findAllByUtilisateurId(String utilisateurId);

}
