package com.rentease.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rentease.entities.Cart;

public interface CartDao extends JpaRepository<Cart, Long> {
	Optional<Cart> findByLesseeId(Long lesseeId);
	
	  @Query("SELECT c.id FROM Cart c WHERE c.lessee.id = :lesseeId")
	    Long findCartIdByLesseeId( Long lesseeId);
	  
	

}
