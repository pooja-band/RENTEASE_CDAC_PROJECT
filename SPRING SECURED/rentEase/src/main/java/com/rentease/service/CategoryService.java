package com.rentease.service;

import java.util.List;

import com.rentease.dto.CategoryDTO;

public interface CategoryService {
	CategoryDTO findCategoryByName(String categoryName);

	// Fetch all categories
	public List<CategoryDTO> getAllCategories();

	// Get Types of Category
	public List<String> getCategoryTypes();

	public CategoryDTO getCategoryById(Long id);

	// adding a new category
	public String addCategory(CategoryDTO newCategoryDTO);

	// to check if the role of user is ADMIN
	public boolean isAdmin(Long userId);

	public String deleteCategory(Long category_Id);

	public CategoryDTO updateCategory(Long userId, CategoryDTO categoryDTO);
}
