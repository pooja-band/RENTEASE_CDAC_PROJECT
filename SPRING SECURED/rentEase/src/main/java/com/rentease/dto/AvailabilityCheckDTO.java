package com.rentease.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AvailabilityCheckDTO {
    private Long productId;
    private Date startDate;
    private Date endDate;
    private String city;
    
    // Getters and Setters
}
