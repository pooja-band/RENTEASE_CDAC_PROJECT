package com.rentease.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//Lombok annotations to generate getters, setters, no-args constructor, and toString method

@Setter
@Getter
@NoArgsConstructor
@ToString(callSuper = true,exclude ={"cart","product"})
@Entity // Marks this class as a JPA entity
@Table(name = "cart_item")   // Specifies the name of the database table to be used for mapping
public class Cartitem extends BaseEntity{
	
	
	// Many-to-one relationship with the Cart entity
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "cart_id" , nullable = false) // Specifies the foreign key column name and makes it non-nullable
	private Cart cart;  // The cart to which this item belongs
	
	// Many-to-one relationship with the Product entity
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id" , nullable= false)   // Specifies the foreign key column name and makes it non-nullable
	private Product product;  // The product that this cart item refers to
	
	private int quantity; // The quantity of the product in the cart item
	// Additional field for storing extra information
	private String extra1;
	private String extra2;
	
	
	public Cart getCart() {
		return cart;
	}
	public void setCart(Cart cart) {
		this.cart = cart;
	}
	
	public Product getProduct() {
		return product;
	}
	
	public void setProduct(Product product) {
		this.product = product;
	}
	
	
	

}
