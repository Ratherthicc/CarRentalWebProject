package model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class Order {
	private String order_id;
	private List<Vehicle> vehicles;
	private RentalAgency agency;
	private LocalDateTime date_time;
	private double duration;
	private double price;
	private String firstname;
	private String lastname;
	private Status status;
	
	public enum Status{
		PROCESSING,
		APPROVED,
		RETRIEVED,
		RETURNED,
		REJECTED,
		CANCELED
	}

	public Order() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Order(String order_id, List<Vehicle> vehicles, RentalAgency agency, LocalDateTime date_time, double duration,
			double price, String firstname, String lastname, Status status) {
		super();
		this.order_id = order_id;
		this.vehicles = vehicles;
		this.agency = agency;
		this.date_time = date_time;
		this.duration = duration;
		this.price = price;
		this.firstname = firstname;
		this.lastname = lastname;
		this.status = status;
	}

	public String getOrder_id() {
		return order_id;
	}

	public void setOrder_id(String order_id) {
		this.order_id = order_id;
	}

	public List<Vehicle> getVehicles() {
		return vehicles;
	}

	public void setVehicles(List<Vehicle> vehicles) {
		this.vehicles = vehicles;
	}

	public RentalAgency getAgency() {
		return agency;
	}

	public void setAgency(RentalAgency agency) {
		this.agency = agency;
	}

	public LocalDateTime getDate_time() {
		return date_time;
	}

	public void setDate_time(LocalDateTime date_time) {
		this.date_time = date_time;
	}

	public double getDuration() {
		return duration;
	}

	public void setDuration(double duration) {
		this.duration = duration;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}
	
	
	
	
}
