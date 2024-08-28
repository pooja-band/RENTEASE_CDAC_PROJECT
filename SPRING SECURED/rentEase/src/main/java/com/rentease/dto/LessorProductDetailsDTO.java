package com.rentease.dto;

import java.time.LocalDate;
import java.util.List;

import com.rentease.entities.BookingStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LessorProductDetailsDTO {
	 private ProductDetailsDTO product;
	    private List<BookingDTO> bookings;
}
