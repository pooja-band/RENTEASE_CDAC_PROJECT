package com.rentease.dao;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rentease.dto.BookingDTO;
import com.rentease.entities.Bookings;
import com.rentease.entities.Product;

public interface BookingDao extends JpaRepository<Bookings,Long> {
	Optional<Bookings> findByLesseeIdAndProductId(Long lesseeId, Long productId);

	List<Bookings> findByProductId(Long productId);
	void deleteByProduct(Product product);
	
	  @Query("SELECT b FROM Bookings b WHERE b.product.id = :productId AND " +
	            "(b.startDate <= :endDate AND b.endDate >= :startDate)")
	    List<Bookings> findBookingsByProductIdAndDates(Long productId,
	                                                  Date startDate,
	                                                  Date endDate);

	  
	  List<Bookings> findByLesseeId(Long lesseeId);
	  
	  boolean existsByProductId(Long productId);
}
