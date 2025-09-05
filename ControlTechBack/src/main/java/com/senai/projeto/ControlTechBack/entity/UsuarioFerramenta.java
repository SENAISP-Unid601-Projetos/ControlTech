package com.senai.projeto.ControlTechBack.entity;


import jakarta.persistence.*;

import java.util.Date;

@Entity
public class UsuarioFerramenta {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        private Usuario usuario;

        @ManyToOne
        private Ferramenta ferramenta;

        private Date dataEmprestimo;
        private Date dataDevolucao;
}
