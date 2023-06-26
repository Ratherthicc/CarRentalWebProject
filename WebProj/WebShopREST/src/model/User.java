package model;




public class User {
	private String username;
	private String password;
	private String first_name;
	private String last_name;
	private Gender gender;
	private String birth_date;
	private UserType type;
	private double points;
	private String rank;
	
	public User() {
		
	}
	
	public User(String username, String password, String first_name, String last_name, Gender gender, String birth_date,
			UserType type, double points, String rank) {
		this.username = username;
		this.password = password;
		this.first_name = first_name;
		this.last_name = last_name;
		this.gender = gender;
		this.birth_date = birth_date;
		this.type = type;
		this.points = points;
		this.rank = rank;
	}

	public double getPoints() {
		return points;
	}
	public void setPoints(double points) {
		this.points = points;
	}
	public String getRank() {
		return rank;
	}
	public void setRank(String rank) {
		this.rank = rank;
	}
	public enum Gender {
		  Male,
		  Female
		}
	public enum UserType{
		Buyer,
		Manager,
		Administrator
	}
	
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	public Gender getGender() {
		return gender;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	public String getBirth_date() {
		return birth_date;
	}
	public void setBirth_date(String birth_date) {
		this.birth_date = birth_date;
	}
	public UserType getType() {
		return type;
	}
	public void setType(UserType type) {
		this.type = type;
	}
	
	
	
}
