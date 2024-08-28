package com.rentease.dto;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import org.springframework.beans.factory.annotation.Value;

import com.rentease.entities.Role;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class UserRespDTO extends BaseDTO {
	     
		private String firstName;
		private String lastName;
		private String email;
		private LocalDate dob;
		private String photoId;
	 	private String phoneNo;
		private String address;
		private String city;
		private String state;
		private String country;
		private int postalCode;
		private Role role;
		private  int deleteStat;
}
