package com.senai.projeto.ControlTechBack.repository;

import com.senai.projeto.ControlTechBack.entity.Ferramenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FerramentaRepository extends JpaRepository<Ferramenta, Long> {
    List<Ferramenta> findByUsuarioId(Long usuarioId);

    // Para o crachá (QrCode)
    @Query("SELECT f FROM Ferramenta f WHERE f.usuario.qrCode = :qrCode")
    List<Ferramenta> findByUsuarioQrCode(String qrCode);
}
