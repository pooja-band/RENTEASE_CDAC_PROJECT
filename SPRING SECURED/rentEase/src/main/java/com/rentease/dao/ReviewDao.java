package com.rentease.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rentease.entities.Review;

public interface ReviewDao extends JpaRepository<Review,Long> {

	

}
