package com.rentease.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rentease.dto.AddProductDTO;
import com.rentease.dto.CartItemDTO;
import com.rentease.entities.Cart;
import com.rentease.service.CartService;



@RestController
@RequestMapping("/carts")


public class CartController {
	
	@Autowired
	private CartService cartService;
	
  

    @GetMapping("/lessee/{cartId}/total-price")
    public double getTotalCartPrice(@PathVariable Long cartId) {
        return cartService.calculateTotalCartPrice(cartId);
    }

    @GetMapping("/lessee/{cartId}/total-security-deposit")
    public double getTotalSecurityDeposit(@PathVariable Long cartId) {
        return cartService.calculateTotalSecurityDeposit(cartId);
    }
	
	//API ADD PRODUCT IN CART FOR LESSEE --PALAVI/ABHINAV SCRUM 36
	 @PostMapping("/lessee/addProduct")
	    public ResponseEntity<String> addProductToCart(@RequestParam Long lesseeId, @RequestBody AddProductDTO dto) {
	        cartService.addProductToCart(lesseeId, dto);
	        return ResponseEntity.ok("Product added to cart successfully");
	    }
	//API DISPLAY ALL CART ITEMS --HONEY/SWAPNIL SCRUM 35
		 @GetMapping("/lessee/{cartId}/items")
		    public ResponseEntity<Map<String, Object>> getAllCartItems(@PathVariable Long cartId) {
		        List<CartItemDTO> cartItems = cartService.getAllCartItems(cartId);
		        double totalCartPrice = cartService.calculateTotalCartPrice(cartId);

		        Map<String, Object> response = new HashMap<>();
		        response.put("cartItems", cartItems);
		        response.put("totalCartPrice", totalCartPrice);

		        return ResponseEntity.ok(response);
		    }

	
	//API TO FETCH CART ID FROM GIVEN LESSEE ID--ABHINAV

		    @GetMapping("/lessee-cart/{lesseeId}")
		    public ResponseEntity<Long> getCartIdByLesseeId(@PathVariable Long lesseeId) {
		        Long cartId = cartService.getCartIdByLesseeId(lesseeId);
		        if (cartId == null) {
		            return ResponseEntity.notFound().build();
		        }
		        return ResponseEntity.ok(cartId);
		    }
		    
		    
		    //API TO REMOVE PRODUCT FROM CART -- ABHINAV
		    @DeleteMapping("/lessee/removeProduct")
		    public ResponseEntity<?> removeProductFromCart(
		        @RequestParam Long lesseeId, 
		        @RequestParam Long productId) {
		        try {
		            cartService.removeProductFromCart(lesseeId, productId);
		            return ResponseEntity.ok("Product removed from cart successfully");
		        } catch (RuntimeException e) {
		            return ResponseEntity.badRequest().body(e.getMessage());
		        }
		    }

}
