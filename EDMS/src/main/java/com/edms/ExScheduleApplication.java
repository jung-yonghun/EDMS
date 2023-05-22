package com.edms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@ImportResource("classpath:batch-config.xml")
public class ExScheduleApplication{
    public static void main(String[] args){
        SpringApplication.run(ExScheduleApplication.class, args);
    }
}