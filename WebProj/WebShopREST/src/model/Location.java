package model;

public class Location {
	private int id;
	private double geographicHeight;
	private double geographicWidth;
	private String street;
	private String streetNumber;
	private String city;
	private String postcode;
	
	public Location() {
	}
	
	@Override
	public String toString() {
		return street + ", " + streetNumber + ", " + city;
	}

	public Location(int id, double geographicHeight, double geographicWidth, String street, String streetNumber, String city,
			String postcode) {
		super();
		this.id = id;
		this.geographicHeight = geographicHeight;
		this.geographicWidth = geographicWidth;
		this.street = street;
		this.streetNumber = streetNumber;
		this.city = city;
		this.postcode = postcode;
	}

	public int getId(){
		return this.id;
	}
	public void setId(int id){
		this.id = id;
	}
	public double getGeographicHeight() {
		return geographicHeight;
	}
	public void setGeographicHeight(double geographicHeight) {
		this.geographicHeight = geographicHeight;
	}
	public double getGeographicWidth() {
		return geographicWidth;
	}
	public void setGeographicWidth(double geographicWidth) {
		this.geographicWidth = geographicWidth;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getStreetNumber() {
		return streetNumber;
	}
	public void setStreetNumber(String streetNumber) {
		this.streetNumber = streetNumber;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getPostcode() {
		return postcode;
	}
	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}
	
	
}
