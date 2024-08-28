package com.rentease.controller;

import javax.validation.Valid;
import static org.springframework.http.MediaType.IMAGE_GIF_VALUE;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import com.rentease.custom_exceptions.InvalidCategoryException;
import com.rentease.dao.ProductDao;
import com.rentease.dto.ApiResponse;
import com.rentease.dto.AuthRequest;
import com.rentease.dto.LessorProductDetailsDTO;
import com.rentease.dto.ProductCreationDTO;
import com.rentease.dto.ProductDTO;
import com.rentease.entities.Category;
import com.rentease.entities.Product;
import com.rentease.service.CategoryService;
import com.rentease.service.ProductService;
import com.rentease.service.ImageHandlingService;
import com.rentease.service.UserService;


@RestController
@RequestMapping("/products")
public class ProductController {

	
		
		@Autowired //byType
		private ProductService productService;
		
		@Autowired //byType
		private CategoryService categoryService;
		
		@Autowired
		private ProductDao productDao;
		
		@Autowired
		private ModelMapper modelMapper;
		
		
		@Autowired
		private ImageHandlingService imageService;
		

		public ProductController() {
			System.out.println("in ctor " + getClass());
		}

	    
		//API GET PRODUCT LIST FOR HOME PAGE OF LESSEE --ABHINAV SCRUM 30
		 @GetMapping("/lessee")
		    public ResponseEntity<?> getAllProducts(Pageable pageable) {
		        try {
		            Page<ProductDTO> productDTOs = productService.findAllProducts(pageable);
		            return new ResponseEntity<>(productDTOs, HttpStatus.OK);
		        } catch (Exception e) {
		            return new ResponseEntity<>("Error fetching products: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		        }
		    }
		 
		 
		 //API GET PRODUCT LIST BY CATEGORY TYPE (FILTER) -- ABHINAV SCRUM 31
		  @GetMapping("/lessee/category/{categoryName}")
		    public ResponseEntity<List<ProductDTO>> getProductsByCategory(@PathVariable String categoryName) {
		        try {
		            List<ProductDTO> products = productService.getProductsByCategory(categoryName);
		            return ResponseEntity.ok(products);
		        } catch (InvalidCategoryException e) {
		            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		        }
		    }
		  
		  
		  //API GET PRODUCT LIST BY BRAND NAME (FILTER) -- ABHINAV SCRUM 31
		  @GetMapping("/lessee/brand/{brandName}")
		    public ResponseEntity<?> getProductsByBrand(@PathVariable String brandName) {
		        try {
		            List<ProductDTO> products = productService.getProductsByBrand(brandName);
		            return ResponseEntity.ok(products);
		        } catch (InvalidCategoryException e) {
		            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		        }
		    }
		  
		  //API GET PRODUCT LIST BY PRICE (LESS THAN GIVEN PRICE -FILTER) -- ABHINAV SCRUM 31
		  @GetMapping("/lessee/price/{prodPrice}")
		    public ResponseEntity<?> getProductsByPrice(@PathVariable double prodPrice) {
		        try {
		            List<ProductDTO> products = productService.getProductbyPrice(prodPrice);
		            return ResponseEntity.ok(products);
		        } catch (InvalidCategoryException e) {
		            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		        }
		    }
		  
			//API GET PRODUCT LIST FOR HOME PAGE OF LESSOR --ABHINAV SCRUM 22
		  @GetMapping("/lessor/{lessorId}")
		    public ResponseEntity<?> getProductsByLessorId(@PathVariable Long lessorId) {
		        try {
		            List<ProductDTO> products = productService.getProductbyLessor(lessorId);
		            return ResponseEntity.ok(products);
		        } catch (InvalidCategoryException e) {
		            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		        }
		    }
		  
		  
			//API ADD NEW PRODUCT IN PRODUCT TABLE FOR LESSOR --PALAVI/ABHINAV SCRUM 24
		  @PostMapping("/lessor/addNewProd/{lessorId}")
		    public ResponseEntity<?> addProduct(@PathVariable Long lessorId, @RequestBody ProductCreationDTO productCreationDTO) {
		      
		        return ResponseEntity.status(HttpStatus.CREATED).body(productService.addProduct(lessorId, productCreationDTO));
		    }
		  
		 
		//API UPDATE PRODUCT IN PRODUCT TABLE FOR LESSOR --PALAVI SCRUM 25
		  @PutMapping("/lessor/{productId}")
			public ResponseEntity<ApiResponse> updateProduct(
					@PathVariable Long productId,
					@RequestBody ProductDTO productDTO){
				try {
					ApiResponse updateProduct = productService.updateProductByLessor(productId, productDTO);
					return ResponseEntity.ok(updateProduct);
				}catch(RuntimeException e) {
					return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
				}
				
			}
		  
		  //API GET PRODUCT DETAILS BY ID FOR LESSEE-- POOJA/ABHINAV SCRUM 32
		  @GetMapping("/lessee/byProductId/{id}")
		    public ResponseEntity<?> getProduct(@PathVariable Long id) {
		  	            
		            return ResponseEntity.ok(productService.getProductDetails(id));
		        
		    }
		  
		//API DELETE ANY PRODUCT AND ASSOCIATED BOOKINGS BY ADMIN --PALAVI/ABHINAV SCRUM 44
		  @DeleteMapping("/admin/{productId}")
		    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Long productId) {
		        ApiResponse response = productService.hardDeleteProduct(productId);
		        return ResponseEntity.ok(response);
		    }
		  
		  //API GET PRODUCT AND BOOKING DETAILS BY ID FOR LESSOR -- POOJA/ABHINAV SCRUM 23
		  @GetMapping("/lessor/{productId}/details")
		    public ResponseEntity<?> getProductAndBookingDetails(@PathVariable Long productId) {
		        LessorProductDetailsDTO productDetailsDTO = productService.getProductAndBookingDetailsByProductId(productId);
		        return ResponseEntity.ok(productDetailsDTO);
		    }
		  
		  //API DELETE PRODUCT OF LESSOR -- POOJA/ABHINAV SCRUM 26
		    @DeleteMapping("/lessor/deletebylessor/{productId}")
		    public ResponseEntity<ApiResponse> deleteProductByLessor(
		            @PathVariable Long productId,
		            @RequestParam Long lessorId) {
		        ApiResponse response = productService.deleteProductByLessor(productId, lessorId);
		        HttpStatus status = response.getMessage().equals("Product deleted successfully.") ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
		        return ResponseEntity.status(status).body(response);
		    }
		    
		    
		    //API TO ADD IMAGE FOR PRODUCT --ABHINAV
			@PostMapping(value = "/lessor/images/{prodId}",
					consumes = "multipart/form-data")
			public ResponseEntity<?> uploadImage(@PathVariable 
					Long prodId, 
					@RequestParam MultipartFile image)
					throws IOException {
				System.out.println("in upload image " + prodId);
				return ResponseEntity.status(HttpStatus.CREATED).
						body(imageService.uploadImage(prodId, image));
			}
			
			//API TO DOWNLOAD IMAGE OF PRODUCT 
			@GetMapping(value = "/images/{prodId}", 
					produces = 
				{ IMAGE_GIF_VALUE, IMAGE_JPEG_VALUE, IMAGE_PNG_VALUE })
			public ResponseEntity<?> downloadImage(@PathVariable long prodId) throws IOException {
				System.out.println("in download image " + prodId);
				return ResponseEntity.ok(imageService.serveImage(prodId));
			}

}
