package model;

import java.net.URI;

public class Vehicle {
	private int id;
	private String brand;
	private String model;
	private double price;
	private VehicleType vehicle_type;
	
	private RentalAgency object; 
	
	private TransmissionType transmission_type;
	private FuelType fuel_type;
	private double fuel_consumption;
	private int doors;
	private int people;
	private String description;
	private URI picture;
	private boolean available; 
	
	public enum VehicleType{
		CAR,
		VAN,
		MOBILEHOME
	}
	
	public enum TransmissionType{
		AUTOMATIC,
		MANUEL
	}
	
	public enum FuelType{
		DIESEL,
		BENZENE,
		HYBRID,
		ELECTRIC
	}

	public Vehicle() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Vehicle(int id, String brand, String model, double price, VehicleType vehicle_type, int object_id,
			TransmissionType transmission_type, FuelType fuel_type, double fuel_consumption, int doors, int people,
			String description, URI picture, boolean available) {
		super();
		this.id = id;
		this.brand = brand;
		this.model = model;
		this.price = price;
		this.vehicle_type = vehicle_type;
		this.object = new RentalAgency();
		this.object.setId(object_id);
		this.transmission_type = transmission_type;
		this.fuel_type = fuel_type;
		this.fuel_consumption = fuel_consumption;
		this.doors = doors;
		this.people = people;
		this.description = description;
		this.picture = picture;
		this.available = available;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public VehicleType getVehicle_type() {
		return vehicle_type;
	}

	public void setVehicle_type(VehicleType vehicle_type) {
		this.vehicle_type = vehicle_type;
	}

	public RentalAgency getObject() {
		return object;
	}

	public void setObject(RentalAgency object) {
		this.object = object;
	}

	public TransmissionType getTransmission_type() {
		return transmission_type;
	}

	public void setTransmission_type(TransmissionType transmission_type) {
		this.transmission_type = transmission_type;
	}

	public FuelType getFuel_type() {
		return fuel_type;
	}

	public void setFuel_type(FuelType fuel_type) {
		this.fuel_type = fuel_type;
	}

	public double getFuel_consumption() {
		return fuel_consumption;
	}

	public void setFuel_consumption(double fuel_consumption) {
		this.fuel_consumption = fuel_consumption;
	}

	public int getDoors() {
		return doors;
	}

	public void setDoors(int doors) {
		this.doors = doors;
	}

	public int getPeople() {
		return people;
	}

	public void setPeople(int people) {
		this.people = people;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public URI getPicture() {
		return picture;
	}

	public void setPicture(URI picture) {
		this.picture = picture;
	}

	public boolean isAvailable() {
		return available;
	}

	public void setAvailable(boolean available) {
		this.available = available;
	}
	
	
	
	
	
	
}
