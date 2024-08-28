package com.rentease.dto;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;

import com.rentease.entities.BookingStatus;
import com.rentease.entities.Category;
import com.rentease.entities.Review;
import com.rentease.entities.Role;
import com.rentease.entities.Users;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class ProductDTO extends BaseDTO {
	private String name;
	private String description;
	private double productPrice; 
	private byte[] productPhoto; // this field is used to show the product photo
	private String productImage; // this field is used to show the product photo

	
}
