package com.senai.projeto.ControlTechBack.service;

import com.senai.projeto.ControlTechBack.DTO.CadastroDTO;
import com.senai.projeto.ControlTechBack.controller.CadastroController;
import com.senai.projeto.ControlTechBack.entity.Cadastro;
import com.senai.projeto.ControlTechBack.repository.CadastroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class CadastroService {

    @Autowired
    private CadastroRepository cadastroRepository;

    public Cadastro cadastrarCadastro(CadastroDTO cadastroDTO) {
        Cadastro cadastro = new Cadastro();
        cadastro.setNome(cadastroDTO.getNome());
        cadastro.setDescricao(cadastroDTO.getDescricao());
        cadastro.setQuantidadeEstoque(cadastroDTO.getQuantidadeEstoque());
        cadastro.setDataCadastro(new Date());
        cadastro.setDataDevolucao(cadastroDTO.getDataDevolucao());

        return cadastroRepository.save(cadastro);
    }
}
