package com.rentease.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class BookingFinalDTO {
	  private Long productId;
	    private Long lesseeId;
	    private LocalDate startDate;
	    private LocalDate endDate;
	    private double totalPrice; // Added field

	    // Getters and Setters
}
