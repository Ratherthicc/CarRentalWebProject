package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import model.User;
import model.User.Gender;
import model.User.UserType;

public class UserDAO {
	private List<User> users=new ArrayList<User>();
	private String csvFilePath;
	public UserDAO() {
		
	}
	/*
	 * @param contextPath
	 */
	public UserDAO(String contextPath) {
		this.csvFilePath = contextPath.replace("\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\WebShopREST\\", "\\WebProj\\WebShopREST\\WebContent\\data\\users.csv");
		loadAll();
	}
	public Collection<User> getAll() {
		return users;
	}
	public Collection<User> getBuyers(){
		List<User> list=new ArrayList<>();
		for(User u : users) {
			if(u.getType()!=User.UserType.Administrator) {
				list.add(u);
			}
		}
		
		
		return list;
	}
	
	
	public User updatePoints(String username,double points) {
		User u=this.getUser(username);
		if(u==null)return null;
		u.setPoints(u.getPoints()+points);
		if(u.getPoints()>=200) {
			u.setRank("GOLD");
		}
		else if(u.getPoints()>=100){
			u.setRank("SILVER");
		}
		else {
			u.setRank("BRONZE");
		}
		saveAll();
		return u;
	}
	
	public User getUser(String username) {
		for(User u:users) {
			if(u.getUsername().equals(username)) {
				return u;
			}
		}
		return null;
	}
	public Collection<User> getManagers() {
		List<User> lista=new ArrayList<>();
		for(User u:users) {
			if(u.getType()==User.UserType.Manager && u.getAgencyId()==-1) {
				lista.add(u);
			}
		}
		return lista;
	}
	
	public User addUser(User u) {
		for(User user : users) {
			if(user.getUsername().equals(u.getUsername()))return null;
		}
		if(!validateUser(u)) {
			
			return null;
		}
		users.add(u);
		saveAll();
		return u;
	}
	public User updateUser(User u) {
		for(User user : users) {
			if(user.getUsername().equals(u.getUsername())) {
				if(!validateUser(u)) {
					
					return null;
				}
				user.setFirst_name(u.getFirst_name());
				user.setBirth_date(u.getBirth_date());
				user.setGender(u.getGender());
				user.setLast_name(u.getLast_name());
				
				saveAll();
				return user;
			}
		}
		
		return null;
	}
	public User updateAgencyId(String username,int id) {
		for(User user : users) {
			if(user.getUsername().equals(username)) {
				user.setAgencyId(id);
				saveAll();
				return user;
			}
		}
		return null;
		
	}
	
	public User findUser(String us,String pas) {
		for(User user : users) {
			if(user.getUsername().equals(us) && user.getPassword().equals(pas))return user;
		}
		return null;
	}
	public User findUserByUsername(String username) {
		for(User user : users) {
			if(user.getUsername().equals(username))return user;
		}
		return null;
	}
	
	
	public List<User> loadAll() {
		String row;
		try (BufferedReader csvReader = new BufferedReader(new FileReader(csvFilePath))){
			users.clear();
			while ((row = csvReader.readLine()) != null) {    
				String[] data=row.split(",");
				Gender gender;
				UserType type;
				if(data[4].equals("Male")) 
					gender=Gender.Male;
				else 
					gender=Gender.Female;
				
				if(data[6].equals("Buyer")) 
					type=UserType.Buyer;
				else if(data[6].equals("Manager"))
					type=UserType.Manager;
				else 
					type=UserType.Administrator;
				
				User user=new User(data[0],data[1],data[2],data[3],gender,data[5],type,Double.parseDouble(data[7]),data[8], Integer.parseInt(data[9]),Integer.parseInt(data[10]));
				users.add(user);
				
			    
			    
			}
			csvReader.close();
		}
		catch (Exception e) {
			// TODO: handle exception
			return null;
		}
		
		return users;
		
	}
	public void saveAll() {
		try (BufferedWriter writer = new BufferedWriter(new FileWriter(csvFilePath))) {
			
			StringBuilder line = new StringBuilder();
			for(User user : users) {
				
				line.append(user.getUsername());
				line.append(",");
				line.append(user.getPassword());
				line.append(",");
				line.append(user.getFirst_name());
				line.append(",");
				line.append(user.getLast_name());
				line.append(",");
				line.append(user.getGender());
				line.append(",");
				line.append(user.getBirth_date());
				line.append(",");
				line.append(user.getType());
				line.append(",");
				line.append(user.getPoints());
				line.append(",");
				line.append(user.getRank());
				line.append(",");
				line.append(user.getAgencyId());
				line.append(",");
				line.append(user.getBlocked());
				line.append("\n");
				
			}
			writer.write(line.toString());
			writer.close();
        } catch (IOException e) {
            System.err.println("Error writing to CSV file: " + e.getMessage());
        }
		
	}
	
	private boolean validateUser(User user) {
		if(user.getUsername().isBlank() || user.getPassword().isBlank() || user.getFirst_name().isBlank() || user.getLast_name().isBlank()
				|| !(user.getGender().equals(Gender.Male) || user.getGender().equals(Gender.Female) ) || user.getBirth_date().isBlank()) {
			return false;
		}
		String regexUsername="[a-zA-Z].*";
		if(!user.getUsername().matches(regexUsername)){
			
			return false;
		}
		
		String regexName="[A-Z][a-z]+";
		if(!user.getFirst_name().matches(regexName) || !user.getLast_name().matches(regexName) ) {
			return false;
		}
		
		String dateRegex="\\d{4}-\\d{2}-\\d{2}";
		if(!user.getBirth_date().matches(dateRegex)) {
			return false;
		}
		try {
		LocalDate currentDate = LocalDate.now();
		LocalDate l=LocalDate.parse(user.getBirth_date());
		int comparison=l.compareTo(currentDate);
		if (comparison >= 0) {
			
            return false;
        }
		}
		catch (Exception e) {
			System.out.println("date error");
			return false;
		}
		
		return true;
	}
	
}
