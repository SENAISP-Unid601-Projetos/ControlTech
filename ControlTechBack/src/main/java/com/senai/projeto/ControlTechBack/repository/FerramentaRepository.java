package com.senai.projeto.ControlTechBack.repository;

import com.senai.projeto.ControlTechBack.entity.Ferramenta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FerramentaRepository extends JpaRepository<Ferramenta, Long> {
}
