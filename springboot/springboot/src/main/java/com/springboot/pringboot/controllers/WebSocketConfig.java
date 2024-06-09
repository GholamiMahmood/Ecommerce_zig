package com.springboot.pringboot.controllers;
import com.springboot.pringboot.model.Achat;
import com.springboot.pringboot.jpa_repository.AchatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.util.List;

/*
Pour configurer les WebSockets dans le backend Spring Boot,
 vous aurez besoin d'ajouter les dépendances nécessaires dans
  votre fichier pom.xml comme suit :
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
<dependency>
    <groupId>org.webjars</groupId>
    <artifactId>sockjs-client</artifactId>
    <version>1.5.1</version>
</dependency>
<dependency>
    <groupId>org.webjars</groupId>
    <artifactId>stomp-websocket</artifactId>
    <version>2.3.3</version>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
---------------------------------------------------

En utilisant Spring WebSocket, la méthode @MessageMapping
écoute les messages provenant du frontend, tandis que
@SendTo envoie le message vers le frontend.
   */
@Async
@EnableWebSocketMessageBroker
@RestController
@CrossOrigin
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private AchatRepository achatRepository;

    @Autowired
    public void AchatController(AchatRepository achatRepository) {
        this.achatRepository = achatRepository;
    }


    public WebSocketConfig() {
        achatRepository = null;
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/user");
        config.setApplicationDestinationPrefixes("/app");
        config.setUserDestinationPrefix("/user");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }

    @MessageMapping("/utilisateurid")
    @SendTo("/topic/achats")
    @Async
    public List<Achat> getAchatsForUser(@Payload String utilisateurid) throws InterruptedException {
           List<Achat> achats= achatRepository.findAllByUtilisateurId(utilisateurid);
        return achats;
    }
}