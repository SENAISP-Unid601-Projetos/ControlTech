package com.senai.projeto.ControlTechBack.DTO;

import lombok.Data;

@Data
public class UsuarioInputDTO {
    private String nome;
    private String perfil;
    private String descricao;
    private String qrCode;
}
