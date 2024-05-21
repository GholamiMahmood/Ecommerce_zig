package com.springboot.pringboot.jpa_repository;
import com.springboot.pringboot.model.Inventaire;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface InventaireRepository extends JpaRepository<Inventaire,Long> {
    boolean existsByCodeinventaire(String codeinventaire);

    Optional<Inventaire> findByCodeinventaire(String codeinventaire);

    void deleteByCodeinventaire(String codeInventaire);
    List<Inventaire> findByVendu(boolean vendu);

    @Modifying
    @Transactional
    @Query("UPDATE Inventaire i SET i.vendu = :vendu WHERE i.codeinventaire = :code")
    void updateVenduByCode(@Param("vendu") boolean vendu, @Param("code") String code);

}
