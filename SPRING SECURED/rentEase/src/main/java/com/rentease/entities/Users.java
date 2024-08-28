package com.rentease.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.bind.DefaultValue;

import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
//@ToString(callSuper = true,exclude ={"carts","products","reviews","bookings"})
@Entity
@Table(name="users")
public class Users extends BaseEntity {
	@Column(name ="first_name", length = 25) // col name , varchar(25)
	private String firstName;
	@Column(name="last_name", length = 25) // col name , varchar(25)
	private String lastName;
	@Column(length = 20, unique = true ,nullable =false) // varchar(20), unique constraint
	private String email;
	@Column(nullable = false) // NOT NULL
	private String password;
	
	private LocalDate dob;
	
	@Column(name ="photo_id",length = 20, unique = true) 
	private String photoId;
	
	@Column(name ="phone_no",length = 20, unique = true,nullable = false) 
	private String phoneNo;
	
	@Column(nullable=false) 
	private String address;
	
	@Column(length = 25,nullable=false) 
	private String city;
	
	@Column(length = 25,nullable=false) 
	private String state;
	
	@Column(length = 25,nullable=false) 
	private String country;
	
	@Column(name="postal_code",nullable=false) 
	private int postalCode;
	
	@Enumerated(EnumType.STRING) 
	@Column(length = 20)
	private Role role;
	
	@Value("0")
	@Column(name="is_deleted",length=1)
	private  int deleteStat;
	
	
	private String extra1;
	private String extra2;
	

//	@OneToMany(mappedBy = "user", 
//			cascade = CascadeType.ALL, orphanRemoval = true)
//	private List<Bookings> bookings= new ArrayList<>(); 
	


   
	@OneToOne(mappedBy = "lessee", cascade = CascadeType.ALL)
    private Cart cart;


	    @OneToMany(mappedBy = "lessor", cascade = CascadeType.ALL, orphanRemoval = true)
	    private Set<Product> products = new HashSet<>();

	    @OneToMany(mappedBy = "lessee", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
	    private Set<Review> reviews = new HashSet<>();

	    @OneToMany(mappedBy = "lessee", cascade = CascadeType.ALL, orphanRemoval = true)
	    private Set<Bookings> bookings = new HashSet<>();

		public void addReviews(Review reviews) {
			//add reviews ref to the set
			this.reviews.add(reviews);
			//assign lessee ref to the reviews
			reviews.setLessee(this);
			
		}
		// add helper method to un -establish(de link) a bi dir association between Category 1<--->*
			// BlogPost
			public void removeReviews(Review reviews) {
				
				this.reviews.remove(reviews);
			
				reviews.setLessee(null);
				
			}
//		public String getFirstName() {
//			return firstName;
//		}
//
//		
//
//		public String getLastName() {
//			return lastName;
//		}
//
//
//		public String getEmail() {
//			return email;
//		}
//
//		
//		
//
//		public String getPhoneNo() {
//			return phoneNo;
//		}
//
//		
//
//		public String getAddress() {
//			return address;
//		}



		



		

		

		

		

		
	    
}
