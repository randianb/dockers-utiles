package io.moorea.utils.bean;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

public class IntrospectionUtil {

	private static final Logger LOG = LoggerFactory.getLogger(IntrospectionUtil.class);

	/**
	 * @param obj
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> objectToMap(Object obj) throws Exception {

		Map<String, Object> result = new LinkedHashMap<String, Object>();

		BeanInfo info = Introspector.getBeanInfo(obj.getClass());
		for (PropertyDescriptor pd : info.getPropertyDescriptors()) {

			Method reader = pd.getReadMethod();
			if (reader != null && !pd.getName().equals("class")) {
				result.put(pd.getName(), reader.invoke(obj));
			}
		}

		return result;
	}

	/**
	 * @param listObject
	 * @return
	 * @throws Exception
	 */
	public static List<Map<String, Object>> objectListToMapList(List<?> listObject) throws Exception {

		List<Map<String, Object>> listMap = new ArrayList<Map<String, Object>>();
		for (Object obj : listObject) {
			listMap.add(objectToMap(obj));
		}

		return listMap;
	}

	/**
	 * @param obj
	 * @param clazz
	 * @return
	 */
	public static <T> T mapToObject(Map<String, Object> obj, Class<T> clazz) {

		try {
			T result = clazz.newInstance();

			BeanInfo info = null;
			info = Introspector.getBeanInfo(clazz);

			for (PropertyDescriptor pd : info.getPropertyDescriptors()) {

				Method setter = pd.getWriteMethod();
				if (setter != null)
					setter.invoke(result, obj.get(pd.getName()));
			}
			return result;

		} catch (Exception e) {
			LOG.error(e.getLocalizedMessage(), e);
			return null;
		}
	}

	/**
	 * @param obj
	 * @return
	 * @throws JsonSyntaxException
	 * @throws JsonProcessingException
	 */
	public static Map<String, Object> objectToMapWithJackson(Object obj)
			throws JsonSyntaxException, JsonProcessingException {

		String json = objectToJsonWithJackson(obj);
		@SuppressWarnings("unchecked")
		Map<String, Object> map = (new Gson()).fromJson(json, Map.class);
		return map;
	}

	/**
	 * @param obj
	 * @return
	 * @throws JsonProcessingException
	 */
	public static String objectToJsonWithJackson(Object obj) throws JsonProcessingException {

		ObjectMapper mapper = new ObjectMapper();
		mapper.setVisibility(PropertyAccessor.ALL, Visibility.NONE);
		mapper.setVisibility(PropertyAccessor.SETTER, Visibility.ANY);
		mapper.setVisibility(PropertyAccessor.GETTER, Visibility.ANY);

		return mapper.writeValueAsString(obj);
	}

	/**
	 * @param json
	 * @param clazz
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	public static <T> T jsonToObjectWithJackson(String json, Class<T> clazz)
			throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		return json == null ? null : mapper.readValue(json, clazz);
	}

}
