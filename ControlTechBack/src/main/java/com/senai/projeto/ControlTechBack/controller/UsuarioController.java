package com.senai.projeto.ControlTechBack.controller;

import com.senai.projeto.ControlTechBack.DTO.UsuarioOutputDTO;
import com.senai.projeto.ControlTechBack.DTO.UsuarioQrDTO;
import com.senai.projeto.ControlTechBack.QrCode.QRCodeGenerator;
import com.senai.projeto.ControlTechBack.QrCode.QRCodeReader;
import com.senai.projeto.ControlTechBack.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.google.zxing.EncodeHintType;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    @Operation(summary = "Lista todos os usuários")
    public ResponseEntity<List<UsuarioOutputDTO>> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.listarTodos());
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
                // Aqui você pode buscar o usuário por outro atributo (ex: código externo)
                // Exemplo: buscarPorCodigo(conteudo)
                return ResponseEntity.ok("Código lido do QR: " + conteudo);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("❌ Erro ao processar QR Code: " + e.getMessage());
        }
    }

}