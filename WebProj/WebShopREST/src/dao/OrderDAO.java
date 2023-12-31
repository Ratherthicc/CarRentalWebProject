package dao;

import java.awt.Taskbar.State;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.ObjectInputFilter.Status;
import java.net.URI;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import model.Basket;
import model.Order;
import model.User;
import model.Vehicle;
import model.Vehicle.FuelType;
import model.Vehicle.TransmissionType;
import model.Vehicle.VehicleType;
import serializers.LocalDateTimeSerializer;
import serializers.LocalTimeSerializer;

public class OrderDAO {
	private List<Order> orders=new ArrayList<Order>();
	private String csvFilePath;
	public OrderDAO() {
		
	}
	/*
	 * @param contextPath
	 */
	public OrderDAO(String contextPath) {
		this.csvFilePath = contextPath.replace("\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\WebShopREST\\", "\\WebProj\\WebShopREST\\WebContent\\data\\orders.json");
		//List<Vehicle> lista=new ArrayList<>();
		//lista.add(new Vehicle(0,"hah","haha",23,VehicleType.CAR,2,TransmissionType.AUTOMATIC,FuelType.DIESEL,22,3,3,"opis",URI.create("http://example.com"),true));
		//orders.add(new Order("sifra1",lista,1,LocalDateTime.of(2014, Month.JANUARY, 1, 10, 10, 30),5,55,"Jovan","Katanic",Order.Status.APPROVED));
		//.add(new Order("sifra2",lista,1,LocalDateTime.of(2014, Month.JANUARY, 1, 10, 10, 30),5,55,"Jovan","Katanic",Order.Status.APPROVED));
		//saveAll();
		loadAll();
		
	}
	public Collection<Order> getAll() {
		return orders;
	}
	public Collection<Order> getUserOrders(String username){
		List<Order> userOrders=new ArrayList<>();
		for(Order order:orders) {
			if(order.getUsername().equals(username)) userOrders.add(order);
		}
		return userOrders;
		
		
	}
	
	public Order updateStatus(String order_id,Order.Status status) {
		
		for(Order order:orders) {
			if(order.getOrder_id().equals(order_id)) {
				order.setStatus(status);
				saveAll();
				return order;
			}
		}
		
		return null;
	}
	
	
	public Collection<Order> getSortedDates(int flag){
		
		List<Order> myList = new ArrayList<>(orders);
        
        // Sort the list by LocalDateTime
		if(flag==1) {
			myList.sort(Comparator.comparing(Order::getDate_time));
		}
		else {
			myList.sort(Comparator.comparing(Order::getDate_time).reversed());
        }
        // Iterate over the sorted list
        
       
		return myList;
	}
	
	
	public void addOrder(Order o) {
		if(validate(o)) {
			loadAll();
			o.setOrder_id(makeId());
			orders.add(o);
			saveAll();
		}
	}
	
	
	
	public boolean checkId(String s) {
		if(s.equals(""))return false;
		for(Order o:orders) {
			  if(o.getOrder_id().equals(s)) {
				  return false;
				  
			  }
		  }
		return true;
	}
	
	public String makeId() {
		int n=14;
		String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		         + "0123456789"
		         + "abcdefghijklmnopqrstuvxyz";
		 
		  // create StringBuffer size of AlphaNumericString
		  StringBuilder sb = new StringBuilder(n);
		  String s="";
		  while(!checkId(s)) {
			  
		  
			  for (int i = 0; i < n; i++) {
			 
			   // generate a random number between
			   // 0 to AlphaNumericString variable length
			   int index
			    = (int)(AlphaNumericString.length()
			      * Math.random());
			 
			   // add Character one by one in end of sb
			   sb.append(AlphaNumericString
			      .charAt(index));
			  }
			  
			  s = sb.toString();
		  }
		  
		  
		  return s;
	}
	
	
	public List<Order> loadAll() {
		try
    	{
			
			FileReader fileReader = new FileReader(this.csvFilePath);
			Gson gson = new GsonBuilder().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeSerializer())
					.registerTypeAdapter(LocalTime.class, new LocalTimeSerializer())
					.create();
			
			Order[] objects = gson.fromJson(fileReader, Order[].class);
			orders.clear();
			if(objects ==  null) {
				return null;
			}
			
			for(Order order : objects) {
				orders.add(order);
			}			
			
			fileReader.close();
			return orders;
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
    		
    		for (Order objekat : orders){    			
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
	private JsonObject makeJSON(Order objekat) {
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("order_id", objekat.getOrder_id());
		
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
        
		jsonObject.addProperty("agency_id", objekat.getAgency_id());
		jsonObject.addProperty("date_time", objekat.getDate_time().toString());
		jsonObject.addProperty("duration", objekat.getDuration());
		jsonObject.addProperty("price", objekat.getPrice());
		jsonObject.addProperty("firstname", objekat.getFirstname());
		jsonObject.addProperty("lastname", objekat.getLastname());
		jsonObject.addProperty("status", objekat.getStatus().toString());
		jsonObject.addProperty("username", objekat.getUsername());
		return jsonObject;
	}
	private boolean validate(Order order) {
		
		if(order.getFirstname().isBlank() || order.getLastname().isBlank() ||
				order.getPrice()<=0 || order.getUsername().isBlank() || 
				order.getVehicles().isEmpty() || order.getAgency_id()<0) {
			return false;
		}

		return true;
	}
	
}
