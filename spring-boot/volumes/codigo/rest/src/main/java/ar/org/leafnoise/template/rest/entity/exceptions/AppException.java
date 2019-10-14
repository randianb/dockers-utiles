package ar.org.leafnoise.template.rest.entity.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper = false)
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = false)
public class AppException extends Exception {

	private static final long serialVersionUID = 2804926324726597154L;
	private static final HttpStatus STATUS_ERROR = HttpStatus.CONFLICT;

	private Enum<?> code;
	private String message;
	private Exception exception;

	public ResponseEntity<Object> buildRestResponse() {

		Map<String, Object> map = new HashMap<>();
		map.put("code", this.code);
		map.put("message", this.message);

		return new ResponseEntity<Object>(map, STATUS_ERROR);
	}
}
