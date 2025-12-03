// ControlTechBack/src/main/java/com/senai/projeto/ControlTechBack/config/WebConfig.java

package com.senai.projeto.ControlTechBack.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc // Certifique-se de que esta anotação está presente para habilitar o WebMvcConfigurer
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Aplica a TODOS os endpoints da sua API
                .allowedOrigins(
                        // ORIGENS PERMITIDAS
                        "http://localhost:3000",
                        "http://localhost:8080",
                        "https://control-tech-six.vercel.app" // Esta é a origem correta.
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*"); // Permite todos os cabeçalhos
    }
}