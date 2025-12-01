package com.senai.projeto.ControlTechBack.controller;

import com.senai.projeto.ControlTechBack.DTO.UsuarioInputDTO;
import com.senai.projeto.ControlTechBack.DTO.UsuarioOutputDTO;
import com.senai.projeto.ControlTechBack.QrCode.QRCodeReader;
import com.senai.projeto.ControlTechBack.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    @Operation(summary = "Lista todos os usuários")
    public ResponseEntity<List<UsuarioOutputDTO>> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    // ✅ ENDPOINT CORRIGIDO: Cria um novo usuário (POST simples, recebendo JSON/DTO)
    @PostMapping
    @Operation(summary = "Cria um novo usuário")
    public ResponseEntity<?> criarUsuario(@RequestBody UsuarioInputDTO dto) {
        try {
            // O UsuarioInputDTO precisa ter o campo qrCode preenchido pelo frontend
            if (dto.getQrCode() == null || dto.getQrCode().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("O campo qrCode é obrigatório.");
            }
            UsuarioOutputDTO criado = usuarioService.criar(dto.getQrCode(), dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(criado);
        } catch (RuntimeException e) {
            // Captura erro de QR Code já utilizado
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno ao criar usuário.");
        }
    }

    @PostMapping("/ler")
    public ResponseEntity<?> lerQrCode(@RequestParam("file") MultipartFile file) {
        try {
            System.out.println("📂 Recebi arquivo: " + file.getOriginalFilename());

            // Salva o arquivo temporariamente
            File tempFile = File.createTempFile("qrcode", ".png");
            file.transferTo(tempFile);
            System.out.println("✅ Arquivo salvo em: " + tempFile.getAbsolutePath());

            // Lê QR Code
            String conteudo = QRCodeReader.lerQRCode(tempFile.getAbsolutePath()).trim();
            System.out.println("🔍 Conteúdo lido do QR: [" + conteudo + "]");

            // Tenta converter para Long (se couber)
            try {
                Long id = Long.parseLong(conteudo);
                UsuarioOutputDTO usuario = usuarioService.buscarPorId(id);
                return ResponseEntity.ok(usuario);
            } catch (NumberFormatException e) {
                // Se não couber em Long, tratamos como código/string
                System.out.println("⚠️ Valor não cabe em Long, tratando como String...");
                // Exemplo: buscarPorCodigo(conteudo)
                return ResponseEntity.ok("Código lido do QR: " + conteudo);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("❌ Erro ao processar QR Code: " + e.getMessage());
        }
    }

    @GetMapping("/por-codigo/{qrCode}")
    @Operation(summary = "Busca usuário pelo código QR")
    public ResponseEntity<UsuarioOutputDTO> buscarPorQrCode(@PathVariable String qrCode) {
        try {
            // Usa o service que busca por código (string)
            UsuarioOutputDTO usuario = usuarioService.buscarPorQrCode(qrCode);
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            // Retorna 404 se não for encontrado
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}