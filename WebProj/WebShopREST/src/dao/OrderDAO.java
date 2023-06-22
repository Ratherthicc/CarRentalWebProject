package dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import model.Basket;
import model.Order;
import model.User;

public class OrderDAO {
	private List<Order> orders=new ArrayList<Order>();
	private String csvFilePath;
	public OrderDAO() {
		
	}
	/*
	 * @param contextPath
	 */
	public OrderDAO(String contextPath) {
		this.csvFilePath = contextPath.replace("\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\WebShopREST\\", "\\WebProj\\WebShopREST\\WebContent\\data\\orders.csv");
		loadAll();
	}
	public Collection<Order> getAll() {
		return orders;
	}
	
	public List<Order> loadAll() {return null;}
	public void saveAll() {}
}
