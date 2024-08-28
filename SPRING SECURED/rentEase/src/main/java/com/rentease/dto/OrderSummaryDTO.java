package com.rentease.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter

public class OrderSummaryDTO {
	
	private double totalAmount;
	private List<ProductDTO>products;
	

	

}