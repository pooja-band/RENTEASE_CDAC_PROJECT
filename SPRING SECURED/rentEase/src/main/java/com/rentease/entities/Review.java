package com.rentease.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true,exclude ={"cartItems","product","lessee"})
@Entity
@Table(name="reviews")
public class Review extends BaseEntity {
@Column(name="user_review")
private String review;	


@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "product_id")
private Product product;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "lessee_id")
private Users lessee;




  //by pallavi
// public void setReview(String review) {
// 	this.review = review;
// }



// public void setProduct(Product product) {
// 	this.product = product;
// }



// public void setLessee(Users lessee) {
// 	this.lessee = lessee;
// }
//end pallavi



//public Review() {
//	super();
//}
//public Review(String review) {
//	super();
//	this.review = review;
//}
//public String getReview() {
//	return review;
//}
//public void setReview(String review) {
//	this.review = review;
//}
//
//@Override
//public String toString() {
//	return "review [review=" + review + "]";
//}




	
	
	


}
