package com.rentease.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

import com.rentease.custom_exceptions.InvalidCategoryException;
import com.rentease.custom_exceptions.ResourceNotFoundException;
import com.rentease.dao.BookingDao;
import com.rentease.dao.CartItemDao;
import com.rentease.dao.CategoryDao;
import com.rentease.dao.ProductDao;
import com.rentease.dao.UserDao;
import com.rentease.dto.ApiResponse;
import com.rentease.dto.BookingDTO;
import com.rentease.dto.CategoryDTO;
import com.rentease.dto.LessorProductDetailsDTO;
import com.rentease.dto.ProductCreationDTO;
import com.rentease.dto.ProductDTO;
import com.rentease.dto.ProductDetailsDTO;
import com.rentease.entities.Bookings;
import com.rentease.entities.Categories;
import com.rentease.entities.Category;
import com.rentease.entities.Product;
import com.rentease.entities.Role;
import com.rentease.entities.Users;


@Service
@Transactional

public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private UserDao userDao;
	
	   @Autowired
	    private CategoryService categoryService;
	   
	   @Autowired
	    private CategoryDao categoryDao;
	   
	   @Autowired
	    private CartItemDao cartItemDao;
	   
	   @Autowired
	   private BookingDao bookingDao;
	
	@Autowired
	private ModelMapper mapper;
	
	
	//to find all products for home page
	@Override
	public Page<ProductDTO> findAllProducts(Pageable pageable) {

		  Page<Product> productPage = productDao.findAll(pageable);
	        List<ProductDTO> productDTOs = productPage.getContent().stream()
	                .map(product -> mapper.map(product, ProductDTO.class))
	                .collect(Collectors.toList());
	        return new PageImpl<>(productDTOs, pageable, productPage.getTotalElements());
	}
	

	


	@Override
	public List<ProductDTO> getProductsByCategory(String categoryName) {
		CategoryDTO categoryDTO = categoryService.findCategoryByName(categoryName);
        List<Product> products = productDao.findByCategory_Id(categoryDTO.getId());
        return products.stream()
                .map(product -> mapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
	}





	@Override
	public List<ProductDTO> getProductsByBrand(String brandName) {
		List<Product> products = productDao.findByBrandName(brandName);
		return products.stream()
                .map(product -> mapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
	}





	@Override
	public List<ProductDTO> getProductbyPrice(double prodPrice) {
		List<Product> products = productDao.listProductbyPrice(prodPrice);
		return products.stream()
                .map(product -> mapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
	}





	@Override
	public List<ProductDTO> getProductbyLessor(Long lessorId) {
		List<Product> products = productDao.listProductbyLessor_Id(lessorId);
		return products.stream()
                .map(product -> mapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
	}





	@Override
	public ApiResponse addProduct(Long userId, ProductCreationDTO productCreationDTO) {
		 Users lessor = userDao.findByIdAndRole(userId, Role.ROLE_LESSOR)
	                .orElseThrow(() -> new ResourceNotFoundException("Lessor not found with id: " + userId));

	        Category category = categoryDao.findById(productCreationDTO.getCategoryId())
	                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + productCreationDTO.getCategoryId()));

	        Product product = new Product();
	        product.setName(productCreationDTO.getName());
	        product.setDescription(productCreationDTO.getDescription());
	        product.setBrandName(productCreationDTO.getBrandName());
	        product.setModelName(productCreationDTO.getModelName());
	        product.setProductState(productCreationDTO.getProductState());
	        product.setMfgDate(productCreationDTO.getMfgDate());
	        product.setComponentsIncluded(productCreationDTO.getComponentsIncluded());
	        product.setProductPrice(productCreationDTO.getProductPrice());
	        product.setSecurityDeposit(productCreationDTO.getSecurityDeposit());
	        product.setAvailableCity(productCreationDTO.getAvailableCity());
	        product.setProductImage(productCreationDTO.getProductImage());
	        product.setCategory(category);
	        product.setLessor(lessor);
	        productDao.save(product);

	        return new ApiResponse("Added new Product in the list of lessor");
	}
	
	@Override
	public ApiResponse updateProductByLessor(Long productId, ProductDTO productDTO) {
		Product existingProduct = productDao.findById(productId)
				.orElseThrow(()-> new RuntimeException("Product not found"));
		
		mapper.map(productDTO, existingProduct);
		
		return new ApiResponse("Product updated successfully");
	}





	@Override
	public ProductDetailsDTO getProductDetails(Long id) {
		Product prodDetails= productDao.findById(id).
				orElseThrow(() -> new ResourceNotFoundException("Lessor not found with id: " + id));
		return mapper.map(prodDetails, ProductDetailsDTO.class);
	}





	@Override
	public ApiResponse hardDeleteProduct(Long productId) {
		 Product product = productDao.findById(productId)
	                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

	        // Delete all related bookings first
	        bookingDao.deleteByProduct(product);
	        
	        // Delete all related cart items
	        cartItemDao.deleteByProduct(product);

	        // Now delete the product itself
	        productDao.delete(product);

	        return new ApiResponse("Product and associated bookings deleted successfully.");
	}

	 @Override
	 public LessorProductDetailsDTO getProductAndBookingDetailsByProductId(Long productId) {
	        // Fetch the product by its ID
	        Product product = productDao.findById(productId)
	                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

	        // Fetch the bookings for the product
	        List<Bookings> bookings = bookingDao.findByProductId(productId);

	        // Convert Product entity to ProductDTO
	        ProductDetailsDTO productDTO = mapper.map(product, ProductDetailsDTO.class);

	        // Convert Booking entities to BookingDTOs
	        List<BookingDTO> bookingDTOs = bookings.stream()
	                .map((Bookings booking) -> mapper.map(booking, BookingDTO.class))
	                .collect(Collectors.toList());

	        // Prepare the final DTO
	        LessorProductDetailsDTO productDetailsDTO = new LessorProductDetailsDTO();
	        productDetailsDTO.setProduct(productDTO);
	        productDetailsDTO.setBookings(bookingDTOs);

	        return productDetailsDTO;
	    }
	 
	 @Override
	  public ApiResponse deleteProductByLessor(Long productId, Long lessorId) {
	        // Fetch the product by its ID
	        Product product = productDao.findByIdAndLessorId(productId, lessorId)
	                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId + " for lessor id: " + lessorId));

	        // Check if the product has any active bookings
	        boolean hasBookings = bookingDao.existsByProductId(productId);

	        if (hasBookings) {
	            return new ApiResponse( "Product cannot be deleted as it has active bookings.");
	        }
	     // Delete all references in CartItem related to this product
	        cartItemDao.deleteByProductId(productId);

	        // Delete the product
	        productDao.delete(product);
	        return new ApiResponse( "Product deleted successfully.");
	    }
	

	
}
