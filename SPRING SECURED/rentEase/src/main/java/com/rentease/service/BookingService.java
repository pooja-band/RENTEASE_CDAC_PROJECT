package com.rentease.service;

import java.util.List;

import com.rentease.dto.ApiResponse;
import com.rentease.dto.AvailabilityCheckDTO;
import com.rentease.dto.BookingDTO;
import com.rentease.dto.BookingFinalDTO;
import com.rentease.dto.BookingResponseDTO;
import com.rentease.dto.OrderSummaryDTO;

public interface BookingService {

	public ApiResponse checkProductAvailability(AvailabilityCheckDTO availabilityCheckDTO);
	
	 public List<BookingDTO> getBookingsForLessee(Long lesseeId);

 OrderSummaryDTO getOrderSummary(Long lesseeId);
	 
	 ApiResponse cancelBooking(Long bookingId);
	 
	 public BookingResponseDTO createBooking(BookingFinalDTO bookingDTO);
}
