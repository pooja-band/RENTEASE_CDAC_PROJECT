package com.rentease.dao;









import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rentease.entities.BookingStatus;
import com.rentease.entities.Categories;
import com.rentease.entities.Category;
import com.rentease.entities.Product;
import com.rentease.entities.Users;

public interface ProductDao extends JpaRepository<Product, Long> {
	 List<Product> findByCategory_Id(Long categoryId);
	 List<Product> findByBrandName(String brandNm);
	 
	 @Query("select c from Product c where c.productPrice<=:prodPrice")
		List<Product> listProductbyPrice(double prodPrice);

	  @Query("SELECT p FROM Product p WHERE p.lessor.id = :lessorId AND p.lessor.role = 'LESSOR'")
		List<Product> listProductbyLessor_Id(Long lessorId);
	  
  
	  List<Product> findByLessor(Users lessor);
	  
	  Optional<Product> findByIdAndLessorId(Long productId, Long lessorId);
	  
	 

}
