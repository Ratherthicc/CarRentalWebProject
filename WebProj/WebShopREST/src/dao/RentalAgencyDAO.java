package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URI;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import model.RentalAgency;
import model.RentalAgency.AgencyState;
import model.User;
import model.User.Gender;
import model.User.UserType;
import model.RentalAgency;

public class RentalAgencyDAO {
	private List<RentalAgency> rentalAgencies=new ArrayList<RentalAgency>();
	private String csvFilePath;
	public RentalAgencyDAO() {
		
	}
	/*
	 * @param contextPath
	 */
	public RentalAgencyDAO(String contextPath) {
		this.csvFilePath = contextPath.replace("\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\WebShopREST\\", "\\WebProj\\WebShopREST\\WebContent\\data\\rentalagencies.csv");
		
		loadAll();
	}
	public Collection<RentalAgency> getAll() {
		loadAll();
		return rentalAgencies;
	}
	
	public List<RentalAgency> loadAll() {
		String row;
		try (BufferedReader csvReader = new BufferedReader(new FileReader(this.csvFilePath))){
			rentalAgencies.clear();
			while ((row = csvReader.readLine()) != null) {    
				String[] data=row.split(",");
				
				AgencyState state = (data[4].equals("WORKING")) ? AgencyState.WORKING : AgencyState.NOT_WORKING;
				
				RentalAgency rentalAgency=new RentalAgency(Integer.parseInt(data[0]),
													       data[1],
													       LocalTime.parse(data[2]),
													       LocalTime.parse(data[3]),
													       state,
													       new URI(data[5]),
													       Integer.parseInt(data[6]),
													       Integer.parseInt(data[7]));
				rentalAgencies.add(rentalAgency);
			}
			csvReader.close();
		}
		catch (Exception e) {
			// TODO: handle exception
			return null;
		}
		
		return rentalAgencies;
		
	}
	
	public void saveAll() {
		try (BufferedWriter writer = new BufferedWriter(new FileWriter(csvFilePath))) {
			StringBuilder line = new StringBuilder();
			for(RentalAgency rentalAgency : rentalAgencies) {
				
				line.append(rentalAgency.getId());
				line.append(",");
				line.append(rentalAgency.getName());
				line.append(",");
				line.append(rentalAgency.getOpeningTime().toString());
				line.append(",");
				line.append(rentalAgency.getClosingTime().toString());
				line.append(",");
				line.append(rentalAgency.getState());
				line.append(",");
				line.append(rentalAgency.getLogoURI().toString());
				line.append(",");
				line.append(rentalAgency.getRating());
				line.append(",");
				line.append(rentalAgency.getLocation().getId());
				line.append("\n");
				
			}
			writer.write(line.toString());
            
			//writer.close();
            System.out.println("Written to csv");
        } catch (IOException e) {
            System.err.println("Error writing to CSV file: " + e.getMessage());
        }
		
	}
	
}
