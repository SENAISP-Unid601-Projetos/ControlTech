package com.senai.projeto.ControlTechBack.DTO;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class HistoricoDevolucaoDTO {
    private Long id;
    private String nomeFerramenta;
    private String nomeUsuario;
    private String usuarioTurma; // <-- NOVO CAMPO ADICIONADO
    private LocalDateTime dataDevolucao; // agora tem data + hora
    private String observacoes;
}