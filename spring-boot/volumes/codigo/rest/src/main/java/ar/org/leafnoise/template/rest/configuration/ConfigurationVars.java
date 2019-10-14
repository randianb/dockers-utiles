package ar.org.leafnoise.template.rest.configuration;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ConfigurationVars {

	private static final Logger LOG = LoggerFactory.getLogger(ConfigurationVars.class);

	private static ConfigurationVars INSTANCE = new ConfigurationVars();

	private Map<String, String> propertiesMap;

	private ConfigurationVars() {
		propertiesMap = new HashMap<String, String>();
	}

	private static ConfigurationVars getInstance() {
		if (INSTANCE == null) {
			INSTANCE = new ConfigurationVars();
		}
		return INSTANCE;
	}

	public static Map<String, String> getPropertiesMap() {
		return getInstance().propertiesMap;
	}

	public static void addProperty(String key, String value) {
		getPropertiesMap().put(key, value);
	}

	public static <T> T get(String key, Class<T> typeProperty) {

		String value = getPropertiesMap().get(key);
		try {
			if (typeProperty.isEnum()) {
				return getEnum(key, typeProperty);
			}
			return typeProperty.getConstructor(String.class).newInstance(value);

		} catch (Exception e) {
			String message = "Error en carga de variable -> KEY: %s; CLASE: %s";
			LOG.error(String.format(message, key, typeProperty.getSimpleName()), e);
			return null;
		}
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	private static <T, E extends Enum> T getEnum(String key, Class<T> enumClass) {

		String value = getPropertiesMap().get(key);
		return (T) Enum.valueOf((Class<E>) enumClass, value.toUpperCase());
	}

	public static String get(String key) {
		return getPropertiesMap().get(key);
	}
}
