package ar.org.leafnoise.template.rest.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@AllArgsConstructor
@ToString
public class RedisKeyValue {

	private String key;
	private String value;
	private Boolean setOnlyIfNotExists;
	private Long ttlSeconds;

	public RedisKeyValue() {
		super();
		this.setOnlyIfNotExists = false;
		this.ttlSeconds = 60l;
	}

}
