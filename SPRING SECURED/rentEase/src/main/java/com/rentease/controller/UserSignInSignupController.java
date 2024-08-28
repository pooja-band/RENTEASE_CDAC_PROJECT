package com.rentease.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentease.dao.UserDao;
import com.rentease.dto.SigninRequest;
import com.rentease.dto.SigninResponse;
import com.rentease.dto.SignupRequest;
import com.rentease.dto.SignupResponse;
import com.rentease.entities.Users;
import com.rentease.security.CustomUserDetails;
import com.rentease.security.JwtUtils;
import com.rentease.service.UserService;

@RestController
@RequestMapping("/users")
public class UserSignInSignupController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private AuthenticationManager authMgr;

	/*
	 * URL - http://host:port/users/signin Method - POST request payload : Auth req
	 * DTO : email n password resp payload : In case of success : Auth Resp DTO :
	 * mesg + JWT token + SC 201 In case of failure : SC 401
	 * 
	 */
	//API FOR LOGIN --ABHINAV SCRUM 21
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody 
			@Valid SigninRequest request) {
		System.out.println("in sign in" + request);
		//create a token(implementation of Authentication i/f)
		//to store un verified user email n pwd
		UsernamePasswordAuthenticationToken token=new 
				UsernamePasswordAuthenticationToken(request.getEmail(), 
						request.getPassword());
		//invoke auth mgr's authenticate method;
		Authentication verifiedToken = authMgr.authenticate(token);
		//=> authentication n authorization  successful !
		System.out.println(verifiedToken.getPrincipal().getClass());//custom user details object
		
		
		
		  // Extract custom user details
        CustomUserDetails userDetails = (CustomUserDetails) verifiedToken.getPrincipal();

        // Generate JWT token
        String jwtToken = jwtUtils.generateJwtToken(verifiedToken);

        // Prepare response with JWT and user details
        SigninResponse response = new SigninResponse(
                jwtToken,
                "Successful Authentication!",
                userDetails.getUser().getId(),
                userDetails.getUser().getFirstName(),
                userDetails.getUser().getRole().name()
        );
//		//create JWT n send it to the clnt in response
//		SigninResponse resp=new SigninResponse
//				(jwtUtils.generateJwtToken(verifiedToken),
//				"Successful Auth!!!!");
		return ResponseEntity.
				status(HttpStatus.CREATED).body(response);
	}
	
	//API FOR REGISTER --ABHINAV SCRUM 20
	 @PostMapping("/signup")
	    public ResponseEntity<SignupResponse> registerUser(@RequestBody @Valid SignupRequest request) {
	        // Create a new User entity from the request
	        Users newUser = new Users();
	        newUser.setFirstName(request.getFirstName());
	        newUser.setLastName(request.getLastName());
	        newUser.setEmail(request.getEmail());
	        newUser.setPassword(request.getPassword()); // Password will be encoded in the service layer
	        newUser.setDob(request.getDob());
	        newUser.setPhotoId(request.getPhotoId());
	        newUser.setPhoneNo(request.getPhoneNo());
	        newUser.setAddress(request.getAddress());
	        newUser.setCity(request.getCity());
	        newUser.setState(request.getState());
	        newUser.setCountry(request.getCountry());
	        newUser.setPostalCode(request.getPostalCode());
	        newUser.setRole(request.getRole()); // Set the user's role
	        newUser.setDeleteStat(0); // Default value for deleteStat

	        // Save the new user to the database
	        userService.registerNewUser(newUser);

	        // Authenticate the new user
	        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
	        Authentication authenticatedUser = authMgr.authenticate(token);

	        // Generate JWT token for the new user
	        String jwtToken = jwtUtils.generateJwtToken(authenticatedUser);

	        // Return response with success message and JWT token
	        SignupResponse response = new SignupResponse("User registered successfully", jwtToken);
	        return ResponseEntity.status(HttpStatus.CREATED).body(response);
	    }

}
