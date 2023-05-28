package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import model.User;
import model.User.Gender;
import model.User.UserType;

public class UserDAO {
	private List<User> users=new ArrayList<User>();
	private String csvFilePath = "C:\\Users\\Legion\\Downloads\\WebProj\\WebShopREST\\WebContent\\data\\users.csv";
	public UserDAO() {
		
	}
	/*
	 * @param contextPath
	 */
	public UserDAO(String contextPath) {
		loadAll();
	}
	public Collection<User> getAll() {
		return users;
	}
	
	/***
	 * Vraca sve proizvode.
	 * @return
	 */
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
				
				User user=new User(data[0],data[1],data[2],data[3],gender,data[5],type);
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
				line.append("\n");
				
			}
			writer.write(line.toString());
            

            System.out.println("Written to csv");
        } catch (IOException e) {
            System.err.println("Error writing to CSV file: " + e.getMessage());
        }
		
	}
	
}
