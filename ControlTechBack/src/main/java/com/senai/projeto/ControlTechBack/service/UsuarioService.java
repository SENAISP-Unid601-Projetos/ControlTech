package com.senai.projeto.ControlTechBack.service;

import com.senai.projeto.ControlTechBack.DTO.UsuarioInputDTO;
import com.senai.projeto.ControlTechBack.DTO.UsuarioOutputDTO;
import com.senai.projeto.ControlTechBack.entity.Ferramenta;
import com.senai.projeto.ControlTechBack.entity.Usuario;
import com.senai.projeto.ControlTechBack.repository.FerramentaRepository;
import com.senai.projeto.ControlTechBack.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private FerramentaRepository ferramentaRepository;

    private final Path rootLocation = Paths.get("uploads");

    public UsuarioService() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Erro ao criar pasta uploads!");
        }
    }

    // === 1. MÉTODO PRINCIPAL (COM FOTO) ===
    public UsuarioOutputDTO criarComFoto(UsuarioInputDTO dto, MultipartFile foto) throws IOException {
        // Valida se o QR Code já existe
        if (existePorCodigo(dto.getQrCode())) {
            throw new RuntimeException("QR Code já cadastrado!");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setPerfil(dto.getPerfil());
        usuario.setQrCode(dto.getQrCode());

        // Salva foto se existir
        if (foto != null && !foto.isEmpty()) {
            String nomeArquivo = "user_" + System.currentTimeMillis() + ".jpg";
            Path destino = rootLocation.resolve(nomeArquivo);
            Files.copy(foto.getInputStream(), destino, StandardCopyOption.REPLACE_EXISTING);
            usuario.setFotoUrl("/uploads/" + nomeArquivo);
        }

        Usuario salvo = usuarioRepository.save(usuario);
        return toOutputDTO(salvo);
    }

    // === 2. MÉTODO "ATALHO" PARA O QRCODE CONTROLLER (CORREÇÃO DO ERRO) ===
    // Este método recebe o QR Code separado e o DTO, e chama o método principal passando null na foto
    public UsuarioOutputDTO criar(String qrCode, UsuarioInputDTO dto) {
        try {
            // Garante que o QR Code lido vá para o DTO
            dto.setQrCode(qrCode);
            // Chama o método principal sem foto
            return criarComFoto(dto, null);
        } catch (IOException e) {
            throw new RuntimeException("Erro interno ao criar usuário: " + e.getMessage());
        }
    }

    // === MÉTODOS AUXILIARES E LISTAGEM ===

    private UsuarioOutputDTO toOutputDTO(Usuario usuario) {
        return new UsuarioOutputDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getPerfil(),
                usuario.getQrCode(),
                usuario.getFotoUrl()
        );
    }

    public boolean existePorCodigo(String qrCode) {
        return usuarioRepository.findByQrCode(qrCode).isPresent();
    }

    public List<UsuarioOutputDTO> listarUsuariosAssociados() {
        return ferramentaRepository.findAll().stream()
                .map(Ferramenta::getUsuario)
                .filter(u -> u != null)
                .distinct()
                .map(this::toOutputDTO)
                .collect(Collectors.toList());
    }

    public List<UsuarioOutputDTO> listarTodos() {
        return usuarioRepository.findAll().stream()
                .map(this::toOutputDTO)
                .collect(Collectors.toList());
    }

    public UsuarioOutputDTO buscarPorQrCode(String qrCode) {
        return usuarioRepository.findByQrCode(qrCode)
                .map(this::toOutputDTO)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public UsuarioOutputDTO buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .map(this::toOutputDTO)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public Optional<Usuario> buscarEntidadePorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public boolean existePorId(Long id) {
        return usuarioRepository.existsById(id);
    }

    public void excluir(Long id) {
        if(existePorId(id)) usuarioRepository.deleteById(id);
    }
}