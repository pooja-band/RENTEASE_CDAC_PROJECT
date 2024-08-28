package com.rentease.dto;

import com.rentease.entities.Categories;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    private Long id;
    private String description;
    private String categoryPhoto;
    private Categories typeOfCategory;
}
