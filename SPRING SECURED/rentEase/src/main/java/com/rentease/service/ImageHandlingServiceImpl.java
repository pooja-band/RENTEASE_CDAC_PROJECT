package com.rentease.service;

import static org.apache.commons.io.FileUtils.readFileToByteArray;
import static org.apache.commons.io.FileUtils.writeByteArrayToFile;

import java.io.File;
import java.io.IOException;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.rentease.custom_exceptions.ApiException;
import com.rentease.custom_exceptions.ResourceNotFoundException;
import com.rentease.dao.ProductDao;
import com.rentease.dao.UserDao;
import com.rentease.dto.ApiResponse;
import com.rentease.entities.Product;
import com.rentease.entities.Users;


@Service
@Transactional
public class ImageHandlingServiceImpl implements ImageHandlingService {
	// injecting value of the field read from applicatoin.properties file
	@Value("${file.upload.location}") // field level DI , <property name n value />
	// ${file.upload.location} SpEL :Spring expr language
	private String uploadFolder;

	@Autowired
	private ProductDao productDao;

	@PostConstruct
	public void init() throws IOException {
		// chk if folder exists --yes --continue
		File folder = new File(uploadFolder);
		if (folder.exists()) {
			System.out.println("folder exists alrdy !");
		} else {
			// no --create a folder
			folder.mkdir();
			System.out.println("created a folder !");
		}
	}

	@Override
	public ApiResponse uploadImage(Long userId, MultipartFile image) throws IOException {
		// get emp from emp id
		Product prod = productDao.
				findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid emp ID!!!!"));
		// emp found --> PERSISTENT
		// store the image on server side folder
		String path = uploadFolder.concat(image.getOriginalFilename());
		System.out.println(path);
		// Use FileUtils method : writeByte[] --> File
		writeByteArrayToFile(new File(path), image.getBytes());
		// set image path in DB (emps table)
		prod.setProductImage(path);
		// OR to store the img directly in DB as a BLOB
		// emp.setImage(image.getBytes());
		return new ApiResponse("Image file uploaded successfully for product id " + userId);
	}

//	@Override
//	public void uploadImage(Employee emp, MultipartFile image) throws IOException {
//		// store the image on server side folder
//		String path = uploadFolder.concat(image.getOriginalFilename());
//		System.out.println(path);
//		// Use FileUtils method : writeByte[] --> File
//		writeByteArrayToFile(new File(path), image.getBytes());
//		// set image path
//		emp.setImagePath(path);
//		// OR to store the img directly in DB as a BLOB
//		// emp.setImage(image.getBytes());
//		System.out.println("Image file uploaded successfully for emp " + emp.getFirstName());
//	}
//
	 // Assuming a constant path to the default image
    private static final String DEFAULT_IMAGE_PATH = "C:\\Users\\Swapnil\\Desktop\\Final_Project\\rentEase\\RenteaseWithSpringSecurtiy\\SPRING SECURED\\rentEase\\images\\sample.jpg";

    @Override
    public byte[] serveImage(Long prodId) throws IOException {
        // Get the product from the product ID
        Product prod = productDao
                .findById(prodId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid product ID!"));

        // Get the image path from the product
        String path = prod.getProductImage();

        File imageFile;
        if (path != null && (imageFile = new File(path)).exists()) {
            // Path exists --> File --> byte[]
            return FileUtils.readFileToByteArray(imageFile);
        } else {
            // Use default image
            File defaultImage = new File(DEFAULT_IMAGE_PATH);
            if (defaultImage.exists()) {
                return FileUtils.readFileToByteArray(defaultImage);
            } else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Default image not found");
            }
        }
    }
//	@Override
//	public byte[] serveImage(Long prodId) throws IOException {
//		// get emp from emp id
//				Product prod = productDao.
//						findById(prodId).orElseThrow(() -> new ResourceNotFoundException("Invalid emp ID!!!!"));
//		// emp found --> PERSISTENT
//		String path =prod.getProductImage();
//		if (path != null) {
//			// path ---> File --> byte[]
//			return readFileToByteArray(new File(path));
//			// OR from DB : return emp.getImage();
//		} else
//			throw new ApiException("Image not yet assigned !!!!");
//
//	}

}
