package com.rentease.dto;

import java.time.LocalDate;

import com.rentease.entities.BookingStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductCreationDTO {
    private String name;
    private String description;
    private String brandName;
    private String modelName;
    private BookingStatus productState;
    private LocalDate mfgDate;
    private String componentsIncluded;
    private double productPrice;
    private double securityDeposit;
    private String availableCity;
    private String productImage;
    private Long categoryId;
}
