package com.rentease.custom_exceptions;


public class NoBookingHistoryFoundException extends RuntimeException {
    public NoBookingHistoryFoundException(String message) {
        super(message);
    }
}