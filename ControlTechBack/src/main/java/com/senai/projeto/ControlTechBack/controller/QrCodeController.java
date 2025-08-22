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
            System.out.println("Recebendo arquivo para leitura: " + file.getOriginalFilename());
            System.out.println("Tipo: " + file.getContentType());
            System.out.println("Tamanho: " + file.getSize() + " bytes");

            // Validações básicas
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Nenhum arquivo enviado");
            }

            if (!file.getContentType().startsWith("image/")) {
                return ResponseEntity.badRequest().body("O arquivo deve ser uma imagem");
            }

            // Lê o QR Code
            String conteudo = QRCodeReader.lerQRCode(file);
            System.out.println("Conteúdo lido do QR Code: '" + conteudo + "'");

            // Valida se o conteúdo foi lido
            if (conteudo == null || conteudo.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("QR Code vazio ou não pôde ser lido");
            }

            // Valida se é numérico (ID)
            String conteudoLimpo = conteudo.trim();
            if (!conteudoLimpo.matches("\\d+")) {
                return ResponseEntity.badRequest()
                        .body("QR Code não contém um ID válido. Conteúdo: " + conteudoLimpo);
            }

            // Converte e busca usuário
            Long id = Long.parseLong(conteudoLimpo);
            UsuarioOutputDTO usuario = usuarioService.buscarPorId(id);

            return ResponseEntity.ok(usuario);

        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Formato de ID inválido no QR Code");
        } catch (Exception e) {
            System.err.println("Erro ao processar QR Code: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao processar QR Code: " + e.getMessage());
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