package com.rentease.entities;



import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Setter // this is a lombok annotation to provide setters for 'Product' class
@Getter // this is a lombok annotation to provide getters for 'Product' class
@NoArgsConstructor // this is a lombok annotation to provide parameterless constructor for 'Product' class
@ToString(callSuper = true,exclude ={"category","productPhoto","productImage"})//this is a lombok annotation to provide toString method for 'Product' class, it calls toString method of its superClass 
// It will exclude category, product photo and product image
@Entity	//this annotation is used to create table for 'Product' class 
@Table(name="products") // this annotation is used to name the table in database as 'products'


public class Product extends BaseEntity{
@Column(name="product_name", length = 25)  // this annotation is used to name the column of table as 'product_name'
private String name;
@Column(name="product_description")
private String description;
@Column(name="product_brand",length =40)
private String brandName;
@Column(name="product_model", length =40)
private String modelName;


@Column(name="product_availability")
@Enumerated(EnumType.STRING)
private BookingStatus productState;


@Column(name="product_mfg_date")
@DateTimeFormat(pattern = "yyyy-MM-dd")
private LocalDate mfgDate;

@Column(name="components_included")
private String componentsIncluded; // this field specifies the components which are included with the product



@Column(name="product_price")
private double productPrice;

@Column(name="security_deposit")
private double securityDeposit; // this field gives the amount to be paid for the product as a security deposit before taking it for rent

@Column(name="available_city")
private String availableCity; // this field is to show the cities in which the product is available for rent

@Lob
@Column(name="product_photo")
private byte[] productPhoto; // this field is used to show the product photo

@Column(name="product_imageURL")
private String productImage; // this field is used to show the product photo

@ManyToOne(fetch = FetchType.LAZY)  // this annotation is used to establish a relation between product and category (Many products can have a single category)
@JoinColumn
private Category category; 

@ManyToOne(fetch = FetchType.LAZY) // this annotation is used to establish a relation between product and lessor (A lessor can have multiple products)
@JoinColumn(name = "lessor_id")
private Users lessor;

// by pallavi
// @ManyToOne
// @JoinColumn(name = "review_id")
// private Review review;



@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER) // this annotation is used to establish a relation between product and review (One product can have a multiple reviews)
private Set<Review> reviews=new HashSet<>();




public void addPReviews(Review reviews) {
	//add reviews ref to the set
	this.reviews.add(reviews);
	//assign product ref to the reviews
	reviews.setProduct(this);
	
}
// add helper method to un -establish(de link) a bi dir association between Category 1<--->*
	
	public void removePReviews(Review reviews) {
		
		this.reviews.remove(reviews);
	
		reviews.setProduct(null);
		
	}






}
