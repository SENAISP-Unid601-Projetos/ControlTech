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
        usuario.setQrCode(dto.getQrCode());
        usuario.setDescricao(dto.getDescricao() != null ? dto.getDescricao() : ""); // Ensure descricao is set

        Usuario salvo = usuarioRepository.save(usuario);

        return toResponseDTO(salvo);
    }

    public List<UsuarioOutputDTO> listarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public UsuarioOutputDTO buscarPorQrCode(String qrCode) {
        Optional<Usuario> usuario = usuarioRepository.findByQrCode(qrCode);
        return usuario.map(this::toResponseDTO)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    private UsuarioOutputDTO toResponseDTO(Usuario usuario) {
        UsuarioOutputDTO dto = new UsuarioOutputDTO();
        dto.setId(usuario.getId());
        dto.setNome(usuario.getNome());
        dto.setPerfil(usuario.getPerfil());
        dto.setQrCode(usuario.getQrCode());
        return dto;
    }

    public UsuarioOutputDTO buscarPorId(Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        return usuario.map(this::toResponseDTO)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }
    public UsuarioQrDTO buscarQrPorId(Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        return usuario.map(u -> new UsuarioQrDTO(
                u.getId(),
                u.getNome(),
                u.getPerfil(),
                u.getDescricao() != null ? u.getDescricao() : ""
        )).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }
}