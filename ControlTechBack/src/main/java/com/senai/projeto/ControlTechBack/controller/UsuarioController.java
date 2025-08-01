package com.senai.projeto.ControlTechBack.controller;

import com.google.zxing.*;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;
import com.senai.projeto.ControlTechBack.DTO.UsuarioOutputDTO;
import com.senai.projeto.ControlTechBack.DTO.UsuarioQrDTO;
import com.senai.projeto.ControlTechBack.QrCode.QRCodeGenerator;
import com.senai.projeto.ControlTechBack.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    @Operation(summary = "Gera QR Code vCard compatível com iPhone")
    public ResponseEntity<byte[]> gerarQrCodeDoUsuario(@PathVariable Long id) {
        try {
            // Use UsuarioQrDTO to include perfil
            UsuarioQrDTO usuario = usuarioService.buscarQrPorId(id);

            // Verificar se nome está presente
            if (usuario.getNome() == null || usuario.getNome().isEmpty()) {
                System.out.println("Aviso: Campo 'nome' está nulo ou vazio para o usuário ID: " + id);
                return ResponseEntity.badRequest().body(null);
            }

            // Verificar se perfil está presente
            if (usuario.getPerfil() == null || usuario.getPerfil().isEmpty()) {
                System.out.println("Aviso: Campo 'perfil' está nulo ou vazio para o usuário ID: " + id);
                return ResponseEntity.badRequest().body(null);
            } else {
                System.out.println("Campo 'perfil' encontrado: " + usuario.getPerfil());
            }

            // Verificar descrição
            String descricao = usuario.getDescricao() != null && !usuario.getDescricao().isEmpty()
                    ? usuario.getDescricao() : "";
            System.out.println("Campo 'descricao': " + (descricao.isEmpty() ? "vazio" : descricao));

            String noteField = descricao.isEmpty()
                    ? "NOTE:ID: %d\\nPerfil: %s"
                    : "NOTE:ID: %d\\nPerfil: %s\\nDescricao: %s";
            String textoQr = String.format(
                    "BEGIN:VCARD\nVERSION:3.0\nN:%s;;;;\nFN:%s\nTITLE:%s\n" + noteField + "\nEND:VCARD",
                    usuario.getNome(),
                    usuario.getNome(),
                    usuario.getPerfil(),
                    usuario.getId(),
                    usuario.getPerfil(),
                    descricao.isEmpty() ? new Object[]{} : descricao
            );

            // Log do texto para depuração
            System.out.println("Texto do QR Code: " + textoQr);

            // Configurar margem e codificação UTF-8 para o QR Code
            Map<EncodeHintType, Object> hints = new HashMap<>();
            hints.put(EncodeHintType.MARGIN, 4);
            hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");

            // Gerar QR Code com tamanho 500x500
            byte[] imagemQr = QRCodeGenerator.gerarQRCodeBytes(textoQr, 500, 500, hints);

            return ResponseEntity.ok()
                    .header("Content-Type", "image/png")
                    .body(imagemQr);

        } catch (RuntimeException e) {
            if (e.getMessage().contains("Usuário não encontrado")) {
                return ResponseEntity.status(404).body(null);
            }
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    @PostMapping("/qrcode/ler")
    public ResponseEntity<UsuarioOutputDTO> lerQRCode(@RequestParam("arquivo") MultipartFile arquivo) {
        try {
            BufferedImage bufferedImage = ImageIO.read(arquivo.getInputStream());
            LuminanceSource source = new BufferedImageLuminanceSource(bufferedImage);
            BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));
            Result resultado = new MultiFormatReader().decode(bitmap);

            String conteudo = resultado.getText();
            System.out.println("Conteúdo lido do QR Code: " + conteudo);

            // Tenta converter diretamente para Long
            Long id = Long.parseLong(conteudo.trim());

            // Chama o service para buscar o usuário
            UsuarioOutputDTO usuario = usuarioService.buscarPorId(id);
            return ResponseEntity.ok(usuario);

        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(null); // Conteúdo não era um número válido
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Usuário não encontrado
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}