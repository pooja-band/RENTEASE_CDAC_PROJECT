package com.rentease.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AuthRequest {
	@NotEmpty(message = "Email must be supplied")
	@Email(message = "Invalid email format")
	private String email;
	@NotEmpty(message = "Password must be supplied")
	private String password;
}
