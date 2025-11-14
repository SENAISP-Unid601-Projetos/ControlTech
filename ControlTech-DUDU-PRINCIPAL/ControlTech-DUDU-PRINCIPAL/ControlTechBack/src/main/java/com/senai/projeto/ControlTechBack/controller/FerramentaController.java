package com.senai.projeto.ControlTechBack.controller;

import com.senai.projeto.ControlTechBack.DTO.FerramentaDTO;
import com.senai.projeto.ControlTechBack.service.FerramentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

    @RestController
    @RequestMapping("/api/ferramentas")
    public class FerramentaController {

        @Autowired
        private FerramentaService ferramentaService;

        @GetMapping
        public List<FerramentaDTO> listarTodas() {
            return ferramentaService.listarTodas();
        }

        @GetMapping("/{id}")
        public ResponseEntity<FerramentaDTO> buscarPorId(@PathVariable Long id) {
            FerramentaDTO ferramentaDTO = ferramentaService.buscarPorId(id);
            return ferramentaDTO != null ? ResponseEntity.ok(ferramentaDTO) : ResponseEntity.notFound().build();
        }

        @PostMapping
        public ResponseEntity<FerramentaDTO> salvar(@RequestBody FerramentaDTO ferramentaDTO) {
            FerramentaDTO ferramentaSalva = ferramentaService.salvar(ferramentaDTO);
            URI uri = URI.create("/api/ferramentas/" + ferramentaSalva.getId());
            return ResponseEntity.created(uri).body(ferramentaSalva);
        }

        @PutMapping("/{id}")
        public ResponseEntity<FerramentaDTO> atualizar(@PathVariable Long id, @RequestBody FerramentaDTO ferramentaDTO) {
            FerramentaDTO ferramentaAtualizada = ferramentaService.atualizar(id, ferramentaDTO);
            return ResponseEntity.ok(ferramentaAtualizada);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deletar(@PathVariable Long id) {
            ferramentaService.deletar(id);
            return ResponseEntity.noContent().build();
        }
    }






