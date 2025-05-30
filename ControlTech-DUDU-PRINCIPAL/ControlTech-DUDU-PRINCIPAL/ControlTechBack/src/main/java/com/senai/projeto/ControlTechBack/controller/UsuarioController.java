package com.senai.projeto.ControlTechBack.controller;

import com.senai.projeto.ControlTechBack.DTO.UsuarioInputDTO;
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
    public ResponseEntity<UsuarioOutputDTO> criarUsuario(@RequestBody UsuarioInputDTO dto) {
        UsuarioOutputDTO criado = usuarioService.criar(dto);
        return ResponseEntity.ok(criado);
    }

    @GetMapping
    @Operation(summary = "Lista todos os usuários")
    public ResponseEntity<List<UsuarioOutputDTO>> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @GetMapping("/qr/{qrCode}")
    @Operation(summary = "Busca um usuário pelo QR Code")
    public ResponseEntity<UsuarioOutputDTO> buscarPorQrCode(@PathVariable String qrCode) {
        return ResponseEntity.ok(usuarioService.buscarPorQrCode(qrCode));
    }
}
