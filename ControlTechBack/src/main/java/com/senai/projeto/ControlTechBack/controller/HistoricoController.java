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

    // 🔹 Listar histórico de um usuário específico
    @GetMapping("/usuario/{usuarioId}")
    public List<HistoricoDevolucaoDTO> listarHistoricoPorUsuario(@PathVariable Long usuarioId) {
        return historicoService.listarPorUsuario(usuarioId);
    }

    // 🔹 Listar histórico de todos os usuários
    @GetMapping("/todos")
    public List<HistoricoDevolucaoDTO> listarHistoricoCompleto() {
        return historicoService.listarTodos();
    }

    // 🔹 Deletar histórico por ID
    @DeleteMapping("/{historicoId}")
    public void deletarHistorico(@PathVariable Long historicoId) {
        historicoService.deletarPorId(historicoId);
    }

    // 🔹 Deletar todo o histórico de um usuário
    @DeleteMapping("/usuario/{usuarioId}")
    public void deletarHistoricoDoUsuario(@PathVariable Long usuarioId) {
        historicoService.deletarPorUsuario(usuarioId);
    }
    // Excluir todo o histórico do sistema (todos os usuários)
    @DeleteMapping("/todos")
    public void deletarTodos() {
        historicoService.deletarTodos();
    }

}
