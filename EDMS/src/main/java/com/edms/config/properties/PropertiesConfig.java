package com.edms.config.properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import java.io.IOException;

/**
 * The type Properties config.
 */
@Configuration
public class PropertiesConfig {
  /**
   * Place holder configurer property sources placeholder configurer.
   *
   * @return the property sources placeholder configurer
   * @throws IOException the io exception
   */
  @Bean
  public static PropertySourcesPlaceholderConfigurer placeHolderConfigurer() throws IOException {
	PropertySourcesPlaceholderConfigurer propertyConfigurer = new PropertySourcesPlaceholderConfigurer();
	propertyConfigurer.setLocations(new PathMatchingResourcePatternResolver().getResources("classpath:/**/*.properties"));
	return propertyConfigurer;
  }
}