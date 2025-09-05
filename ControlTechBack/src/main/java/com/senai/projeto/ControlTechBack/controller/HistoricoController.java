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
}
