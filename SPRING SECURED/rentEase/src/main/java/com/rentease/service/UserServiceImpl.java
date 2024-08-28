package com.rentease.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rentease.custom_exceptions.ApiException;
import com.rentease.custom_exceptions.AuthenticationException;
import com.rentease.custom_exceptions.ResourceNotFoundException;

import com.rentease.dao.ProductDao;

import com.rentease.dao.UserDao;
import com.rentease.dto.ApiResponse;
import com.rentease.dto.AuthRequest;
import com.rentease.dto.LessorDetailsDTO;
import com.rentease.dto.UserAcceptDTO;
import com.rentease.dto.UserRespDTO;

import com.rentease.dto.UserUpdateDTO;
import com.rentease.entities.BookingStatus;
import com.rentease.entities.Product;
import com.rentease.entities.Role;

import com.rentease.entities.Users;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private ModelMapper mapper;
	
	//SPRING SECURITY ENABLED REGISTRATION
	  @Autowired
	  @Lazy
	    private PasswordEncoder passwordEncoder;
	  
	  	@Override
	    public Users registerNewUser(Users user) {
	        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encrypt password
	        return userDao.save(user); // Save user to the database
	    }

	@Override
	public UserRespDTO authenticateUser(AuthRequest dto) {
		// 1.invoke dao 's method
		Users user = userDao.findByEmailAndPassword(dto.getEmail(), dto.getPassword())
				.orElseThrow(() -> new AuthenticationException("Invalid Email or Password !!!!!!"));
		// valid login -user : persistent -> entity -> dto
		return mapper.map(user, UserRespDTO.class);
	}

	@Override
	public Users saveUserDetails(UserAcceptDTO user) {
		// validate if category already exists by the supplied name : B.L validation
		if (userDao.existsByEmail(user.getEmail())) {
			throw new ApiException("user already exists ! try with another email");
		}
		// => category name - unique
		Users newUser = mapper.map(user, Users.class);
		return userDao.save(newUser);
	}

	@Override
	public UserRespDTO viewUserDetails(Long id) {
		Users user = userDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User Does Not Exist !!!!!!"));
      System.out.println("service layer" + user);
		// validation => if the user is already deleted.
		if (user.getDeleteStat() == 1) {
			throw new ResourceNotFoundException("User profile is deleted!!!");
		}

		return mapper.map(user, UserRespDTO.class);
	}

	@Override
	public UserRespDTO updateUser(Long id, UserUpdateDTO userUpdateDTO) {
	    Users user = userDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("User Not Found !!!!"));

	    // Check for null values to avoid unnecessary updates and maintain original details
	    if (userUpdateDTO.getFirstName() != null) {
	        user.setFirstName(userUpdateDTO.getFirstName());
	    }
	    if (userUpdateDTO.getLastName() != null) {
	        user.setLastName(userUpdateDTO.getLastName());
	    }
	    if (userUpdateDTO.getEmail() != null) {
	        user.setEmail(userUpdateDTO.getEmail());
	    }
	    if (userUpdateDTO.getPassword() != null) {
	        user.setPassword(userUpdateDTO.getPassword());
	    }
	    if (userUpdateDTO.getDob() != null) {
	        user.setDob(userUpdateDTO.getDob());
	    }
	    if (userUpdateDTO.getPhotoId() != null) {
	        user.setPhotoId(userUpdateDTO.getPhotoId());
	    }
	    if (userUpdateDTO.getPhoneNo() != null) {
	        user.setPhoneNo(userUpdateDTO.getPhoneNo());
	    }
	    if (userUpdateDTO.getAddress() != null) {
	        user.setAddress(userUpdateDTO.getAddress());
	    }
	    if (userUpdateDTO.getCity() != null) {
	        user.setCity(userUpdateDTO.getCity());
	    }
	    if (userUpdateDTO.getState() != null) {
	        user.setState(userUpdateDTO.getState());
	    }
	    if (userUpdateDTO.getCountry() != null) {
	        user.setCountry(userUpdateDTO.getCountry());
	    }
	    if (userUpdateDTO.getPostalCode() != 0) {
	        user.setPostalCode(userUpdateDTO.getPostalCode());
	    }
	    if (userUpdateDTO.getRole() != null) {
	        user.setRole(userUpdateDTO.getRole());
	    }

	    Users updatedUser = userDao.save(user);
	    return mapper.map(updatedUser, UserRespDTO.class);
	}
	
//	@Override
//	public UserRespDTO updateUser(Long id, UserUpdateDTO userUpdateDTO) {
//		Users user = userDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("User Not Found !!!!"));
//
//		// checking for null valies to avoid unnecessary updation of unwanted fields
//		user.setFirstName(userUpdateDTO.getFirstName());
//		user.setLastName(userUpdateDTO.getLastName());
//		user.setEmail(userUpdateDTO.getEmail());
//		user.setPassword(userUpdateDTO.getPassword());
//		user.setDob(userUpdateDTO.getDob());
//		user.setPhotoId(userUpdateDTO.getPhotoId());
//		user.setPhoneNo(userUpdateDTO.getPhoneNo());
//		user.setAddress(userUpdateDTO.getAddress());
//		user.setCity(userUpdateDTO.getCity());
//		user.setState(userUpdateDTO.getState());
//		user.setCountry(userUpdateDTO.getCountry());
//		user.setPostalCode(userUpdateDTO.getPostalCode());
//		user.setRole(userUpdateDTO.getRole());
//
//		Users updatedUser = userDao.save(user);
//		return mapper.map(updatedUser, UserRespDTO.class);
//	}

	@Override
	public LessorDetailsDTO getLessorDetailsByProductId(Long productId) {
		  Product product = productDao.findById(productId)
		            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

		        Users lessor = product.getLessor();
		        if (lessor == null || lessor.getRole() != Role.ROLE_LESSOR) {
		            throw new ResourceNotFoundException("Lessor not found for the product");
		        }

		        LessorDetailsDTO dto = new LessorDetailsDTO();
		        dto.setId(lessor.getId());
		        dto.setFirstName(lessor.getFirstName());
		        dto.setLastName(lessor.getLastName());
		        dto.setEmail(lessor.getEmail());
		        dto.setPhoneNo(lessor.getPhoneNo());
		        dto.setAddress(lessor.getAddress());
		        dto.setCity(lessor.getCity());
		        dto.setState(lessor.getState());
		        dto.setCountry(lessor.getCountry());

		        return dto;
	}

	

	@Override
	public ApiResponse softDeleteLessor(Long userId) {
	    // Fetch the user by ID
	    Users user = userDao.findById(userId)
	            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

	    // Check if user is already deleted
	    if (user.getDeleteStat() == 1) {
	        return new ApiResponse("User profile is already deleted");
	    }

	    // Fetch all products of the lessor
	    List<Product> allUserProducts = productDao.findByLessor(user);

	    // Check if any products are rented
	    boolean hasRentedProducts = allUserProducts.stream()
	            .anyMatch(product -> BookingStatus.RENTED.equals(product.getProductState()));

	    if (hasRentedProducts) {
	        return new ApiResponse("Lessor has products that are not available. Cannot delete.");
	    }

	    // Proceed with hard delete of products
	    for (Product product : allUserProducts) {
	        productDao.delete(product); // Hard delete the product
	    }

	    // Mark user as deleted
	    user.setDeleteStat(1);
	    userDao.save(user);

	    return new ApiResponse("Lessor and associated products deleted successfully.");
	}
    }
		
    	


