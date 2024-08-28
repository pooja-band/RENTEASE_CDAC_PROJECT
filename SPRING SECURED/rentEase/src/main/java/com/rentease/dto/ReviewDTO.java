package com.rentease.dto;

public class ReviewDTO {
	
	private Long lesseeId;
	private Long productId;
	private String review;
	
	
	public Long getLesseeId() {
		return lesseeId;
	}
	public void setLesseeId(Long lesseeId) {
		this.lesseeId = lesseeId;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public String getReview() {
		return review;
	}
	public void setReview(String review) {
		this.review = review;
	}
	
	
	
	

}
