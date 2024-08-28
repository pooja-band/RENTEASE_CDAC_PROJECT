package com.rentease.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.rentease.dao.UserDao;
import com.rentease.entities.Users;

@Service
@Transactional
public class CustomUserDetailsService implements UserDetailsService {
	@Autowired
	private UserDao userRepo;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// invoke dao's method
		Users user = userRepo.findByEmail(email)
				.orElseThrow(() -> 
				new UsernameNotFoundException("Email not found !!!!!"));
		//=> user email exists - user : persistent
		/*
		 * In case of email found -- this method has to ret UserDetails object filled with details lifted from DB
		 */
		return new CustomUserDetails(user);
	}

}
