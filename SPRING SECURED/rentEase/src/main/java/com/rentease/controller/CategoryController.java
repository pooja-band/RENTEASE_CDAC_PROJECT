package com.rentease.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;

import com.rentease.dto.CategoryDTO;
import com.rentease.entities.Category;
import com.rentease.service.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {

	public CategoryController() {
		System.out.println("in constructor of " + getClass());
	}

	@Autowired
	private CategoryService categoryService;

	// API FOR FETCHING ALL CATEGORY DETAILS-- SWAPNIL
	@GetMapping("/all")
	public ResponseEntity<List<CategoryDTO>> getAllCategories() {
		return ResponseEntity.ok(categoryService.getAllCategories());
	}

	// API FOR FETCHING SINGLE CATEGORY DETAILS-- SWAPNIL
	@GetMapping("/{id}")
	public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long id) {
		CategoryDTO categoryDTO = categoryService.getCategoryById(id);

		return ResponseEntity.ok(categoryDTO);
	}

	// API FOR FETCHING CATEGORY TYPES DETAILS-- SWAPNIL
	@GetMapping("/types")
	public ResponseEntity<List<String>> getCategoryTypes() {
		List<String> categoryTypes = categoryService.getCategoryTypes();
		return ResponseEntity.ok(categoryTypes);
	}

	// API FOR ADDING CATEGORY DETAILS-- SWAPNIL SCRUM 41
	@PostMapping("/admin/add/{userId}")
	public ResponseEntity<?> addNewCategory(@RequestBody CategoryDTO newCategoryDTO, @PathVariable Long userId) {
		// check if user is an ADMIN
		System.out.println("in category controller "+newCategoryDTO.getTypeOfCategory());

		if (categoryService.isAdmin(userId))
			return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.addCategory(newCategoryDTO));

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
	}

	// API FOR UPDATING CATEGORY DETAILS-- SWAPNIL SCRUM 42
	@PutMapping("/admin/update/{userId}")
	public ResponseEntity<?> updateCategory(@RequestBody CategoryDTO categoryDTO, @PathVariable Long userId) {
		if (categoryService.isAdmin(userId)) {
			CategoryDTO updatedCategory = categoryService.updateCategory(userId, categoryDTO);
			
			return ResponseEntity.status(HttpStatus.OK).body(updatedCategory);
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
	}

	// API FOR DELETING CATEGORY DETAILS-- SWAPNIL SCRUM 43
	@DeleteMapping("/admin/delete/{userId}/{categoryId}")
	public ResponseEntity<?> deleteCategory(@PathVariable Long userId, @PathVariable Long categoryId) {
		// check if user is an ADMIN
		if (categoryService.isAdmin(userId))
			return ResponseEntity.ok(categoryService.deleteCategory(categoryId));

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
	}

}
