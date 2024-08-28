package com.rentease.service;

import com.rentease.dto.ApiResponse;
import com.rentease.dto.AuthRequest;
import com.rentease.dto.LessorDetailsDTO;
import com.rentease.dto.UserAcceptDTO;
import com.rentease.dto.UserRespDTO;
import com.rentease.dto.UserUpdateDTO;
import com.rentease.entities.Users;

public interface UserService {
	UserRespDTO authenticateUser(AuthRequest dto);
	Users saveUserDetails(UserAcceptDTO user);

	UserRespDTO viewUserDetails(Long id);
	UserRespDTO updateUser(Long id,UserUpdateDTO userAcceptDTO );

	 public LessorDetailsDTO getLessorDetailsByProductId(Long productId);
	
	 public ApiResponse softDeleteLessor(Long userId);
	 
	 public Users registerNewUser(Users user);
}
