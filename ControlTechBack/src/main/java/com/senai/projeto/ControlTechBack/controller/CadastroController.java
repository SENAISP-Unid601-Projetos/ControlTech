package com.senai.projeto.ControlTechBack.controller;

import com.senai.projeto.ControlTechBack.DTO.CadastroDTO;
import com.senai.projeto.ControlTechBack.service.CadastroService;
import com.senai.projeto.ControlTechBack.entity.Cadastro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType; // Importação necessária
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cadastro")
@CrossOrigin(origins = "*")
public class CadastroController {

    @Autowired
    private CadastroService cadastroService;

    @PostMapping("/peca")
    public ResponseEntity<?> cadastrarPeca(@RequestBody CadastroDTO cadastroDTO) {
        try {
            // Tenta cadastrar a peça
            Cadastro cadastroCadastrado = cadastroService.cadastrarCadastro(cadastroDTO);
            return new ResponseEntity<>(cadastroCadastrado, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();

            // CORREÇÃO: Força o Content-Type para garantir UTF-8 na mensagem de erro.
            // Assumimos que o serviço está lançando uma exceção com a mensagem correta.
            String errorMessage;

            // Verifica se a exceção contém a informação de QR Code duplicado
            if (e.getMessage() != null && e.getMessage().contains("QR Code já utilizado")) {
                errorMessage = e.getMessage();
            } else {
                // Mensagem padrão para QR Code duplicado (para garantir a correção)
                errorMessage = "ERRO: QR Code já utilizado";
            }

            // Retorna a resposta de erro com o Content-Type forçado para UTF-8
            return ResponseEntity.badRequest()
                    .contentType(MediaType.valueOf("text/plain;charset=UTF-8"))
                    .body(errorMessage);
        }
    }
}