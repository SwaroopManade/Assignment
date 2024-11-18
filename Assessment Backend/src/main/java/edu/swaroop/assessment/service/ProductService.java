package edu.swaroop.assessment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.swaroop.assessment.entity.Product;
import edu.swaroop.assessment.entity.ProductDTO;
import edu.swaroop.assessment.repository.ProductRepository;
import jakarta.transaction.Transactional;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    private static final String URL = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssXXX");

    @Autowired
    public ProductService(ProductRepository productRepository, RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.productRepository = productRepository;
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    /**
     * Fetches data from the remote URL and stores it in the database.
     */
    @Transactional
    public void fetchAndStoreData() throws IOException {
        // Fetch JSON from the URL
        String jsonResponse = restTemplate.getForObject(URL, String.class);

        // Parse the JSON into a list of Product objects
        List<Product> products = objectMapper.readValue(jsonResponse, new TypeReference<List<Product>>() {});

        // Save the products to the database
        productRepository.saveAll(products);
    }

    /**
     * Initializes the database with products fetched from an API endpoint.
     */
    @Transactional
    public void initializeDatabase() {
        ProductDTO[] productDTOs = restTemplate.getForObject(URL, ProductDTO[].class);

        if (productDTOs == null || productDTOs.length == 0) {
            throw new RuntimeException("No products found from API.");
        }

        List<Product> products = Arrays.stream(productDTOs)
                .map(this::mapToProduct)
                .toList();

        productRepository.saveAll(products);
    }

    /**
     * Mapping a ProductDTO to a Product entity.
     */
    private Product mapToProduct(ProductDTO dto) {
        Product product = new Product();
        product.setTitle(dto.getTitle());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setSold(dto.getSold());
        product.setCategory(dto.getCategory());
        product.setProductImage(dto.getImage());

        // Parse dateOfSale with error handling
        try {
            product.setDateOfSale(LocalDate.parse(dto.getDateOfSale(), formatter));
        } catch (Exception e) {
            product.setDateOfSale(null);
        }

        return product;
    }

    /**
     * Retrieves products for a given month.
     */
    public List<Product> getProductsByMonth(int month) {
        return productRepository.findByMonth(month);
    }

    /**
     * Retrieves all products with pagination.
     */
    public Page<Product> getAllProducts(PageRequest pageRequest) {
        return productRepository.findAll(pageRequest);
    }
}
