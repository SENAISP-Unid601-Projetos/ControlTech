package com.senai.projeto.ControlTechBack.DTO;

import jakarta.persistence.Entity;
import lombok.Data;

import java.time.LocalDate;

@Data
public class FerramentaDTO {
    private Long id;
    private String nome;
    private String descricao;
    private Integer quantidadeEstoque;
    private LocalDate dataDevolucao; // <--- novo campo

}
