package ar.org.leafnoise.template.rest.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ar.org.leafnoise.template.rest.entity.Ejemplo;
import ar.org.leafnoise.template.rest.entity.exceptions.AppException;
import ar.org.leafnoise.template.rest.service.ExampleService;

@RestController
@RequestMapping("/api/v1/ejemplos")
public class ExampleController {

	private static final Logger LOG = LoggerFactory.getLogger(ExampleController.class);

	@Autowired
	private ExampleService exampleService;

	@GetMapping
	public ResponseEntity<Object> getExample() {
		try {

			Map<String, Object> map = new HashMap<String, Object>();
			map.put("mensaje", "ejemplos/{unNumero} para probar!");
			map.put("fecha", new Date());

			return new ResponseEntity<>(map, HttpStatus.OK);

		} catch (Exception e) {
			LOG.error(e.getLocalizedMessage(), e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/{number}")
	public ResponseEntity<Object> getExampleNumber(@PathVariable Integer number) {
		try {
			Ejemplo response = exampleService.exampleMethod(number);
			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (AppException e) {
			return e.buildRestResponse();

		} catch (Exception e) {
			LOG.error(e.getLocalizedMessage(), e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
