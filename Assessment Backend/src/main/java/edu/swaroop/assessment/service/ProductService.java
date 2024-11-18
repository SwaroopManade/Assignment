package edu.swaroop.assessment.service;

import edu.swaroop.assessment.entity.Product;
import edu.swaroop.assessment.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
    private String URL;

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
        Product[] products = restTemplate.getForObject(URL, Product[].class);

        if (products != null) {
            for (Product product : products) {
                productRepository.save(product);
            }
        }
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
