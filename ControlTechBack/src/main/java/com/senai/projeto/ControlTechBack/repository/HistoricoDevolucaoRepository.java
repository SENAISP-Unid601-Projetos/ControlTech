package com.senai.projeto.ControlTechBack.repository;

import com.senai.projeto.ControlTechBack.entity.HistoricoDevolucao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HistoricoDevolucaoRepository extends JpaRepository<HistoricoDevolucao, Long> {
    List<HistoricoDevolucao> findByUsuarioId(Long usuarioId);
    void deleteAllByUsuarioId(Long usuarioId);
}
