package com.rentease.service;

import java.time.LocalDate;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rentease.custom_exceptions.ResourceNotFoundException;
import com.rentease.dao.BookingDao;
import com.rentease.dao.ProductDao;
import com.rentease.dao.ReviewDao;
import com.rentease.dao.UserDao;
import com.rentease.dto.ApiResponse;
import com.rentease.dto.ReviewDTO;
import com.rentease.entities.Bookings;
import com.rentease.entities.Product;
import com.rentease.entities.Review;
import com.rentease.entities.Users;



@Service
@Transactional
public class ReviewServiceImpl implements ReviewService{
	
	
	@Autowired
	private BookingDao bookingDao;
	
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private ReviewDao reviewDao;
	
	@Autowired
	private UserDao userDao;
	
	@Override
	public ApiResponse submitReview(ReviewDTO reviewDTO) {
		Users lessee = userDao.findById(reviewDTO.getLesseeId()).orElseThrow(() -> new ResourceNotFoundException("Invalid Lessee ID !"));
		Product product = productDao.findById(reviewDTO.getProductId()).orElseThrow(() -> new ResourceNotFoundException("Product not found !"));
		
		Bookings booking = bookingDao.findByLesseeIdAndProductId(reviewDTO.getLesseeId(), reviewDTO.getProductId()).
				orElseThrow(() -> new ResourceNotFoundException("No Booking Found For This Product !"));
		
		 if (booking.getEndDate() == null) {
		        throw new RuntimeException("Booking end date is not set");
		    }

		
		LocalDate endDate = booking.getEndDate().toLocalDate();
	    if (endDate.isAfter(LocalDate.now())) {
	        throw new RuntimeException("Booking is not completed yet");
	    }

	Review review = mapper.map(reviewDTO, Review.class);
	
	lessee.addReviews(review);
	review.setLessee(lessee);
	product.addPReviews(review);
	review.setProduct(product);
	
//	 Review review = new Review();
//     review.setLessee(lessee);
//     review.setProduct(product);
//     review.setReview(reviewText);  // Set the review text here

     return new ApiResponse("Added new review");
	

}
}
