package com.senai.projeto.ControlTechBack.service;

import com.senai.projeto.ControlTechBack.DTO.HistoricoDevolucaoDTO;
import com.senai.projeto.ControlTechBack.entity.HistoricoDevolucao;
import com.senai.projeto.ControlTechBack.entity.Ferramenta;
import com.senai.projeto.ControlTechBack.entity.Usuario;
import com.senai.projeto.ControlTechBack.repository.HistoricoDevolucaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HistoricoService {

    @Autowired
    private HistoricoDevolucaoRepository historicoRepository;

    public HistoricoDevolucao registrarDevolucao(Ferramenta ferramenta, Usuario usuario, String observacoes) {
        HistoricoDevolucao h = new HistoricoDevolucao();
        h.setFerramenta(ferramenta);
        h.setUsuario(usuario);
        h.setDataDevolucao(LocalDate.now());
        h.setObservacoes(observacoes);
        return historicoRepository.save(h);
    }

    public List<HistoricoDevolucaoDTO> listarPorUsuario(Long usuarioId) {
        return historicoRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(h -> {
                    HistoricoDevolucaoDTO dto = new HistoricoDevolucaoDTO();
                    dto.setId(h.getId());
                    dto.setNomeFerramenta(h.getFerramenta().getNome());
                    dto.setNomeUsuario(h.getUsuario().getNome());
                    dto.setDataDevolucao(h.getDataDevolucao());
                    dto.setObservacoes(h.getObservacoes());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
