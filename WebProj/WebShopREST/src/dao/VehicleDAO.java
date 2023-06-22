package dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import model.Location;
import model.Vehicle;

public class VehicleDAO {
	private List<Vehicle> vehicles=new ArrayList<Vehicle>();
	private String csvFilePath;
	public VehicleDAO() {
		
	}
	/*
	 * @param contextPath
	 */
	public VehicleDAO(String contextPath) {
		this.csvFilePath = contextPath.replace("\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\WebShopREST\\", "\\WebProj\\WebShopREST\\WebContent\\data\\vehicles.csv");
		loadAll();
	}
	public Collection<Vehicle> getAll() {
		loadAll();
		return vehicles;
	}
	
	public List<Vehicle> loadAll() {return null;}
	
	public void saveAll() {}
	
	
}
