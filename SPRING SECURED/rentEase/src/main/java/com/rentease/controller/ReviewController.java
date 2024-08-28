package com.rentease.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentease.dto.ReviewDTO;
import com.rentease.entities.Review;
import com.rentease.service.ReviewService;

@RestController
@RequestMapping("/reviews")

public class ReviewController {
	
	@Autowired
	private ReviewService reviewService;
	
	
	//API ADD NEW REVIEW FOR PRODUCT --PALAVI/ABHINAV SCRUM 40
	@PostMapping("/lessee/submit")
	public ResponseEntity<?> submitReview(@RequestBody ReviewDTO reviewDTO){
		
        return ResponseEntity.status(HttpStatus.CREATED)
				.body(reviewService.submitReview(reviewDTO));
	}

	


}
