package com.rentease.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import com.rentease.entities.Users;

public class CustomUserDetails implements UserDetails {
	private Users user;

	public CustomUserDetails(Users user) {
		super();
		this.user = user;
	}
	
	public Users getUser() {
        return user;
    }

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// ret list of granted authorities
		// GrantedAuthority : i/f -<--- SimpleGrantedAuthority(String role)
		return List.of(new SimpleGrantedAuthority
				(user.getRole().name()));
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return user.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
