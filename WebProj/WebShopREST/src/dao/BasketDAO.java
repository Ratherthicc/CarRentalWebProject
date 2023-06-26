package dao;

import java.io.FileReader;
import java.io.FileWriter;
import java.net.URI;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import model.Basket;
import model.Order;
import model.RentalAgency;
import model.Vehicle;
import model.Vehicle.FuelType;
import model.Vehicle.TransmissionType;
import model.Vehicle.VehicleType;
import serializers.LocalDateTimeSerializer;
import serializers.LocalTimeSerializer;

public class BasketDAO {
	private List<Basket> baskets=new ArrayList<Basket>();
	private String csvFilePath;
	public BasketDAO() {
		
	}
	
	
	public BasketDAO(String contextPath) {
		this.csvFilePath = contextPath.replace("\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\WebShopREST\\", "\\WebProj\\WebShopREST\\WebContent\\data\\baskets.json");
		//List<Vehicle> list=new ArrayList<>();
		//list.add(new Vehicle(0,"hah","haha",23,VehicleType.CAR,2,TransmissionType.AUTOMATIC,FuelType.DIESEL,22,3,3,"opis",URI.create("http://example.com"),true));
		//list.add(new Vehicle(1,"hah","haha",23,VehicleType.CAR,2,TransmissionType.AUTOMATIC,FuelType.DIESEL,22,3,3,"opis",URI.create("http://example.com"),true));
		//baskets.add(new Basket(0,"Jovan123",55.5,list));
		loadAll();
	}
	public Collection<Basket> getAll() {
		loadAll();
		return baskets;
	}
	public Basket getByUsername(String username) {
		loadAll();
		for(Basket b : baskets) {
			if(b.getUsername().equals(username)) {
				return b;
				
			}
		}
		return null;	
	}
	
	public Basket addToBasket(Vehicle vehicle,String username) {
		if(vehicle==null)return null;
		for(Basket b : baskets) {
			if(b.getUsername().equals(username)) {
				b.getVehicles().add(vehicle);
				saveAll();
				return b;
			}
		}
		return null;
	}
	
	
	public Basket removeFromBasket(Vehicle vehicle,String username) {
		
		if(vehicle==null)return null;
		for(Basket b : baskets) {
			if(b.getUsername().equals(username)) {
				for(Vehicle v : b.getVehicles()) {
					if(v.getId()==vehicle.getId()) {
						b.getVehicles().remove(v);
						saveAll();
						return b;
					}
				}
			}
		}
		return null;
	}
	
	public void removeAllFromBasket(String username) {
		for(Basket b : baskets) {
			if(b.getUsername().equals(username)) {

					
			b.getVehicles().clear();
					
					
				
			
			saveAll();
			return;
			}
		}
		
	}
	
	
	public List<Basket> loadAll() {
		try
    	{
			
			FileReader fileReader = new FileReader(this.csvFilePath);
			Gson gson = new GsonBuilder().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeSerializer())
					.registerTypeAdapter(LocalTime.class, new LocalTimeSerializer())
					.create();
			
			Basket[] objects = gson.fromJson(fileReader, Basket[].class);
			baskets.clear();
			if(objects ==  null) {
				return null;
			}
			
			for(Basket basket : objects) {
				baskets.add(basket);
			}			
			
			fileReader.close();
			return baskets;
    	} catch (Exception e)
    	{
    		System.out.println(e.getMessage());
    		System.out.println("nestooo");
    		return null;
    	}
	
	
	}
	public void saveAll() {
		try 
    	{
    		FileWriter fileWriter = new FileWriter(this.csvFilePath);
    		Gson gson = new GsonBuilder().setPrettyPrinting().create();
    		JsonArray jsonArray = new JsonArray();
    		
    		for (Basket objekat : baskets){    			
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
	private JsonObject makeJSON(Basket objekat) {
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("id", objekat.getId());
		jsonObject.addProperty("username", objekat.getUsername());
		jsonObject.addProperty("price", objekat.getPrice());
		JsonArray jsonArray = new JsonArray();
        for (Vehicle item : objekat.getVehicles()) {
        	JsonObject jsonVehicle = new JsonObject();
        	jsonVehicle.addProperty("id", item.getId());
        	jsonVehicle.addProperty("brand", item.getBrand());
        	jsonVehicle.addProperty("model", item.getModel());
        	jsonVehicle.addProperty("price", item.getPrice());
        	jsonVehicle.addProperty("vehicle_type", item.getVehicle_type().toString());
        	jsonVehicle.addProperty("rental_object_id",item.getRental_object_id());
        	jsonVehicle.addProperty("transmission_type", item.getTransmission_type().toString());
        	jsonVehicle.addProperty("fuel_type", item.getFuel_type().toString());
        	jsonVehicle.addProperty("fuel_consumption", item.getFuel_consumption());
        	jsonVehicle.addProperty("doors", item.getDoors());
        	jsonVehicle.addProperty("people", item.getPeople());
        	jsonVehicle.addProperty("description", item.getDescription());
        	jsonVehicle.addProperty("picture", item.getPicture().toString());
        	jsonVehicle.addProperty("available", item.isAvailable());
        	

            jsonArray.add(jsonVehicle);
        }
        jsonObject.add("vehicles", jsonArray);
        
		
		return jsonObject;
	}
}
