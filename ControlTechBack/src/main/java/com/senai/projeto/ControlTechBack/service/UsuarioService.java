package com.senai.projeto.ControlTechBack.service;

import com.senai.projeto.ControlTechBack.DTO.UsuarioInputDTO;
import com.senai.projeto.ControlTechBack.DTO.UsuarioOutputDTO;
import com.senai.projeto.ControlTechBack.entity.Ferramenta;
import com.senai.projeto.ControlTechBack.entity.Usuario;
import com.senai.projeto.ControlTechBack.repository.FerramentaRepository;
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

    @Autowired
    private FerramentaRepository ferramentaRepository;

    // --- Verifica existência por ID ---
    public boolean existePorId(Long id) {
        return usuarioRepository.existsById(id);
    }

    // --- Criar usuário usando QR Code ---
    public UsuarioOutputDTO criar(String qrCode, UsuarioInputDTO dto) {
        if (existePorCodigo(qrCode)) {
            throw new RuntimeException("❌ QR Code já utilizado");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setTurma(dto.getPerfil() != null ? dto.getPerfil() : "USUARIO");
        usuario.setQrCode(qrCode);

        Usuario salvo = usuarioRepository.save(usuario);
        return toOutputDTO(salvo);
    }

    public boolean existePorCodigo(String qrCode) {
        return usuarioRepository.findByQrCode(qrCode).isPresent();
    }

    private UsuarioOutputDTO toOutputDTO(Usuario usuario) {
        return new UsuarioOutputDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getTurma(),
                usuario.getQrCode()
        );
    }

    public List<UsuarioOutputDTO> listarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::toOutputDTO)
                .collect(Collectors.toList());
    }

    public UsuarioOutputDTO buscarPorQrCode(String qrCode) {
        Optional<Usuario> usuario = usuarioRepository.findByQrCode(qrCode);
        return usuario.map(this::toOutputDTO)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public UsuarioOutputDTO buscarPorId(Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        return usuario.map(this::toOutputDTO)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public Optional<Usuario> buscarEntidadePorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public void excluir(Long id) {
        if (!existePorId(id)) {
            throw new RuntimeException("Usuário não encontrado para exclusão: ID " + id);
        }
        usuarioRepository.deleteById(id);
    }

    public void associarUsuarios(Ferramenta ferramenta, Usuario usuario) {
        ferramenta.setUsuario(usuario);
        ferramentaRepository.save(ferramenta);
    }

    // --- NOVO: listar usuários associados a ferramentas ---
    public List<UsuarioOutputDTO> listarUsuariosAssociados() {
        return ferramentaRepository.findAll()
                .stream()
                .map(Ferramenta::getUsuario)
                .filter(usuario -> usuario != null)
                .distinct()
                .map(this::toOutputDTO)
                .collect(Collectors.toList());
    }
}
