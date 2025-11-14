package com.senai.projeto.ControlTechBack.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioStatusDTO {
    private Long id;
    private String nome;
    private String perfil;
    private LocalDateTime dataAssociacao; // NOVO CAMPO
}