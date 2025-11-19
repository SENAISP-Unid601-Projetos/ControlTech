package com.senai.projeto.ControlTechBack.service;

import com.senai.projeto.ControlTechBack.DTO.HistoricoDevolucaoDTO;
import com.senai.projeto.ControlTechBack.entity.HistoricoDevolucao;
import com.senai.projeto.ControlTechBack.entity.Ferramenta;
import com.senai.projeto.ControlTechBack.entity.Usuario;
import com.senai.projeto.ControlTechBack.repository.HistoricoDevolucaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HistoricoService {

    @Autowired
    private HistoricoDevolucaoRepository historicoRepository;

    public HistoricoDevolucao registrarDevolucao(Ferramenta ferramenta, Usuario usuario, String observacoes) {
        // --- VALIDAÇÃO: OBSERVAÇÃO OBRIGATÓRIA ---
        if (observacoes == null || observacoes.trim().isEmpty()) {
            throw new IllegalArgumentException("A descrição da devolução é obrigatória.");
        }

        HistoricoDevolucao h = new HistoricoDevolucao();
        h.setFerramenta(ferramenta);
        h.setUsuario(usuario);
        h.setDataDevolucao(java.time.LocalDateTime.now());
        h.setObservacoes(observacoes);
        return historicoRepository.save(h);
    }

    public List<HistoricoDevolucaoDTO> listarPorUsuario(Long usuarioId) {
        return historicoRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<HistoricoDevolucaoDTO> listarTodos() {
        return historicoRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public void deletarPorId(Long historicoId) {
        historicoRepository.deleteById(historicoId);
    }

    public void deletarPorUsuario(Long usuarioId) {
        historicoRepository.deleteAllByUsuarioId(usuarioId);
    }

    private HistoricoDevolucaoDTO toDTO(HistoricoDevolucao h) {
        HistoricoDevolucaoDTO dto = new HistoricoDevolucaoDTO();
        dto.setId(h.getId());
        dto.setNomeFerramenta(h.getFerramenta().getNome());
        dto.setNomeUsuario(h.getUsuario().getNome());
        dto.setDataDevolucao(h.getDataDevolucao());
        dto.setObservacoes(h.getObservacoes());
        return dto;
    }

    public void deletarTodos() {
        historicoRepository.deleteAll();
    }
}