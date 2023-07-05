package dao;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.json.simple.JSONObject;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import model.Location;
import model.RentalAgency;
import model.Vehicle;
import model.Vehicle.FuelType;
import model.Vehicle.TransmissionType;
import model.Vehicle.VehicleType;
import serializers.LocalTimeSerializer;

public class VehicleDAO {
	private List<Vehicle> vehicles=new ArrayList<Vehicle>();
	private String csvFilePath;
	public VehicleDAO() {
		
	}
	/*
	 * @param contextPath
	 */
	public VehicleDAO(String contextPath) {
		this.csvFilePath = contextPath.replace("\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\WebShopREST\\", "\\WebProj\\WebShopREST\\WebContent\\data\\vehicles.json");
		//vehicles.add(new Vehicle(0,"hah","haha",23,VehicleType.CAR,2,TransmissionType.AUTOMATIC,FuelType.DIESEL,22,3,3,"opis",URI.create("http://example.com"),true));
		//vehicles.add(new Vehicle(0,"hah","haha",23,VehicleType.CAR,2,TransmissionType.AUTOMATIC,FuelType.DIESEL,22,3,3,"opis",URI.create("http://example.com"),true));
		
		
		loadAll();
		
	}
	public Collection<Vehicle> getAll() {
		loadAll();
		return vehicles;
	}
	public void Update(Vehicle vehicle) {
		try {
			for (Vehicle v : vehicles) {
				if(v.getId() == vehicle.getId())
					v = vehicle;
			}
			saveAll();
		}
		catch (Exception e) {
			System.out.println("Greska pri azuriranju vozila(ID: " + vehicle.getId() + ")");
		}
	}
	
	public Collection<Vehicle> getByRentalObjectId(int id){
		List<Vehicle> vehicle_list=new ArrayList<Vehicle>();
		for(Vehicle item:vehicles) {
			if(item.getRental_object_id()==id) {
				vehicle_list.add(item);
			}
		}
		return vehicle_list;
	}
	public Vehicle getVehicleById(int id){
		for(Vehicle item:vehicles) {
			if(item.getId()==id) {
				return item;
			}
		
		}
		return null;
	}
	public void Add(Vehicle vehicle) {
		loadAll();
		vehicle.setId(vehicles.size());
		vehicles.add(vehicle);
		saveAll();
	}
	
	
	public List<Vehicle> loadAll() {
		try
    	{
			
			FileReader fileReader = new FileReader(this.csvFilePath);
			Gson gson = new GsonBuilder().registerTypeAdapter(LocalTime.class, new LocalTimeSerializer())
	                .create();
			
			Vehicle[] objects = gson.fromJson(fileReader, Vehicle[].class);
			vehicles.clear();
			if(objects ==  null) {
				return null;
			}
			
			for(Vehicle vehicle : objects) {
				vehicles.add(vehicle);
			}			
			
			fileReader.close();
			return vehicles;
    	} catch (Exception e)
    	{
    		System.out.println(e.getMessage());
    		System.out.println("nesto123");
    		return null;
    	}
		
	}
	
	public void saveAll() {
		try 
    	{
    		FileWriter fileWriter = new FileWriter(this.csvFilePath);
    		Gson gson = new GsonBuilder().setPrettyPrinting().create();
    		JsonArray jsonArray = new JsonArray();
    		
    		for (Vehicle objekat : vehicles){    			
    			jsonArray.add(makeJSON(objekat));
    		}

    		String jsonString = gson.toJson(jsonArray);
    		fileWriter.write(jsonString);
    		
    		fileWriter.close();
    	}
    	catch (Exception e)
    	{
    		System.out.println("Greska pri upisu");
    	}
	}
	
	private JsonObject makeJSON(Vehicle objekat) {
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("id", objekat.getId());
		jsonObject.addProperty("brand", objekat.getBrand());
		jsonObject.addProperty("model", objekat.getModel());
		jsonObject.addProperty("price", objekat.getPrice());
		jsonObject.addProperty("vehicle_type", objekat.getVehicle_type().toString());
		jsonObject.addProperty("rental_object_id",objekat.getRental_object_id());
		jsonObject.addProperty("transmission_type", objekat.getTransmission_type().toString());
		jsonObject.addProperty("fuel_type", objekat.getFuel_type().toString());
		jsonObject.addProperty("fuel_consumption", objekat.getFuel_consumption());
		jsonObject.addProperty("doors", objekat.getDoors());
		jsonObject.addProperty("people", objekat.getPeople());
		jsonObject.addProperty("description", objekat.getDescription());
		jsonObject.addProperty("picture", objekat.getPicture().toString());
		jsonObject.addProperty("available", objekat.isAvailable());
		return jsonObject;
	}
	
	
	
}
