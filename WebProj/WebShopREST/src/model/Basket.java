package model;

import java.util.ArrayList;
import java.util.List;

public class Basket {
	private int id;
	private String username;
	private User user;
	private double price;
	private List<Vehicle> vehicles;
	
	
	public Basket() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Basket(int id, String username, double price,List<Vehicle> li) {
		super();
		this.id = id;
		this.user = new User();
		this.user.setUsername(username);
		this.username=username;
		this.price = price;
		this.vehicles = new ArrayList<Vehicle>(li);
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
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
