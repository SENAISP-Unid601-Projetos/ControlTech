package com.senai.projeto.ControlTechBack.DTO;

import lombok.Data;

@Data
public class UsuarioQrDTO {
    private long id;
    private String nome;
    private String turma;

    public UsuarioQrDTO(long id, String nome, String turma) {
        this.id = id;
        this.nome = nome;
        this.turma = turma;
    }
}