package com.rentease.dto;

import com.rentease.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
//@AllArgsConstructor
public class SigninResponse {
	private String jwt;
	private String mesg;
    private Long id;
    private String firstName;
    private String role;
    
    
	public SigninResponse(String jwt, String mesg, Long id, String firstName, String role) {
		super();
		this.jwt = jwt;
		this.mesg = mesg;
		this.id = id;
		this.firstName = firstName;
		this.role = role;
	}
    
    
    

}
