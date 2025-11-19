package com.senai.projeto.ControlTechBack.controller;

import com.senai.projeto.ControlTechBack.DTO.UsuarioInputDTO;
import com.senai.projeto.ControlTechBack.DTO.UsuarioOutputDTO;
import com.senai.projeto.ControlTechBack.DTO.UsuarioQrResponseDTO;
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
import java.util.Base64;

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
    // ✅ NOVO ENDPOINT: Apenas lê o QR Code (para uso no Cadastro)
    @PostMapping("/decodificar")
    public ResponseEntity<?> decodificarQrCode(@RequestParam("file") MultipartFile file) {
        try {
            // 1. Salva o arquivo temporariamente
            File tempFile = File.createTempFile("qrcode_temp", ".png");
            file.transferTo(tempFile);

            // 2. Apenas lê o conteúdo (Texto/Número)
            String conteudo = QRCodeReader.lerQRCode(tempFile.getAbsolutePath()).trim();

            // 3. Deleta o arquivo temporário
            tempFile.delete();

            // 4. Retorna o conteúdo num JSON simples
            // Retorna: { "qrCode": "12345" }
            return ResponseEntity.ok(java.util.Collections.singletonMap("qrCode", conteudo));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erro ao decodificar arquivo: " + e.getMessage());
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

            tempFile.delete(); // limpa

            UsuarioOutputDTO usuario;

            try {
                // Se for ID
                Long id = Long.parseLong(conteudo);
                usuario = usuarioService.buscarPorId(id);
            } catch (NumberFormatException e) {
                // Se não for número, tenta como código
                if (usuarioService.existePorCodigo(conteudo)) {
                    usuario = usuarioService.buscarPorQrCode(conteudo);
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body("❌ Nenhum usuário encontrado para o QR Code: " + conteudo);
                }
            }

            // Gera a imagem do QR (opcional, pode remover se não quiser devolver)
            byte[] imagemQr = QRCodeGenerator.gerarQRCodeBytes(conteudo, 300, 300);

            UsuarioQrResponseDTO resposta = new UsuarioQrResponseDTO(usuario);

            return ResponseEntity.ok(resposta);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("❌ Erro ao processar QR Code: " + e.getMessage());
        }
    }

    @PostMapping(value = "/ler-e-criar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> lerEcriarUsuario(
            @RequestParam("file") MultipartFile file,
            @RequestPart("usuario") UsuarioInputDTO dto // JSON com nome, perfil, descricao
    ) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Nenhum arquivo enviado");
            }

            // Salva temporariamente
            File tempFile = File.createTempFile("qrcode", ".png");
            file.transferTo(tempFile);

            // Lê o QR Code
            String qrCode = QRCodeReader.lerQRCode(tempFile.getAbsolutePath()).trim();

            // Cria o usuário com QR Code + dados do JSON
            UsuarioOutputDTO criado = usuarioService.criar(qrCode, dto);

            // Limpa arquivo temporário
            tempFile.delete();

            return ResponseEntity.ok(criado);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erro ao processar QR Code: " + e.getMessage());
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
    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluirUsuario(@PathVariable Long id) {
        try {
            boolean existe = usuarioService.existePorId(id);
            if (!existe) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("❌ Usuário não encontrado com ID: " + id);
            }

            usuarioService.excluir(id); // chama o método do service
            return ResponseEntity.ok("✅ Usuário excluído com sucesso: ID " + id);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Erro ao excluir usuário: " + e.getMessage());
        }
    }
}