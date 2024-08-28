package com.rentease.custom_exceptions;

//BookingException.java
public class BookingException extends RuntimeException {
 public BookingException(String message) {
     super(message);
 }
}