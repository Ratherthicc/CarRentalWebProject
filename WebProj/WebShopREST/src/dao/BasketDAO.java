package dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import model.Basket;
import model.RentalAgency;

public class BasketDAO {
	private List<Basket> baskets=new ArrayList<Basket>(Arrays.asList(new Basket(),new Basket()));
	private String csvFilePath;
	public BasketDAO() {
		
	}
	
	
	public BasketDAO(String contextPath) {
		this.csvFilePath = contextPath.replace("\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\WebShopREST\\", "\\WebProj\\WebShopREST\\WebContent\\data\\baskets.csv");
		
		loadAll();
	}
	public Collection<Basket> getAll() {
		loadAll();
		return baskets;
	}
	
	public List<Basket> loadAll() {return null;}
	public void saveAll() {}
}
