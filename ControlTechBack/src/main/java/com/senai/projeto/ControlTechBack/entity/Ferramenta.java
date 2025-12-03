package com.senai.projeto.ControlTechBack.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Ferramenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    // private Integer quantidadeEstoque; // Removido: Usaremos Patrimônio

    private String patrimonio; // NOVO: Campo de Patrimônio

    private LocalDate dataDevolucao;
    private LocalDateTime dataAssociacao; // NOVO CAMPO

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

}