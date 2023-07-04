package dao;

import java.io.FileReader;
import java.io.FileWriter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import model.Basket;
import model.CanceledOrders;
import model.Vehicle;
import serializers.LocalDateTimeSerializer;
import serializers.LocalTimeSerializer;

public class CanceledOrdersDAO {
	private List<CanceledOrders> canceledOrders=new ArrayList<CanceledOrders>();
	private String csvFilePath;
	public CanceledOrdersDAO() {
		
	}
	
	public CanceledOrdersDAO(String contextPath) {
		this.csvFilePath = contextPath.replace("\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\WebShopREST\\", "\\WebProj\\WebShopREST\\WebContent\\data\\canceledorders.json");
		//List<Vehicle> list=new ArrayList<>();
		//list.add(new Vehicle(0,"hah","haha",23,VehicleType.CAR,2,TransmissionType.AUTOMATIC,FuelType.DIESEL,22,3,3,"opis",URI.create("http://example.com"),true));
		//list.add(new Vehicle(1,"hah","haha",23,VehicleType.CAR,2,TransmissionType.AUTOMATIC,FuelType.DIESEL,22,3,3,"opis",URI.create("http://example.com"),true));
		//baskets.add(new Basket(0,"Jovan123",55.5,list));
		loadAll();
	}
	public Collection<CanceledOrders> getAll() {
		loadAll();
		return canceledOrders;
	}
	
	public void addCanceledOrder(String username) {
		canceledOrders.add(new CanceledOrders(username,LocalDateTime.now()));
		saveAll();
	}
	
	public boolean checkUser(String username) {
		int count;
		for(CanceledOrders order:canceledOrders) {
			if(order.getUsername().equals(username)) {
			count=0;
			LocalDateTime start_date=order.getDate_time();
			LocalDateTime end_date=start_date.plusMonths(1);
				for(CanceledOrders order2:canceledOrders) {
			        int comparisonResult1 = order2.getDate_time().compareTo(start_date);
			        int comparisonResult2 = order2.getDate_time().compareTo(end_date);
					if(comparisonResult1>=0 && comparisonResult2<=0 && order2.getUsername().equals(username)) {
						count++;
						if(count>=3) {
							return false;
						}
					}
				}
			}
		}
		return true;
	}
	public List<CanceledOrders> loadAll() {
		try
    	{
			
			FileReader fileReader = new FileReader(this.csvFilePath);
			Gson gson = new GsonBuilder().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeSerializer())
					.registerTypeAdapter(LocalTime.class, new LocalTimeSerializer())
					.create();
			
			CanceledOrders[] objects = gson.fromJson(fileReader, CanceledOrders[].class);
			canceledOrders.clear();
			if(objects ==  null) {
				return null;
			}
			
			for(CanceledOrders orders : objects) {
				canceledOrders.add(orders);
			}			
			
			fileReader.close();
			return canceledOrders;
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
    		
    		for (CanceledOrders objekat : canceledOrders){    			
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
	private JsonObject makeJSON(CanceledOrders objekat) {
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("username", objekat.getUsername());
		jsonObject.addProperty("date_time", objekat.getDate_time().toString());
		return jsonObject;
	}
	
}
