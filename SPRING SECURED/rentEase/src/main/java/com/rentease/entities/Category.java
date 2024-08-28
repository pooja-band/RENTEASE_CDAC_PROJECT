package com.rentease.entities;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter // this is a lombok annotation to provide setters for 'Category' class
@Getter // this is a lombok annotation to provide getters for 'Category' class
@NoArgsConstructor // this is a lombok annotation to provide parameterless constructor for 'Category' class
@ToString(callSuper = true,exclude ="products") //this is a lombok annotation to provide toString method for 'Category' class, it calls toString method of its superClass 
@Entity //this annotation is used to create table for 'Category' class
@Table(name="categories") // this annotation is used to name the table in database as 'categories'
public class Category extends BaseEntity{


@Column(name="category_description") // this annotation is used to name the column of table as 'category_description'
private String description;

@Column(name="category_photoURL")


private String categoryPhoto; //this field is used to show image for a category

@Column(name="category_type", length = 20, unique =true)
@Enumerated(EnumType.STRING) // this annotation uses an enum to tell the type of the category 
private Categories typeOfCategory;



@OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true) // this annotation is used to establish a relation between category and product (Single category can have multiple products)
private Set<Product> products = new HashSet<>(); // this field is to store set of products belonging to a single category



}
