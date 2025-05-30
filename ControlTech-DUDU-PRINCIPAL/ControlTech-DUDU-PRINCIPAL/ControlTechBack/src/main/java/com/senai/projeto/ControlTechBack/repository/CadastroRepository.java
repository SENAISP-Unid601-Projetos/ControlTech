package com.senai.projeto.ControlTechBack.repository;

import com.senai.projeto.ControlTechBack.controller.CadastroController;
import com.senai.projeto.ControlTechBack.entity.Cadastro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CadastroRepository extends JpaRepository<Cadastro, Long> {
}
