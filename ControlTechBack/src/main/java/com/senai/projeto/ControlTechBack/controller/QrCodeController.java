package com.senai.projeto.ControlTechBack.controller;

import com.senai.projeto.ControlTechBack.DTO.UsuarioOutputDTO;
import com.senai.projeto.ControlTechBack.QrCode.QRCodeGenerator;
import com.senai.projeto.ControlTechBack.QrCode.QRCodeReader;
import com.senai.projeto.ControlTechBack.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;

@RestController
@RequestMapping("/api/qrcode")
public class QrCodeController {

    @Autowired
    UsuarioService usuarioService;

    // ✅ GERAR QR CODE DO USUÁRIO
    @GetMapping("/{id}/qrcode")
    public ResponseEntity<byte[]> gerarQrCodeDoUsuario(@PathVariable Long id) {
        try {
            UsuarioOutputDTO usuario = usuarioService.buscarPorId(id);

            String textoQr = String.valueOf(usuario.getId()); // só o ID no QR
            byte[] imagemQr = QRCodeGenerator.gerarQRCodeBytes(textoQr, 400, 400);

            return ResponseEntity.ok()
                    .header("Content-Type", "image/png")
                    .body(imagemQr);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // ✅ LER QR CODE (usando o endpoint /ler)
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

    // ✅ Método alternativo usando arquivo temporário (mantido para compatibilidade)
    @PostMapping("/ler-temp")
    public ResponseEntity<UsuarioOutputDTO> lerQrCodeComArquivoTemp(@RequestParam("file") MultipartFile file) {
        try {
            // Salva o arquivo temporariamente
            File tempFile = File.createTempFile("qrcode", ".png");
            file.transferTo(tempFile);

            // Lê o conteúdo do QR Code
            String conteudo = QRCodeReader.lerQRCode(tempFile.getAbsolutePath());
            System.out.println("Conteúdo lido: " + conteudo);

            // Aqui o conteúdo é só o ID
            Long id = Long.parseLong(conteudo.trim());

            // Busca o usuário pelo ID
            UsuarioOutputDTO usuario = usuarioService.buscarPorId(id);

            // Limpa arquivo temporário
            tempFile.delete();

            return ResponseEntity.ok(usuario);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}