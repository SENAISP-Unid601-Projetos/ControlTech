package com.senai.projeto.ControlTechBack.DTO;

import lombok.Data;

import java.util.Date;

@Data
public class CadastroDTO {

    private String nome;
    private String descricao;
    private int quantidadeEstoque;
    private Date dataDevolucao;


}
