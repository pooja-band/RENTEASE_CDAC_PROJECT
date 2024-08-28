package com.rentease.dao;


import java.util.List;
import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;

import com.rentease.entities.Role;
import com.rentease.entities.Users;



public interface UserDao extends JpaRepository<Users, Long> {

	Optional<Users> findByEmail(String email);
	Optional<Users> findByEmailAndPassword(String email,String pass);
	boolean existsByEmail(String email);

	Optional<Users> findById(Long id);

	
	Optional<Users> findByIdAndRole(Long userId, Role role);

//	  Optional<Users> findByIdAndRoleAndDeleteStat(Long id, Role role, int deleteStatus);
}
