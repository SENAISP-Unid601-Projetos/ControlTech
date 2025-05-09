package com.senai.projeto.ControlTechBack.DTO;

import lombok.Data;

@Data
public class UsuarioOutputDTO {
    private long id;
    private String nome;
    private String perfil;
    private String qrCode;
}
