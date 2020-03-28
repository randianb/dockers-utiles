package ar.org.leafnoise.template.rest.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import ar.org.leafnoise.template.rest.entity.Ejemplo;
import ar.org.leafnoise.template.rest.entity.exceptions.AppException;
import ar.org.leafnoise.template.rest.service.ExampleService;

@Service
public class ExampleServiceImpl implements ExampleService {

	private static final Logger LOG = LoggerFactory.getLogger(ExampleServiceImpl.class);

	@Override
	public Ejemplo exampleMethod(Integer number) throws AppException {

		if (number.equals(100)) {
			throw AppException.builder().code(Errors.BOOOM).message("te lo dije").build();
		}

		Ejemplo example = Ejemplo.builder().numero(1).palabra("Hola, no pongas 100 porque exploto").build();
		LOG.info("example ->" + example.toString());

		return example;
	}

}
