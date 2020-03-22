package examples;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import ar.org.leafnoise.template.rest.controller.ApplicationController;
import ar.org.leafnoise.template.rest.controller.ExampleController;
import ar.org.leafnoise.template.rest.entity.Ejemplo;
import ar.org.leafnoise.template.rest.service.ExampleService;

public class TestRestSuiteExample extends TestSuite {

	private static final String URL_EXAMPLE = "/v1/examples/someone/1";

	@Mock
	private ExampleService exampleService;

	@InjectMocks
	private ExampleController exampleController;

	@InjectMocks
	private ApplicationController applicationController;

	@Before
	public void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(exampleController, applicationController).build();
	}

	@Test
	public void testObtenerResponseYValidarAManoConJunit() throws Exception {

		Ejemplo respuestaEsperada = Ejemplo.builder().numero(1).palabra("hellow!").build();

		Mockito.when(exampleService.exampleMethod(1)).thenReturn(respuestaEsperada);

		ResultActions result = mockMvc.perform(MockMvcRequestBuilders.get(URL_EXAMPLE));

		Ejemplo response = getResponseObject(result, Ejemplo.class);

		Assert.assertNotNull(response);
		Assert.assertEquals(respuestaEsperada, response);
	}

	@Test
	public void testSoloMeImportaQueElStatusSeaOk() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get(URL_EXAMPLE)).andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	public void testValidarPropertyDelResponseSpringosamente() throws Exception {

		Ejemplo respuestaEsperada = Ejemplo.builder().numero(1).palabra("HOLA MUNDO!").build();

		Mockito.when(exampleService.exampleMethod(1)).thenReturn(respuestaEsperada);

		mockMvc.perform(MockMvcRequestBuilders.get(URL_EXAMPLE))
				.andExpect(MockMvcResultMatchers.jsonPath("$.numero").value(1));
	}
}