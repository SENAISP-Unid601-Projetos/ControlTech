package com.senai.projeto.ControlTechBack.controller;

import com.senai.projeto.ControlTechBack.DTO.*;
import com.senai.projeto.ControlTechBack.QrCode.QRCodeGenerator;
import com.senai.projeto.ControlTechBack.QrCode.QRCodeReader;
import com.senai.projeto.ControlTechBack.entity.Ferramenta;
import com.senai.projeto.ControlTechBack.entity.Usuario;
import com.senai.projeto.ControlTechBack.service.FerramentaService;
import com.senai.projeto.ControlTechBack.service.HistoricoService;
import com.senai.projeto.ControlTechBack.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ferramentas")
public class FerramentaQrCodeController {

    @Autowired
    private FerramentaService ferramentaService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private HistoricoService historicoService;
    // ✅ Listar todas
    @GetMapping
    public List<FerramentaDTO> listarTodas() {
        return ferramentaService.listarTodas();
    }

    // ✅ Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<FerramentaDTO> buscarPorId(@PathVariable Long id) {
        FerramentaDTO dto = ferramentaService.buscarPorId(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }
    // ✅ Criar ferramenta com JSON simples (sem QRCode)
    @PostMapping("/post")
    public ResponseEntity<?> criarFerramentaJson(@RequestBody FerramentaDTO dto) {
        try {
            FerramentaDTO criado = ferramentaService.salvar(dto);
            return ResponseEntity.ok(criado);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erro ao cadastrar ferramenta: " + e.getMessage());
        }
    }


    // ✅ Criar Ferramenta (com QR opcional)
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> criarFerramenta(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestPart("ferramenta") FerramentaDTO dto) {
        try {
            if (file != null && !file.isEmpty()) {
                File tempFile = File.createTempFile("ferramenta", ".png");
                file.transferTo(tempFile);
                String qrCode = QRCodeReader.lerQRCode(tempFile.getAbsolutePath()).trim();
                // você pode salvar o QRCode no DTO se quiser
                tempFile.delete();
            }
            FerramentaDTO criado = ferramentaService.salvar(dto);
            return ResponseEntity.ok(criado);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erro ao cadastrar ferramenta: " + e.getMessage());
        }
    }

