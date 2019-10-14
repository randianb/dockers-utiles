package examples;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpMethod;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.google.gson.Gson;

import io.moorea.utils.bean.IntrospectionUtil;

//@ContextConfiguration(classes= {ConfigurationTest.class})
//@ContextConfiguration(locations = {"/applicationContextTest.xml"})
@RunWith(SpringRunner.class)
//ESTO ES PARA QUE LEVANTE BIEN EL CONTEXTO (GUARDA, BEAN UTIL TE LEVANTA EL CONTEXTO PERO NO CON LOS MOCKS)
//@SpringBootTest(classes = { Application.class, BeanUtil.class })
//ESTO ES PARA QUE LIMPIE EL CONTEXTO LUEGO DE CADA METODO
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public abstract class TestSuite {

	private static final Logger LOG = LoggerFactory.getLogger(IntrospectionUtil.class);

	private static final String URL_ALIVE = "/alive";

	protected MockMvc mockMvc;

	@Test
	public void testAlive() throws Exception {

		mockMvc.perform(MockMvcRequestBuilders.get(URL_ALIVE)).andExpect(MockMvcResultMatchers.status().isOk());
	}

	protected <T> T getResponseObject(HttpMethod method, String url, Object parameters, Class<T> clazz)
			throws UnsupportedEncodingException, IllegalAccessException, IllegalArgumentException,
			InvocationTargetException, Exception {

		return getResponseObject(makeCall(method, url, parameters), clazz);
	}

	protected <T> T getResponseObject(ResultActions result, Class<T> clazz) throws UnsupportedEncodingException {

		T response = null;
		String json = result.andReturn().getResponse().getContentAsString();

		try {
			response = (T) IntrospectionUtil.jsonToObjectWithJackson(json, clazz);
		} catch (IOException e) {
			response = (new Gson()).fromJson(json, clazz);
			LOG.error(e.getLocalizedMessage(), e);
		}

		return response;
	}

	private ResultActions makeCall(HttpMethod method, String url, Object parameters)
			throws IllegalAccessException, IllegalArgumentException, InvocationTargetException, Exception {

		RequestBuilder requestBuilder = null;

		switch (method) {
		case GET:
			requestBuilder = MockMvcRequestBuilders.get(url);
			break;

		case POST:
			requestBuilder = MockMvcRequestBuilders.post(url, parameters);
		default:
			break;
		}

		return mockMvc.perform(requestBuilder);
	}

}