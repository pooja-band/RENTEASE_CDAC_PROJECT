package com.rentease.custom_exceptions;

public class ResourceNotFoundException extends RuntimeException {
public ResourceNotFoundException(String mesg) {
	super(mesg);
}
}
