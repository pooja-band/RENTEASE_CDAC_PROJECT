package com.rentease.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentease.custom_exceptions.BookingException;
import com.rentease.custom_exceptions.NoBookingHistoryFoundException;
import com.rentease.dto.ApiResponse;
import com.rentease.dto.AvailabilityCheckDTO;
import com.rentease.dto.BookingDTO;
import com.rentease.dto.BookingFinalDTO;
import com.rentease.dto.BookingResponseDTO;
import com.rentease.dto.OrderSummaryDTO;
import com.rentease.service.BookingService;

@RestController
@RequestMapping("/bookings")
public class BookingController {

	@Autowired
    private BookingService bookingService;

	//API TO CHECK AVAILABILITY OF PRODUCT TO PROCEED FOR BOOKING --POOJA/ABHINAV SCRUM 33
    @PostMapping("/lessee/check-availability")
    public ResponseEntity<?> checkAvailability(@RequestBody AvailabilityCheckDTO availabilityCheckDTO) {
        ApiResponse response = bookingService.checkProductAvailability(availabilityCheckDTO);
        return ResponseEntity.ok(response);
    }
    
  //API TO BOOKING HISTORY OF LESSEE --POOJA/ABHINAV SCRUM 34
    @GetMapping("/lessee/{lesseeId}")
    public ResponseEntity<List<BookingDTO>> getBookingDetailsForLessee(@PathVariable Long lesseeId) {
        List<BookingDTO> bookingDetails = bookingService.getBookingsForLessee(lesseeId);
        return ResponseEntity.ok(bookingDetails);
    }
    
    //API TO GET BOOKING SUMMARY OF LESSEE INCLUDING PRODUCT DETAILS --PALLAVI/HONEY SCRUM 37
  	@GetMapping("/lessee/summary/{lesseeId}")
  	public ResponseEntity<OrderSummaryDTO> getOrderSummary(@PathVariable Long lesseeId){
  	try {
  		OrderSummaryDTO orderSummary = bookingService.getOrderSummary(lesseeId);
  		return ResponseEntity.ok(orderSummary);
  		
  	
  		
  	}catch(Exception e ) {
  		e.printStackTrace();
  		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
  	}
  	
  }
  	//API TO GET BOOKING SUMMARY OF LESSEE INCLUDING PRODUCT DETAILS --PALLAVI/HONEY SCRUM 39
  	@PostMapping("/lessee/{bookingId}/cancel")
  	public ResponseEntity<?> cancelBooking(@PathVariable Long bookingId){
  		ApiResponse responseMessage = bookingService.cancelBooking(bookingId);
  		if(responseMessage.getMessage().equals("Booking successfully cancelled")) {
  			return ResponseEntity.ok(responseMessage);
  		}else {
  			return ResponseEntity.badRequest().body(responseMessage);
  		}
  			
  	}
  	
  	//API TO CREATE BOOKING--ABHINAV
    @PostMapping("/lessee/createBooking")
        public ResponseEntity<?> createBooking(@RequestBody BookingFinalDTO bookingDTO) {
        try {
            BookingResponseDTO response = bookingService.createBooking(bookingDTO);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse("An error occurred while creating the booking"));
        }
    }
}
