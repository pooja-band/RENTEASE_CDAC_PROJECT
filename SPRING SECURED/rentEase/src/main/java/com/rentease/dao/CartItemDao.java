package com.rentease.dao;



import org.springframework.data.jpa.repository.JpaRepository;

import com.rentease.entities.Cartitem;
import com.rentease.entities.Product;

public interface CartItemDao extends JpaRepository<Cartitem, Long> {
	
	 void deleteByProduct(Product product);
	 
	 void deleteByProductId(Long productId);

}