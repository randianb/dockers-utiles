package ar.org.leafnoise.template.rest.configuration;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ar.org.leafnoise.template.rest.Application;

public class ConfigurationReader {

	private static final Logger LOG = LoggerFactory.getLogger(ConfigurationReader.class);
	private static final String PROPERTIES_FILE_NAME = Application.PROJECT_NAME + ".properties";

	private static ConfigurationReader INSTANCE = new ConfigurationReader();

	private ConfigurationReader() {
		super();
	}

	public static ConfigurationReader getInstance() {

		if (INSTANCE == null) {
			INSTANCE = new ConfigurationReader();
		}
		return INSTANCE;
	}

	public static void loadProperties() {

		List<String> systemKeys = new ArrayList<String>();
		List<String> fileKeys = new ArrayList<String>();

		Properties systemProps = getInstance().getSystemProperties();
		Properties fileProps = getInstance().getFileProperties(PROPERTIES_FILE_NAME);

		for (String key : getConfigurationKeys(Vars.class)) {

			String finalValue = new String();

			if (systemProps.containsKey(key)) {

				finalValue = systemProps.getProperty(key);
				systemKeys.add(key);

			} else {

				finalValue = fileProps.getProperty(key);
				fileKeys.add(key);
			}

			ConfigurationVars.addProperty(key, finalValue);
		}

		LOG.info("SYSTEM properties -> " + systemKeys);
		LOG.info("FILE properties -> " + fileKeys);
	}

	private Properties getSystemProperties() {
		return System.getProperties();
	}

	private Properties getFileProperties(String fileName) {

		Properties fileProperties = new Properties();
		try {
			InputStream inputStream = getClass().getClassLoader().getResourceAsStream(fileName);
			fileProperties.load(inputStream);

		} catch (IOException e) {
			LOG.error("Read property error -> ", e);
		}
		return fileProperties;
	}

	/**
	 * <p>
	 * Devuelve los atriutos estaticos de una clase
	 * </p>
	 * 
	 * @param <T>
	 * @param clazz
	 * @return
	 */
	public static <T> List<String> getConfigurationKeys(Class<T> clazz) {

		List<String> keys = new ArrayList<String>();

		Field[] fields = clazz.getFields();
		for (Field field : fields) {

			try {
				keys.add(field.get(String.class).toString());

			} catch (IllegalArgumentException | IllegalAccessException e) {
				LOG.error(e.getLocalizedMessage(), e);
			}
		}

		return keys;
	}
}
