
package ar.org.leafnoise.template.rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

import ar.org.leafnoise.template.rest.configuration.ConfigurationReader;

@SpringBootApplication
@EnableScheduling
@EntityScan(basePackages = { "ar.org.leafnoise.template.rest.entity" })
@ComponentScan(basePackages = { "ar.org.leafnoise.template.rest", "io.moorea.utils" })
public class Application extends SpringBootServletInitializer {

	public static final String PROJECT_NAME = "rest";

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {

		ConfigurationReader.loadProperties();
		return application.sources(Application.class);
	}

	public static void main(String[] args) {

		ConfigurationReader.loadProperties();
		SpringApplication.run(Application.class, args);
	}
}