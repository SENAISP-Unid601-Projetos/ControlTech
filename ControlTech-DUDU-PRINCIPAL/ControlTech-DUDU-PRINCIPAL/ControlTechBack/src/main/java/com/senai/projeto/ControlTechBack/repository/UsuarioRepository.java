package com.senai.projeto.ControlTechBack.repository;

import com.senai.projeto.ControlTechBack.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByQrCode(String qrCode);
}
