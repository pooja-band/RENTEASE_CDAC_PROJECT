package com.rentease.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rentease.entities.Categories;
import com.rentease.entities.Category;
import java.util.Optional;

public interface CategoryDao extends JpaRepository<Category, Long> {
	 Optional<Category> findByTypeOfCategory(Categories typeOfCategory);
	 
	//to check if the category exists
	 boolean existsByTypeOfCategory(Categories typeOfCategory);
	 
	 void deleteById(Long category_Id);
}