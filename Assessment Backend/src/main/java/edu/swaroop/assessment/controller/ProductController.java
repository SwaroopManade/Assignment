package edu.swaroop.assessment.controller;

import edu.swaroop.assessment.entity.Product;
import edu.swaroop.assessment.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

import java.util.*;
import java.util.stream.Collectors;

@RestController
//@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/initialize-db")
    public String initializeDatabase() {
        productService.initializeDatabase();
        return "Database initialized with sales data";
    }

    @GetMapping("/transactions")
    public ResponseEntity<Map<String, Object>> listTransactions(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int perPage
    ) {
        try {
            Page<Product> productPage = productService.getAllProducts(PageRequest.of(page - 1, perPage, Sort.by("id")));
            List<Product> products = productPage.getContent();

            // Filter by search term if provided
            if (search != null && !search.isEmpty()) {
                products = filterProducts(products, search);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("transactions", products);
            response.put("total", productPage.getTotalElements());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Error retrieving transactions: " + e.getMessage()));
        }
    }

    private List<Product> filterProducts(List<Product> products, String search) {
        return products.stream()
                .filter(product -> containsSearchTerm(product, search))
                .collect(Collectors.toList());
    }

    private boolean containsSearchTerm(Product product, String search) {
        return product.getTitle().contains(search) ||
                product.getDescription().contains(search) ||
                product.getPrice().toString().contains(search);
    }

    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getStatistics(@RequestParam int month) {
        try {
            List<Product> products = productService.getProductsByMonth(month);

            double totalSales = products.stream()
                    .filter(Product::getSold)
                    .mapToDouble(Product::getPrice)
                    .sum();

            long soldItems = products.stream().filter(Product::getSold).count();
            long unsoldItems = products.stream().filter(p -> !p.getSold()).count();

            Map<String, Object> response = new HashMap<>();
            response.put("totalSales", totalSales);
            response.put("soldItems", soldItems);
            response.put("unsoldItems", unsoldItems);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Error retrieving statistics: " + e.getMessage()));
        }
    }

    @GetMapping("/bar-chart")
    public ResponseEntity<Map<String, Integer>> getBarChart(@RequestParam int month) {
        try {
            List<Product> products = productService.getProductsByMonth(month);
            return ResponseEntity.ok(categorizeByPriceRange(products));
        } catch (Exception e) {
            return null;
//            ResponseEntity.status(500).body(Map.of("error", "Error generating bar chart: " + e.getMessage()));
        }
    }

    private Map<String, Integer> categorizeByPriceRange(List<Product> products) {
        Map<String, Integer> ranges = new LinkedHashMap<>();
        Arrays.asList("0-100", "101-200", "201-300", "301-400", "401-500", "501-600", "601-700", "701-800", "801-900", "901-above")
                .forEach(range -> ranges.put(range, 0));

        for (Product product : products) {
            double price = product.getPrice();
            String range = getPriceRange(price);
            ranges.put(range, ranges.get(range) + 1);
        }
        return ranges;
    }

    private String getPriceRange(double price) {
        if (price <= 100) return "0-100";
        else if (price <= 200) return "101-200";
        else if (price <= 300) return "201-300";
        else if (price <= 400) return "301-400";
        else if (price <= 500) return "401-500";
        else if (price <= 600) return "501-600";
        else if (price <= 700) return "601-700";
        else if (price <= 800) return "701-800";
        else if (price <= 900) return "801-900";
        else return "901-above";
    }

    @GetMapping("/pie-chart")
    public ResponseEntity<Map<String, Integer>> getPieChart(@RequestParam int month) {
        try {
            List<Product> products = productService.getProductsByMonth(month);
            return ResponseEntity.ok(categorizeByCategory(products));
        } catch (Exception e) {
            return null;
//            ResponseEntity.status(500).body(Map.of("error", "Error generating pie chart: " + e.getMessage()));
        }
    }

    private Map<String, Integer> categorizeByCategory(List<Product> products) {
        return products.stream()
                .collect(Collectors.groupingBy(Product::getCategory, Collectors.summingInt(e -> 1)));
    }

    @GetMapping("/combined")
    public ResponseEntity<Map<String, Object>> getCombined(@RequestParam int month) {
        try {
            Map<String, Object> response = new HashMap<>();
            response.put("statistics", getStatistics(month).getBody());
            response.put("barChart", getBarChart(month).getBody());
            response.put("pieChart", getPieChart(month).getBody());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Error generating combined report: " + e.getMessage()));
        }
    }
}
