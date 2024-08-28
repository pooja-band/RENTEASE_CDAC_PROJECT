package com.rentease.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rentease.custom_exceptions.ResourceNotFoundException;
import com.rentease.dao.CartDao;
import com.rentease.dao.CartItemDao;
import com.rentease.dao.ProductDao;
import com.rentease.dao.UserDao;
import com.rentease.dto.AddProductDTO;
import com.rentease.dto.CartItemDTO;
import com.rentease.entities.Cart;
import com.rentease.entities.Cartitem;
import com.rentease.entities.Product;
import com.rentease.entities.Users;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;



@Service
@Transactional
public class CartServiceImpl implements CartService {
	
	
	
	@Autowired
	private CartDao cartDao;
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private CartItemDao cartItemDao;

	@Override
	public void addProductToCart(Long lesseeId, AddProductDTO dto) {
		 Users lessee = userDao.findById(lesseeId)
		            .orElseThrow(() -> new ResourceNotFoundException("Lessee not found"));

		        Cart cart = lessee.getCart();
		        if (cart == null) {
		            cart = new Cart();
		            cart.setLessee(lessee);
		            lessee.setCart(cart);
		        }

		        Product product = productDao.findById(dto.getProductId())
		            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

		        Cartitem cartItem = cart.getCartItems().stream()
		            .filter(item -> item.getProduct().getId().equals(dto.getProductId()))
		            .findFirst()
		            .orElse(new Cartitem());

		        cartItem.setCart(cart);
		        cartItem.setProduct(product);
		        cartItem.setQuantity(cartItem.getQuantity() + dto.getQuantity());

		        cart.getCartItems().add(cartItem);

		        cartDao.save(cart);
		
	}

	@Override
	public List<CartItemDTO> getAllCartItems(Long cartId) {
		Cart cart = cartDao.findById(cartId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart not found with id: " + cartId));

		List<CartItemDTO> cartItemDTOs = new ArrayList<>();

		for (Cartitem cartItem : cart.getCartItems()) {
			CartItemDTO dto = mapper.map(cartItem, CartItemDTO.class);
			dto.setTotalPrice(cartItem.getQuantity() * cartItem.getProduct().getProductPrice()); // Assuming Product has a
																							// price field
			cartItemDTOs.add(dto);
		}

		return cartItemDTOs;
	}

	@Override
	public double calculateTotalCartPrice(Long cartId) {
		Cart cart = cartDao.findById(cartId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart not found with id: " + cartId));

		double totalCartPrice = 0.0;

		for (Cartitem cartItem : cart.getCartItems()) {
			totalCartPrice += cartItem.getQuantity() * cartItem.getProduct().getProductPrice();
		}

		return totalCartPrice;
	}

	 @Override
	    public Long getCartIdByLesseeId(Long lesseeId) {
	        return cartDao.findCartIdByLesseeId(lesseeId);
	    }

	 	@Override
	 public void removeProductFromCart(Long lesseeId, Long productId) {
	        Cart cart = cartDao.findByLesseeId(lesseeId)
	            .orElseThrow(() -> new RuntimeException("Cart not found for the lessee."));

	        Cartitem cartItem = cart.getCartItems().stream()
	            .filter(item -> item.getProduct().getId().equals(productId))
	            .findFirst()
	            .orElseThrow(() -> new RuntimeException("Product not found in the cart."));

	        cart.removeCartItem(cartItem);
	        cartItemDao.delete(cartItem);  // Optionally remove the item from the cartitem repository

	        cartDao.save(cart); // Persist changes to the database
	    }
	 	
	 	
	 	@Override
	    public double calculateTotalSecurityDeposit(Long cartId) {
	        Cart cart = cartDao.findById(cartId)
	                .orElseThrow(() -> new ResourceNotFoundException("Cart not found with id: " + cartId));

	        double totalSecurityDeposit = 0.0;

	        for (Cartitem cartItem : cart.getCartItems()) {
	            totalSecurityDeposit += cartItem.getQuantity() * cartItem.getProduct().getSecurityDeposit();
	        }

	        return totalSecurityDeposit;
	    }


}
