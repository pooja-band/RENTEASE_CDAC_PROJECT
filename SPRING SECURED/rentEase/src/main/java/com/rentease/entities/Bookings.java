package com.rentease.entities;

import java.sql.Date;
import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter // this is a lombok annotation to provide setters for 'Bookings' class
@Getter // this is a lombok annotation to provide getters for 'Bookings' class
@NoArgsConstructor // this is a lombok annotation to provide parameterless constructor for 'Bookings' class
@ToString(callSuper = true,exclude = {"lessee","product"}) // this is a lombok annotation for toString method for 'Bookings' class, it calls toString method of its superClass 
@Entity  //this annotation is used to create table for 'Bookings' class
@Table(name="bookings") // this annotation is used to name the table in database as 'bookings'
public class Bookings extends BaseEntity {

	
	@Column(name="start_date") // this annotation is used to name the column of table as 'start_date'
	private Date startDate;
	
	@Column(name="end_date")
	private Date endDate;
	
	@Column(name="total_price")
	private double totalPrice;
	
//	@Column(name="booking_status") //Not needed here, needed in Product class only
//	@Enumerated(EnumType.STRING)
//	private BookingStatus status;
	
	private String extra1;
	private String extra2;
	

	
	   @ManyToOne(fetch = FetchType.EAGER) // this annotation is used to establish a relation between bookings and lessie (There can be multiple bookings of a lessie)
	    @JoinColumn(name = "lessee_id")
	    private Users lessee;

	    @ManyToOne(fetch = FetchType.EAGER) // this annotation is used to establish a relation between bookings and product (There can be multiple bookings of a product)
	    @JoinColumn(name = "product_id")
	    private Product product;

//		public Date getEndDate() {
//			return endDate;
//		}



		

}
