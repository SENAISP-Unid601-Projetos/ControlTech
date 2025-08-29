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

    // --- Criar usuário usando QR Code como chave ---
    // UsuarioService.java
    public UsuarioOutputDTO criar(String qrCode, UsuarioInputDTO dto) {
        // Verifica se o QR Code já foi usado
        if (existePorCodigo(qrCode)) {
            throw new RuntimeException("❌ QR Code já utilizado");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setPerfil(dto.getPerfil() != null ? dto.getPerfil() : "USUARIO");
        usuario.setQrCode(qrCode); // salva automaticamente o valor do QR Code

        Usuario salvo = usuarioRepository.save(usuario);
        return toOutputDTO(salvo);
    }

    public boolean existePorCodigo(String qrCode) {
        return usuarioRepository.findByQrCode(qrCode).isPresent();
    }
    private UsuarioOutputDTO toOutputDTO(Usuario usuario) {
        UsuarioOutputDTO dto = new UsuarioOutputDTO();
        dto.setId(usuario.getId());
        dto.setNome(usuario.getNome());
        dto.setPerfil(usuario.getPerfil());
        dto.setQrCode(usuario.getQrCode());
        return dto;
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
                u.getPerfil()
        )).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

}