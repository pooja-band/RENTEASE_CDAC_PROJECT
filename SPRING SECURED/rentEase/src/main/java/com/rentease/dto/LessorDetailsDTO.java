package com.rentease.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LessorDetailsDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNo;
    private String address;
    private String city;
    private String state;
    private String country;
}
