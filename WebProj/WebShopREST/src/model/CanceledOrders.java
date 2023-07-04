package model;

import java.time.LocalDateTime;

public class CanceledOrders {
	private String username;
	private LocalDateTime date_time;
	
	public CanceledOrders(String username, LocalDateTime date_time) {
		super();
		this.username = username;
		this.date_time = date_time;
	}
	public CanceledOrders() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public LocalDateTime getDate_time() {
		return date_time;
	}
	public void setDate_time(LocalDateTime date_time) {
		this.date_time = date_time;
	}
	
	
}
