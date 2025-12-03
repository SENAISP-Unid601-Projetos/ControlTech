package com.senai.projeto.ControlTechBack.DTO;

import lombok.Data;

@Data
public class FerramentaOutputDTO {
    private Long id;
    private String nome;
    private String descricao;
    private String patrimonio;
    private Long usuarioId;
    private String usuarioNome;
}

