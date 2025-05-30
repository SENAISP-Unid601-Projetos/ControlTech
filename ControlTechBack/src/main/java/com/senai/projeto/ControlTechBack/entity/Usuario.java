package com.senai.projeto.ControlTechBack.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    long id;
    private String nome;
    private String perfil;
    private String descricao;

    // Novo campo:
    @Column(unique = true)
    private String codigoCracha;


}
