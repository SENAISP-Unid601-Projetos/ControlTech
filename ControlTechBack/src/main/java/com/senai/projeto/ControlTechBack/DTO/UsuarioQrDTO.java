package com.senai.projeto.ControlTechBack.DTO;

import lombok.Data;

@Data
public class UsuarioQrDTO {
    private long id;
    private String nome;
    private String perfil;
    private String descricao;

    public UsuarioQrDTO(long id, String nome, String perfil, String descricao) {
        this.id = id;
        this.nome = nome;
        this.perfil = perfil;
        this.descricao = descricao;
    }
}