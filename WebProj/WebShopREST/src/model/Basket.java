package model;

import java.util.ArrayList;
import java.util.List;

public class Basket {
	private int id;
	private User user;
	private double price;
	private List<Vehicle> vehicles;
	
	
	public Basket() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Basket(int id, String username, double price) {
		super();
		this.id = id;
		this.user = new User();
		this.user.setUsername(username);
		this.price = price;
		this.vehicles = new ArrayList<Vehicle>();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public List<Vehicle> getVehicles() {
		return vehicles;
	}
	public void setVehicles(List<Vehicle> vehicles) {
		this.vehicles = vehicles;
	}
	
	
	
}
