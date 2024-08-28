package com.rentease.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CartItemDTO {
    private Long id;
    private ProductDTO product;  
    private int quantity;
    private double totalPrice;  //field for total price
}
