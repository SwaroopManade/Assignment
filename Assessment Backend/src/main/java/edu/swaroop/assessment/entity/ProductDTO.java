package edu.swaroop.assessment.entity;

public class ProductDTO {
    private String title;
    private String description;
    private Double price;
    private Boolean sold;
    private String category;
    private String dateOfSale; // Date as String in ISO 8601
    private String image;
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
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public Boolean getSold() {
		return sold;
	}
	public void setSold(Boolean sold) {
		this.sold = sold;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getDateOfSale() {
		return dateOfSale;
	}
	public void setDateOfSale(String dateOfSale) {
		this.dateOfSale = dateOfSale;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}

    

}
