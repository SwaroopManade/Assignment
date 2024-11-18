package edu.swaroop.assessment.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
@Table(name = "product")
public class Product {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    @Column(nullable=false)
	    private String title;
	    @Column(name  = "description", length = 2000 ,nullable = false)  // Increase the length here
	    private String description;
	    @Column(nullable=false)
	    private String category;
	    @Column(nullable=false)
	    private Double price;
	    @Column(nullable=false)
	    private Boolean sold;
	    @Column(nullable=false)
	    private String image;
	   
	    @Column(name = "date_of_sale" , nullable = false)
	    private OffsetDateTime dateOfSale;
	   
	    public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public String getCategory() {
			return category;
		}

		public void setCategory(String category) {
			this.category = category;
		}

		public Boolean getSold() {
			return sold;
		}

		public void setSold(Boolean sold) {
			this.sold = sold;
		}

		public String getImage() {
			return image;
		}

		public void setImage(String image) {
			this.image = image;
		}

		// Getters and setters
	    public Long getId() {
	        return id;
	    }

	    public void setId(Long id) {
	        this.id = id;
	    }


	    public Double getPrice() {
	        return price;
	    }

	    public void setPrice(Double price) {
	        this.price = price;
	    }

	    public OffsetDateTime getDateOfSale() {
	        return dateOfSale;
	    }

	    public void setDateOfSale(OffsetDateTime dateOfSale) {
	        this.dateOfSale = dateOfSale;
	    }
}
