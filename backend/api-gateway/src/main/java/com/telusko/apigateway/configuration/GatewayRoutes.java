//package com.telusko.apigateway.configuration;
//
//import org.springframework.cloud.gateway.route.RouteLocator;
//import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class GatewayRoutes {
//
//    @Bean
//    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
//        return builder.routes()
//                .route("quiz_service", r -> r.path("/quiz-service/**")
//                        .uri("http://localhost:8765")) // Adjust to your microservice URL
//                .build();
//    }
//}
