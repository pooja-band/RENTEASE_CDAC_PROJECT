package com.rentease.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDateTime;
import java.util.List;

import com.rentease.entities.BookingStatus;
import com.rentease.entities.Product;
import com.rentease.entities.Users;

@Getter
@Setter
@NoArgsConstructor
public class BookingDTO {
	  private Long id;
	   
	 
	 
	    private Date startDate;
	    private Date endDate;
	   
}
