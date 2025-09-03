package com.senai.projeto.ControlTechBack.service;

import com.senai.projeto.ControlTechBack.DTO.FerramentaDTO;
import com.senai.projeto.ControlTechBack.entity.Ferramenta;
import com.senai.projeto.ControlTechBack.entity.Usuario;
import com.senai.projeto.ControlTechBack.repository.FerramentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.time.LocalDate;

@Service
public class FerramentaService {

    @Autowired
    private FerramentaRepository ferramentaRepository;

    // LISTAR TODAS AS FERRAMENTAS (DTO)
    public List<FerramentaDTO> listarTodas() {
        return ferramentaRepository.findAll()
                .stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    // BUSCAR ENTIDADE COMPLETA
    public Optional<Ferramenta> buscarEntidadePorId(Long id) {
        return ferramentaRepository.findById(id);
    }

    // BUSCAR POR ID RETORNANDO DTO
    public FerramentaDTO buscarPorId(Long id) {
        return ferramentaRepository.findById(id)
                .map(this::converterParaDTO)
                .orElse(null);
    }

    // BUSCAR POR QRCODE

    // SALVAR NOVA FERRAMENTA
    public FerramentaDTO salvar(FerramentaDTO dto) {
        Ferramenta ferramenta = converterParaEntidade(dto);
        Ferramenta salva = ferramentaRepository.save(ferramenta);
        return converterParaDTO(salva);
    }

    // ATUALIZAR FERRAMENTA EXISTENTE
    public FerramentaDTO atualizar(Long id, FerramentaDTO dto) {
        Ferramenta existente = ferramentaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ferramenta não encontrada"));
        existente.setNome(dto.getNome());
        existente.setDescricao(dto.getDescricao());
        existente.setQuantidadeEstoque(dto.getQuantidadeEstoque());
        existente.setDataDevolucao(dto.getDataDevolucao());
        Ferramenta atualizada = ferramentaRepository.save(existente);
        return converterParaDTO(atualizada);
    }

    // DELETAR FERRAMENTA
    public void deletar(Long id) {
        ferramentaRepository.deleteById(id);
    }


    public void associarUsuario(Ferramenta ferramenta, Usuario usuario) {
        if (ferramenta == null || usuario == null) {
            throw new RuntimeException("Ferramenta ou usuário não podem ser nulos");
        }

        ferramenta.setUsuario(usuario);
        if (ferramenta.getDataDevolucao() == null) {
            ferramenta.setDataDevolucao(LocalDate.now().plusDays(7));
        }
        ferramentaRepository.save(ferramenta);
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
        Ferramenta f = new Ferramenta();
        f.setNome(dto.getNome());
        f.setDescricao(dto.getDescricao());
        f.setQuantidadeEstoque(dto.getQuantidadeEstoque());
        f.setDataDevolucao(dto.getDataDevolucao());
        return f;
    }
}
