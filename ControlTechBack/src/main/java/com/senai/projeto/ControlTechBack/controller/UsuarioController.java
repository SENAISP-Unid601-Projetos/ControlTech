package com.senai.projeto.ControlTechBack.controller;

import com.senai.projeto.ControlTechBack.QrCode.QRCodeGenerator;
import com.senai.projeto.ControlTechBack.DTO.UsuarioOutputDTO;
import com.senai.projeto.ControlTechBack.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    @Operation(summary = "Cria um novo usuário")
    public ResponseEntity<UsuarioOutputDTO> criarUsuario(@RequestBody com.senai.projeto.ControlTechBack.DTO.UsuarioInputDTO dto) {
        UsuarioOutputDTO criado = usuarioService.criar(dto);
        return ResponseEntity.ok(criado);
    }

    @GetMapping
    @Operation(summary = "Lista todos os usuários")
    public ResponseEntity<List<UsuarioOutputDTO>> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @GetMapping("/{id}/qrcode")
    @Operation(summary = "Gera QR Code simples e compatível com iPhone")
    public ResponseEntity<byte[]> gerarQrCodeDoUsuario(@PathVariable Long id) {
        try {
            UsuarioOutputDTO usuario = usuarioService.buscarPorId(id);

            // Texto simples e legível — funciona em iPhone
            String textoQr = String.format(
                    "ID: %d\nNome: %s\nPerfil: %s\nDescricao: %s",
                    usuario.getId(),
                    usuario.getNome(),
                    usuario.getPerfil(),
                    usuario.getDescricao() != null ? usuario.getDescricao() : "N/A"
            );

            byte[] imagemQr = QRCodeGenerator.gerarQRCodeBytes(textoQr, 350, 350);

            return ResponseEntity.ok()
                    .header("Content-Type", "image/png")
                    .body(imagemQr);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
