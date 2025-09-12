package com.senai.projeto.ControlTechBack.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FerramentaUsuarioDTO {
    private Long ferramentaId;
    private String ferramentaNome;
    private Integer quantidadeEstoque;
    private LocalDate dataDevolucao;

    private Long usuarioId;
    private String usuarioNome;
    private String usuarioPerfil;
    private String usuarioQrCode;

}

