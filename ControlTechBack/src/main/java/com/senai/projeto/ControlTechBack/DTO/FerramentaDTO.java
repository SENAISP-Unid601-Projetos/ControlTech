package com.senai.projeto.ControlTechBack.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
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

    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;
    private String nome;
    private String descricao;
    private String patrimonio;
    private LocalDate dataDevolucao;

}