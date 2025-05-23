package com.senai.projeto.ControlTechBack.controller;

import com.senai.projeto.ControlTechBack.DTO.UsuarioOutputDTO;
import com.senai.projeto.ControlTechBack.QrCode.QRCodeGenerator;
import com.google.zxing.WriterException;
import com.senai.projeto.ControlTechBack.QrCode.QRCodeReader;
import com.senai.projeto.ControlTechBack.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/qrcode")
public class QrCodeController {

    @Autowired
    UsuarioService usuarioService;

    @GetMapping("/{id}/qrcode")
    public ResponseEntity<byte[]> gerarQrCodeDoUsuario(@PathVariable Long id) {
        try {
            UsuarioOutputDTO usuario = usuarioService.buscarPorId(id);

            // Aqui você define o texto que vai ser codificado no QR Code:
            String textoQr = "ID:" + usuario.getId() + "; Nome:" + usuario.getNome() + "; Perfil:" + usuario.getPerfil() + "; Descricao" + usuario.getDescricao();

            byte[] imagemQr = QRCodeGenerator.gerarQRCodeBytes(textoQr, 400, 400);

            return ResponseEntity.ok()
                    .header("Content-Type", "image/png")
                    .body(imagemQr);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

}

