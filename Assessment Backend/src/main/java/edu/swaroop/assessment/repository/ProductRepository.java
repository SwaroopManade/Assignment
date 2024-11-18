package edu.swaroop.assessment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import edu.swaroop.assessment.entity.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    
    @Query("SELECT p FROM Product p WHERE EXTRACT(MONTH FROM p.dateOfSale) = ?1")
    List<Product> findByMonth(int month);
}
