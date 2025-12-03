package com.senai.projeto.ControlTechBack.DTO;

import com.fasterxml.jackson.annotation.JsonFormat; // Import necessário
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
    private String turma;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")
    private LocalDateTime dataAssociacao;
}