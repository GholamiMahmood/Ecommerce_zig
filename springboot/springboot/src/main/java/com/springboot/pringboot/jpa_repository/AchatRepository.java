package com.springboot.pringboot.jpa_repository;
import com.springboot.pringboot.model.Achat;
import com.springboot.pringboot.model.Inventaire;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AchatRepository extends JpaRepository<Achat,Long> {

}
