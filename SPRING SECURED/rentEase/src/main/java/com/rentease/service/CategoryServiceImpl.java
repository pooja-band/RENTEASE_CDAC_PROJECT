package com.rentease.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rentease.custom_exceptions.InvalidCategoryException;
import com.rentease.custom_exceptions.ResourceNotFoundException;
import com.rentease.dao.CategoryDao;
import com.rentease.dao.UserDao;
import com.rentease.dto.CategoryDTO;
import com.rentease.entities.Categories;
import com.rentease.entities.Category;
import com.rentease.entities.Role;
import com.rentease.entities.Users;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryDao categoryDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private ModelMapper mapper;

	@Override
	public List<CategoryDTO> getAllCategories() {
		return categoryDao
				.findAll().stream().map((Category category) -> new CategoryDTO(category.getId(),
						category.getDescription(), category.getCategoryPhoto(), category.getTypeOfCategory()))
				.collect(Collectors.toList());
	}
	
	
	@Override
	public CategoryDTO getCategoryById(Long id)
	{
		 Category category = categoryDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
		 
		 return mapper.map(category, CategoryDTO.class);
	}

	
	@Override
	public List<String> getCategoryTypes() {
        return Arrays.stream(Categories.values())
                     .map(e -> e.name()) // Lambda expression to convert enum to String
                     .collect(Collectors.toList());
    }


	@Override
	public CategoryDTO findCategoryByName(String categoryName) {
		Categories categoryEnum;
		try {
			categoryEnum = Categories.valueOf(categoryName.toUpperCase());
			System.out.println(categoryEnum);
		} catch (IllegalArgumentException e) {
			throw new InvalidCategoryException("Invalid category: " + categoryName);
		}

		Category category = categoryDao.findByTypeOfCategory(categoryEnum)
				.orElseThrow(() -> new InvalidCategoryException("Category not found: " + categoryName));
		return mapper.map(category, CategoryDTO.class);
	}

	@Override
	public String addCategory(CategoryDTO newCategoryDTO) {
		if (categoryDao.existsByTypeOfCategory(newCategoryDTO.getTypeOfCategory()))
			throw new InvalidCategoryException("Category Already Exists !!!!");

		// Mapping category DTO to category entity
		//Category newCategory = mapper.map(newCategoryDTO, Category.class);
		 Category newCategory = new Category();
		    newCategory.setDescription(newCategoryDTO.getDescription());
		    newCategory.setCategoryPhoto(newCategoryDTO.getCategoryPhoto());
		    newCategory.setTypeOfCategory(newCategoryDTO.getTypeOfCategory());
		    System.out.println(newCategoryDTO.getTypeOfCategory());
		    System.out.println(newCategory.getTypeOfCategory());

		categoryDao.save(newCategory);
		return "Category Added Successfully";
	}

	@Override
	public boolean isAdmin(Long userId) {
		Users user = userDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
		return user.getRole() == Role.ROLE_ADMIN;
	}

	@Override
	public String deleteCategory(Long category_Id) {
		if (!categoryDao.existsById(category_Id))
			throw new InvalidCategoryException("Category does not Exists !!!!");
		
		categoryDao.deleteById(category_Id);
		return "Category deleted successfully";
	}

	@Override
	public CategoryDTO updateCategory(Long userId, CategoryDTO categoryDTO) {
		// check if category exists
		Category category = categoryDao.findById(categoryDTO.getId())
				.orElseThrow(() -> new InvalidCategoryException("Category not Found !!!!"));

		// mapping DTO to fetched category
		mapper.map(categoryDTO, category);

		// save updated category
		categoryDao.save(category);

		return mapper.map(category, CategoryDTO.class);
	}
}
