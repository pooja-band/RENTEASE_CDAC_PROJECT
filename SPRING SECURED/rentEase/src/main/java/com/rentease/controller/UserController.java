package com.rentease.controller;

import javax.validation.Valid;


import org.springframework.beans.factory.annotation.Autowired;
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

import com.rentease.custom_exceptions.ResourceNotFoundException;
import com.rentease.dto.ApiResponse;
import com.rentease.dto.AuthRequest;
import com.rentease.dto.LessorDetailsDTO;
import com.rentease.dto.UserAcceptDTO;
import com.rentease.dto.UserRespDTO;
import com.rentease.dto.UserUpdateDTO;
import com.rentease.entities.Users;
import com.rentease.service.UserService;
import com.rentease.service.*;
@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired //byType
	private UserService userService;

	public UserController() {
		System.out.println("in ctor " + getClass());
	}


	
	//API FOR LOGIN --ABHINAV SCRUM 21 --BASIC
//	@PostMapping("/signin") //@RequestMapping(method=POST)
//	public ResponseEntity<?> signInUser(
//			@RequestBody @Valid AuthRequest request) {
//		//@RequestBody => Json -> Java (un marshalling | de ser)
//		System.out.println("in signin " + request);
//		System.out.println("service "+userService);
//			return ResponseEntity.ok(
//					userService.authenticateUser(request));
//		
//	}
	
	//API FOR REGISTER --ABHINAV SCRUM 20 -- BASIC
//	@PostMapping("/register")
//	public ResponseEntity<?> addNewUser(@RequestBody UserAcceptDTO newUser) {
//		System.out.println("in add new User " + newUser);
//
//		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUserDetails(newUser));
//	}
	
     //API FOR GETTING USER DETAILS BY ID-- SWAPNIL SCRUM 27
	@GetMapping("/profile/{id}")
	public ResponseEntity<?> viewUserDetails(@PathVariable Long id){
		try {
			UserRespDTO user = userService.viewUserDetails(id);	
			return ResponseEntity.ok(user);
		} catch (ResourceNotFoundException e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
	}
	
	//API FOR UPDATING USER DETAILS-- SWAPNIL SCRUM 28
	@PutMapping("update/profile/{id}")
	public ResponseEntity<?> updateUser(@PathVariable Long id,@RequestBody UserUpdateDTO updatedUser)
	{
		try {
			UserRespDTO user = userService.updateUser(id, updatedUser);
			return ResponseEntity.status(HttpStatus.OK).body(user);
		} catch (ResourceNotFoundException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
		
	}

	//API FOR GETTING LESSOR DETAILS BY PRODUCT ID ON CONFIRMATIOIN OF ORDER --PALLAVI/ABHINAV SCRUM 38
	 @GetMapping("/lessee/detailsForBookingConfirmation")
	    public ResponseEntity<LessorDetailsDTO> getLessorDetails(@RequestParam Long productId) {
	        LessorDetailsDTO lessorDetails = userService.getLessorDetailsByProductId(productId);
	        return ResponseEntity.ok(lessorDetails);
	    }
     
	 
	 //API FOR DELETING LESSOR PROFILE AND ALL ITS PRODUCTS --ABHINAV SCRUM 29
	  @DeleteMapping("/lessor/delete/{id}")
	  public ResponseEntity<?> deleteUser(@PathVariable Long id) {
	        ApiResponse response = userService.softDeleteLessor(id);
	        return ResponseEntity.ok(response);
	       
	    }

}
