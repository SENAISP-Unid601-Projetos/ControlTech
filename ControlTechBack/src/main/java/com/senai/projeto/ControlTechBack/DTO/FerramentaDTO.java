package com.senai.projeto.ControlTechBack.DTO;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FerramentaDTO {
    private Long id;
    private String nome;
    private String descricao;
    private Integer quantidadeEstoque;
    private LocalDate dataDevolucao; // <--- novo campo

}
