package ar.org.leafnoise.template.rest.service;

import ar.org.leafnoise.template.rest.entity.Ejemplo;
import ar.org.leafnoise.template.rest.entity.exceptions.AppException;

/**
 * @author leafnoise
 *
 */
public interface ExampleService {

	/**
	 * @param number
	 * @return
	 * @throws AppException
	 */
	Ejemplo exampleMethod(Integer number) throws AppException;

	/**
	 * <p>
	 * Errores de {@link AppException} que este servicio puede lanzar
	 * </p>
	 */
	public enum Errors {
		BOOOM
	}
}
