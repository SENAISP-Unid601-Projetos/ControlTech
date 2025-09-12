package com.senai.projeto.ControlTechBack.controller;

import com.senai.projeto.ControlTechBack.DTO.HistoricoDevolucaoDTO;
import com.senai.projeto.ControlTechBack.service.HistoricoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historico")
public class HistoricoController {

    @Autowired
    private HistoricoService historicoService;

    // Listar histórico de um usuário específico
    @GetMapping("/usuario/{usuarioId}")
    public List<HistoricoDevolucaoDTO> listarHistoricoPorUsuario(@PathVariable Long usuarioId) {
        return historicoService.listarPorUsuario(usuarioId);
    }
    @DeleteMapping("/{historicoId}")
    public void deletarHistorico(@PathVariable Long historicoId) {
        historicoService.deletarPorId(historicoId);
    }
    // Deletar todo o histórico de devolução de um usuário
    @DeleteMapping("/usuario/{usuarioId}")
    public void deletarHistoricoDoUsuario(@PathVariable Long usuarioId) {
        historicoService.deletarPorUsuario(usuarioId);
    }

}
