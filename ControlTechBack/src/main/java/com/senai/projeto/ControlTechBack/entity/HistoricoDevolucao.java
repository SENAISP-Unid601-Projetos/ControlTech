package com.senai.projeto.ControlTechBack.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class HistoricoDevolucao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_devolucao")
    private LocalDateTime dataDevolucao;

    private String observacoes;

    @ManyToOne
    @JoinColumn(name = "ferramenta_id")
    private Ferramenta ferramenta;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
