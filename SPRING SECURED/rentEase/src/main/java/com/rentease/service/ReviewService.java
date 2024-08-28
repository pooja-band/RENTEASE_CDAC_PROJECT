package com.rentease.service;

import com.rentease.dto.ApiResponse;
import com.rentease.dto.ReviewDTO;
import com.rentease.entities.Review;

public interface ReviewService {
	ApiResponse submitReview(ReviewDTO reviewDTO);

}
