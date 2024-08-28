package com.rentease.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.apache.catalina.User;
import org.hibernate.cache.spi.support.AbstractReadWriteAccess.Item;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//Lombok annotations to generate getters, setters, no-args constructor, and toString method

@Getter
@Setter
@NoArgsConstructor
//@ToString(callSuper = true,exclude ="cartItems")
@Entity  // Marks this class as a JPA entity
@Table(name="cart")  // Specifies the name of the database table to be used for mapping
public class Cart extends BaseEntity {
	
	
	// One-to-one relationship with the Users entity
	@OneToOne
	@JoinColumn(name = "lessee_id")   // Specifies the foreign key column name
	private Users lessee;  // The user who owns the cart
	
    
	
//   
    
    // One-to-many relationship with the Cartitem entity
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Cartitem> cartItems = new HashSet<>();

	
 // Additional field for storing extra information
	private String extra1;
	private String extra2;
	


	
	
	

		public Set<Cartitem> getCartItems() {
		return cartItems;
	}

	public void setCartItems(Set<Cartitem> cartItems) {
		this.cartItems = cartItems;
	}

	

		public Users getLessee() {
			return lessee;
		}

		public void setLessee(Users lessee) {
			this.lessee = lessee;
		}

		

		
	
//helper mehtods
public void addCartItem(Cartitem cartItem) {
    this.cartItems.add(cartItem);
    cartItem.setCart(this);
}

public void removeCartItem(Cartitem cartItem) {
    this.cartItems.remove(cartItem);
    cartItem.setCart(null);
}
	
	
	
	
	
	

}
