package com.senai.projeto.ControlTechBack.service;

import com.senai.projeto.ControlTechBack.DTO.FerramentaDTO;
import com.senai.projeto.ControlTechBack.entity.Ferramenta;
import com.senai.projeto.ControlTechBack.repository.FerramentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FerramentaService {

    @Autowired
    private FerramentaRepository ferramentaRepository;

    public List<FerramentaDTO> listarTodas() {
        return ferramentaRepository.findAll().stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    public FerramentaDTO buscarPorId(Long id) {
        Optional<Ferramenta> ferramenta = ferramentaRepository.findById(id);
        return ferramenta.map(this::converterParaDTO).orElse(null);
    }

    public FerramentaDTO salvar(FerramentaDTO ferramentaDTO) {
        Ferramenta ferramenta = converterParaEntidade(ferramentaDTO);
        Ferramenta ferramentaSalva = ferramentaRepository.save(ferramenta);
        return converterParaDTO(ferramentaSalva);
    }

    public FerramentaDTO atualizar(Long id, FerramentaDTO ferramentaDTO) {
        Ferramenta ferramentaExistente = ferramentaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ferramenta não encontrada"));
        ferramentaExistente.setNome(ferramentaDTO.getNome());
        ferramentaExistente.setDescricao(ferramentaDTO.getDescricao());
        ferramentaExistente.setQuantidadeEstoque(ferramentaDTO.getQuantidadeEstoque());
        ferramentaExistente.setDataDevolucao(ferramentaDTO.getDataDevolucao());
        Ferramenta ferramentaAtualizada = ferramentaRepository.save(ferramentaExistente);
        return converterParaDTO(ferramentaAtualizada);
    }

    public void deletar(Long id) {
        ferramentaRepository.deleteById(id);
    }

    private FerramentaDTO converterParaDTO(Ferramenta ferramenta) {
        FerramentaDTO dto = new FerramentaDTO();
        dto.setId(ferramenta.getId());
        dto.setNome(ferramenta.getNome());
        dto.setDescricao(ferramenta.getDescricao());
        dto.setQuantidadeEstoque(ferramenta.getQuantidadeEstoque());
        dto.setDataDevolucao(ferramenta.getDataDevolucao());
        return dto;
    }

    private Ferramenta converterParaEntidade(FerramentaDTO dto) {
        Ferramenta ferramenta = new Ferramenta();
        ferramenta.setNome(dto.getNome());
        ferramenta.setDescricao(dto.getDescricao());
        ferramenta.setQuantidadeEstoque(dto.getQuantidadeEstoque());
        ferramenta.setDataDevolucao(dto.getDataDevolucao());
        return ferramenta;
    }
}
