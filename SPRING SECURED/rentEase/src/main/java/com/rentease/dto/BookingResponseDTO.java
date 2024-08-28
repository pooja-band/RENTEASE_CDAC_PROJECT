package com.rentease.dto;

//BookingResponseDTO.java
import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class BookingResponseDTO {
 private Long id;
 private Long productId;
 private Long lesseeId;
 private LocalDate startDate;
 private LocalDate endDate;
 
 private Double totalPrice; // Added field

 // Getters and Setters
}
