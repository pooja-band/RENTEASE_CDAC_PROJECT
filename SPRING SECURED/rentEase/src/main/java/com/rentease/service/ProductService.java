package com.rentease.service;



import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.rentease.dto.ApiResponse;
import com.rentease.dto.LessorProductDetailsDTO;
import com.rentease.dto.ProductCreationDTO;
import com.rentease.dto.ProductDTO;
import com.rentease.dto.ProductDetailsDTO;
import com.rentease.entities.Category;
import com.rentease.entities.Product;

public interface ProductService {
	 Page<ProductDTO> findAllProducts(Pageable pageable);
	  List<ProductDTO> getProductsByCategory(String categoryName);
      ProductDetailsDTO getProductDetails(Long id);
	  List<ProductDTO> getProductsByBrand(String brandName);
	  List<ProductDTO> getProductbyPrice(double prodPrice);
	  List<ProductDTO> getProductbyLessor(Long lessorId);
	  
	  ApiResponse addProduct(Long userId, ProductCreationDTO productCreationDTO);
	  ApiResponse updateProductByLessor(Long productId, ProductDTO productDTO);
	  
	  ApiResponse hardDeleteProduct(Long productId);
	  
	  public LessorProductDetailsDTO getProductAndBookingDetailsByProductId(Long productId);
	  
	  public ApiResponse deleteProductByLessor(Long productId, Long lessorId);

	  



	  
	
}
