package com.absfitness.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * Spring Boot does not auto-configure RestTemplate — it is injected by the generated
 * code but never declared, which compiles clean and then fails the context
 * refresh at boot. Supplied here with a dependency-free default.
 */
@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
