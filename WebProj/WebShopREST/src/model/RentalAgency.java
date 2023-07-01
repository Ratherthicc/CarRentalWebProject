package model;

import java.net.URI;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;


public class RentalAgency {
	private int id;
	private String name;
	private LocalTime openingTime;
	private LocalTime closingTime;
	private AgencyState state;
	private URI logoURI;
	private int rating;
	private Location location;
	private List<Vehicle> vehicles;
	
	public void setVehicles(List<Vehicle> vehicles) {
		this.vehicles = vehicles;
	}

	public enum AgencyState{
		WORKING,
		NOT_WORKING
	}
	
	public RentalAgency() {
	}

	public RentalAgency(int id, String name, LocalTime openingTime, LocalTime closingTime, AgencyState state,
			URI logoURI, int rating, int locationId) {
		super();
		location = new Location();
		this.id = id;
		this.name = name;
		this.openingTime = openingTime;
		this.closingTime = closingTime;
		this.state = state;
		this.logoURI = logoURI;
		this.rating = rating;
		this.location.setId(locationId);
		this.vehicles=new ArrayList<Vehicle>();
	}

	public List<Vehicle> getVehicles() {
		return vehicles;
	}

	public void addVehicles(Vehicle vehicle) {
		this.vehicles.add(vehicle);
	}

	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalTime getOpeningTime() {
		return openingTime;
	}

	public void setOpeningTime(LocalTime openingTime) {
		this.openingTime = openingTime;
	}

	public LocalTime getClosingTime() {
		return closingTime;
	}

	public void setClosingTime(LocalTime closingTime) {
		this.closingTime = closingTime;
	}

	public AgencyState getState() {
		return state;
	}

	public void setState(AgencyState state) {
		this.state = state;
	}

	public URI getLogoURI() {
		return logoURI;
	}

	public void setLogoURI(URI logoURI) {
		this.logoURI = logoURI;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}
	
	
}
