package com.senai.projeto.ControlTechBack.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioOutputDTO {
    private Long id;
    private String nome;
    private String perfil;
    private String qrCode;
    private String fotoUrl;
}