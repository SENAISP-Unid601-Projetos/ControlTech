package com.senai.projeto.ControlTechBack.DTO;

import lombok.Data;
import java.time.LocalDate;

@Data
public class HistoricoDevolucaoDTO {
    private Long id;
    private String nomeFerramenta;
    private String nomeUsuario;
    private LocalDate dataDevolucao;
    private String observacoes;
}
