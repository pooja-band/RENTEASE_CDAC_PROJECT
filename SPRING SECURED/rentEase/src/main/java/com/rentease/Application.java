package com.rentease;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean // equivalent to <bean id ..../> in xml file
	public ModelMapper mapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration()
		.setMatchingStrategy(MatchingStrategies.STRICT)
		//=> prop name n data type MUST match between src n target objects
				.setPropertyCondition(Conditions.isNotNull());
		//not to transfer null values from src -> target
		return modelMapper;//method rets configured ModelMapper instance
		//to the caller - SC
	}

}
