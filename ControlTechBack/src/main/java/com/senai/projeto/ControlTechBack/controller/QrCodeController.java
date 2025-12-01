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

import java.io.File;
// Importação necessária para Map.of()
import java.util.Map;

@CrossOrigin(origins = {"https://control-tech-six.vercel.app", "http://localhost:8080"})
@RestController
@RequestMapping("/api/qrcode")
public class QrCodeController {

    @Autowired
    UsuarioService usuarioService;

    // ... (Métodos existentes: gerarQrCodeDoUsuario) ...

    // ✅ NOVO ENDPOINT (CORREÇÃO): Apenas decodifica o QR Code (para uso no Cadastro)
    @PostMapping("/decode")
    public ResponseEntity<?> decodificarQrCode(@RequestParam("file") MultipartFile file) {
        try {
            System.out.println("📂 Recebi arquivo para decodificação: " + file.getOriginalFilename());

            // Salva o arquivo temporariamente
            File tempFile = File.createTempFile("qrcode_temp", ".png");
            file.transferTo(tempFile);

            // Lê o conteúdo
            String conteudo = QRCodeReader.lerQRCode(tempFile.getAbsolutePath()).trim();
            System.out.println("🔍 Conteúdo decodificado: [" + conteudo + "]");

            // Limpa o arquivo
            tempFile.delete();

            // Retorna apenas o texto lido em um JSON simples: {"qrCode": "TEXTO_LIDO"}
            return ResponseEntity.ok(Map.of("qrCode", conteudo)); // Adaptação para o frontend

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("❌ Erro ao decodificar QR Code: " + e.getMessage());
        }
    }

    // ✅ LER QR CODE (endpoint original, mantido para buscar usuário)
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
    // ... (Outros métodos) ...
}