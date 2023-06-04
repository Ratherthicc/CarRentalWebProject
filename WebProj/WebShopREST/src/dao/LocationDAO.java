package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URI;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.jvnet.hk2.internal.PerLookupContext;

import model.Location;
import model.RentalAgency;
import model.RentalAgency.AgencyState;

public class LocationDAO {
	private List<Location> locations=new ArrayList<Location>();
	private String csvFilePath;
	public LocationDAO() {
		
	}
	/*
	 * @param contextPath
	 */
	public LocationDAO(String contextPath) {
		this.csvFilePath = contextPath.replace("\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\WebShopREST\\", "\\WebProj\\WebShopREST\\WebContent\\data\\locations.csv");
		loadAll();
	}
	public Collection<Location> getAll() {
		loadAll();
		return locations;
	}
	public Location GetById(int id) {
		loadAll();
		for (Location location : locations) {
			if(location.getId() == id)
				return location;
		}
		
		return null; 
	}
	
	public List<Location> loadAll() {
		String row;
		try (BufferedReader csvReader = new BufferedReader(new FileReader(csvFilePath))){
			locations.clear();
			while ((row = csvReader.readLine()) != null) {    
				String[] data=row.split(",");
				
				Location location=new Location(Integer.parseInt(data[0]),
											   Double.parseDouble(data[1]),
											   Double.parseDouble(data[2]),
											   data[3],
											   data[4],
											   data[5],
											   data[6]);
				locations.add(location);
			}
			csvReader.close();
		}
		catch (Exception e) {
			// TODO: handle exception
			return null;
		}
		
		return locations;
		
	}
	
	
	
	public void saveAll() {
		try (BufferedWriter writer = new BufferedWriter(new FileWriter(csvFilePath))) {
			StringBuilder line = new StringBuilder();
			for(Location location : locations) {
				
				line.append(location.getId());
				line.append(",");
				line.append(location.getGeographicHeight());
				line.append(",");
				line.append(location.getGeographicWidth());
				line.append(",");
				line.append(location.getStreet());
				line.append(",");
				line.append(location.getStreetNumber());
				line.append(",");
				line.append(location.getCity());
				line.append(",");
				line.append(location.getPostcode());
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
