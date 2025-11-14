package com.senai.projeto.ControlTechBack.DTO;

import lombok.Data;

@Data
public class UsuarioQrDTO {
    private long id;
    private String nome;
    private String perfil;

    public UsuarioQrDTO(long id, String nome, String perfil) {
        this.id = id;
        this.nome = nome;
        this.perfil = perfil;
    }
}