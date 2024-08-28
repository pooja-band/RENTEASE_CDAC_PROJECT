package com.rentease.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.rentease.dto.ApiResponse;
import com.rentease.entities.Users;

public interface ImageHandlingService {
	ApiResponse uploadImage(Long userId, MultipartFile image) throws IOException;
	byte[] serveImage(Long prodId) throws IOException;
//	//used for uploading img along with emp details
//	void uploadImage(Employee emp, MultipartFile image) throws IOException;
}
