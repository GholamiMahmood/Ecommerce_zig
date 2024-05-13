package com.springboot.pringboot.jpa_repository;
import com.springboot.pringboot.model.Inventaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface InventaireRepository extends JpaRepository<Inventaire,Long> {
    boolean existsByCodeinventaire(String codeinventaire);

    Optional<Inventaire> findByCodeinventaire(String codeinventaire);

    void deleteByCodeinventaire(String codeInventaire);

}
