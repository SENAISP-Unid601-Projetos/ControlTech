package com.senai.projeto.ControlTechBack.service;

import com.senai.projeto.ControlTechBack.DTO.UsuarioInputDTO;
import com.senai.projeto.ControlTechBack.DTO.UsuarioOutputDTO;
import com.senai.projeto.ControlTechBack.DTO.UsuarioQrDTO;
import com.senai.projeto.ControlTechBack.entity.Usuario;
import com.senai.projeto.ControlTechBack.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioOutputDTO criar(UsuarioInputDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setPerfil(dto.getPerfil());
        usuario.setCodigoCracha(dto.getCodigoCracha()); // Lê o código do crachá como ID do SENAI
        usuario.setDescricao(dto.getDescricao() != null ? dto.getDescricao() : "");

        Usuario salvo = usuarioRepository.save(usuario);
        return toOutputDTO(salvo);
    }

    public List<UsuarioOutputDTO> listarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::toOutputDTO)
                .collect(Collectors.toList());
    }

    public UsuarioOutputDTO buscarPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return toOutputDTO(usuario);
    }

    public UsuarioQrDTO buscarQrPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return new UsuarioQrDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getPerfil(),
                usuario.getDescricao() != null ? usuario.getDescricao() : ""
        );
    }

    public UsuarioOutputDTO buscarPorCodigoCracha(String codigoCracha) {
        Usuario usuario = usuarioRepository.findByCodigoCracha(codigoCracha)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o crachá informado"));
        return toOutputDTO(usuario);
    }

    private UsuarioOutputDTO toOutputDTO(Usuario usuario) {
        UsuarioOutputDTO dto = new UsuarioOutputDTO();
        dto.setId(usuario.getId());
        dto.setNome(usuario.getNome());
        dto.setPerfil(usuario.getPerfil());
        dto.setDescricao(usuario.getDescricao());
        dto.setCodigoCracha(usuario.getCodigoCracha());
        return dto;
    }
}
