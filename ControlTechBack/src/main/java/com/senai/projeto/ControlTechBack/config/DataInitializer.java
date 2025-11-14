package com.senai.projeto.ControlTechBack.config;
// O pacote pode ser o que você preferir, 'config' é uma boa convenção

// Importe suas classes exatas
import com.senai.projeto.ControlTechBack.entity.Ferramenta;
import com.senai.projeto.ControlTechBack.repository.FerramentaRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.Arrays;

/**
 * Esta classe é executada automaticamente na inicialização do Spring Boot
 * e serve para popular o banco de dados com dados iniciais (seeding).
 */
@Component
public class DataInitializer implements CommandLineRunner {

    // Injeta seu repositório
    private final FerramentaRepository ferramentaRepository;

    // O Spring vai injetar o repositório aqui automaticamente
    public DataInitializer(FerramentaRepository ferramentaRepository) {
        this.ferramentaRepository = ferramentaRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        // 1. Só executa se o banco estiver vazio
        if (ferramentaRepository.count() == 0) {
            System.out.println(">>> [DataInitializer] Banco de dados vazio. Populando dados iniciais...");

            // 2. Crie as ferramentas usando o @Builder da sua entidade

            Ferramenta f1 = Ferramenta.builder()
                    .nome("Multímetro Digital")
                    .descricao("Multímetro digital com true RMS, modelo ET-2082E")
                    .quantidadeEstoque(5)
                    // Os outros campos (usuario, datas) ficam null por padrão
                    .build();

            Ferramenta f2 = Ferramenta.builder()
                    .nome("Fonte de Alimentação DC")
                    .descricao("Fonte de 0-30V, 0-5A, ajustável")
                    .quantidadeEstoque(3)
                    .build();

            Ferramenta f3 = Ferramenta.builder()
                    .nome("Estação de Solda")
                    .descricao("Estação de solda com controle de temperatura")
                    .quantidadeEstoque(4)
                    .build();

            // 3. Salve todas no banco de dados
            ferramentaRepository.saveAll(Arrays.asList(f1, f2, f3));

            System.out.println(">>> [DataInitializer] " + ferramentaRepository.count() + " ferramentas cadastradas!");

        } else {
            System.out.println(">>> [DataInitializer] O banco de dados já estava populado.");
        }
    }
}