package com.senai.projeto.ControlTechBack.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String nome;
    String perfil;
    String qrCode;
    String fotoUrl; // Campo da foto
}