package com.senai.projeto.ControlTechBack.controller;

import com.senai.projeto.ControlTechBack.DTO.CadastroDTO;
import com.senai.projeto.ControlTechBack.service.CadastroService;
import com.senai.projeto.ControlTechBack.entity.Cadastro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cadastro")
public class CadastroController {

    @Autowired
    private CadastroService cadastroService;

    @PostMapping("/peca")
    public ResponseEntity<Cadastro> cadastrarPeca(@RequestBody CadastroDTO cadastroDTO) {
        Cadastro cadastroCadastrado = cadastroService.cadastrarCadastro(cadastroDTO);
        return new ResponseEntity<>(cadastroCadastrado, HttpStatus.CREATED);
    }
}
