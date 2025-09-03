package com.senai.projeto.ControlTechBack.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

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
    private Integer quantidadeEstoque;


    private LocalDate dataDevolucao;

    // Relação com usuário
    @ManyToOne
    @JoinColumn(name = "usuario_id") // garante que FK será criada
    private Usuario usuario;
}