    // ✅ Atualizar ferramenta
    @PutMapping("/{id}")
    public ResponseEntity<FerramentaDTO> atualizar(@PathVariable Long id, @RequestBody FerramentaDTO dto) {
        try {
            FerramentaDTO atualizado = ferramentaService.atualizar(id, dto);
            return ResponseEntity.ok(atualizado);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // ✅ Deletar ferramenta
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        ferramentaService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ Gerar QR Code da ferramenta
    @GetMapping("/{id}/qrcode")
    public ResponseEntity<byte[]> gerarQrCode(@PathVariable Long id) {
        try {
            FerramentaDTO dto = ferramentaService.buscarPorId(id);
            if (dto == null) return ResponseEntity.notFound().build();

            String qrText = String.valueOf(dto.getId());
            byte[] qrImage = QRCodeGenerator.gerarQRCodeBytes(qrText, 400, 400);

            return ResponseEntity.ok()
                    .header("Content-Type", "image/png")
                    .body(qrImage);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    // ATUALIZADO: Retorna a dataAssociacao
    @PostMapping("/associar/{id}")
    public ResponseEntity<Map<String, Object>> associarUsuario(
            @PathVariable Long id,
            @RequestBody UsuarioAssociarDTO body) {

        Long usuarioId = body.getUsuarioId();

        if (usuarioId == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("erro", "usuarioId não pode ser nulo"));
        }

        // Buscar ferramenta e usuário
        Optional<Ferramenta> optFerramenta = ferramentaService.buscarEntidadePorId(id);
        Optional<Usuario> optUsuario = usuarioService.buscarEntidadePorId(usuarioId);

        if (optFerramenta.isEmpty() || optUsuario.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("erro", "Usuário ou ferramenta não encontrados"));
        }

        Ferramenta ferramenta = optFerramenta.get();
        Usuario usuario = optUsuario.get();

        try {
            // Service deve apenas executar a lógica, não retornar String
            ferramentaService.associarUsuario(ferramenta, usuario);

            // ATUALIZADO: Retorna a dataAssociacao para o Front-end
            return ResponseEntity.ok(Map.of(
                    "mensagem", "Associado com sucesso!",
                    "ferramentaId", ferramenta.getId(),
                    "ferramentaNome", ferramenta.getNome(),
                    "usuarioId", usuario.getId(),
                    "usuarioNome", usuario.getNome(),
                    "dataAssociacao", ferramenta.getDataAssociacao() // NOVO CAMPO
            ));

        } catch (Exception e) {
            // Captura qualquer exceção do service e retorna JSON
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("erro", "Erro ao associar: " + e.getMessage()));
        }
    }

    // ATUALIZADO: Retorna a dataAssociacao
    @GetMapping("/{id}/usuario")
    public ResponseEntity<UsuarioStatusDTO> usuarioDaFerramenta(@PathVariable Long id) {
        Optional<Ferramenta> ferrOpt = ferramentaService.buscarEntidadePorId(id);
        if (ferrOpt.isEmpty()) return ResponseEntity.notFound().build();

        Ferramenta ferramenta = ferrOpt.get();
        Usuario usuario = ferramenta.getUsuario();

        if (usuario == null) {
            // Retorna DTO com campos nulos e dataAssociacao nula
            return ResponseEntity.ok(new UsuarioStatusDTO(null, null, null, null)); // dataAssociacao nula
        }

        // Retorna DTO com dados do usuário e a data de associação
        UsuarioStatusDTO dto = new UsuarioStatusDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getPerfil(),
                ferramenta.getDataAssociacao() // NOVO CAMPO
        );
        return ResponseEntity.ok(dto);
    }


    @GetMapping("/usuarios/associacao")
    public ResponseEntity<List<UsuarioOutputDTO>> listarUsuariosAssociados() {
        List<UsuarioOutputDTO> usuarios = usuarioService.listarUsuariosAssociados();
        return ResponseEntity.ok(usuarios);
    }
    // Retorna todas as ferramentas associadas a um usuário
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<FerramentaUsuarioDTO>> listarFerramentasDoUsuario(@PathVariable Long usuarioId) {
        List<FerramentaUsuarioDTO> lista = ferramentaService.listarFerramentasPorUsuario(usuarioId);
        return ResponseEntity.ok(lista);
    }

    // ATUALIZADO: Limpa a dataAssociacao
    @PostMapping("/{id}/devolver")
    public ResponseEntity<String> devolver(@PathVariable Long id,
                                           @RequestParam(required = false) String observacoes) {

        // Buscar a ferramenta
        Optional<Ferramenta> ferrOpt = ferramentaService.buscarEntidadePorId(id);
        if (ferrOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ferramenta não encontrada");
        }

        Ferramenta ferramenta = ferrOpt.get();
        Usuario usuario = ferramenta.getUsuario();

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Ferramenta não está associada a nenhum usuário");
        }

        // Registrar no histórico de devolução
        historicoService.registrarDevolucao(ferramenta, usuario, observacoes);

        // Desassociar ferramenta do usuário
        ferramenta.setUsuario(null);
        ferramenta.setDataDevolucao(null);
        ferramenta.setDataAssociacao(null); // NOVO: Limpa a data de associação
        ferramentaService.salvarOuAtualizar(ferramenta); // Método público para salvar alterações

        return ResponseEntity.ok("Devolução realizada com sucesso");
    }
    @GetMapping("/usuario/cracha/{cracha}")
    public ResponseEntity<List<FerramentaUsuarioDTO>> listarFerramentasDoUsuarioPorCracha(@PathVariable String cracha) {
        List<FerramentaUsuarioDTO> lista = ferramentaService.listarFerramentasPorCracha(cracha);
        return ResponseEntity.ok(lista);
    }

}