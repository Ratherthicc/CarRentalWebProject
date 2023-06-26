package services;

import java.io.ObjectInputFilter.Status;
import java.sql.Date;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import dao.BasketDAO;
import dao.OrderDAO;
import dao.RentalAgencyDAO;
import dao.UserDAO;
import model.Order;
import model.User;
import model.Vehicle;
@Path("/orders")
public class OrderService {
	@Context
	ServletContext ctx;

	public OrderService() {
		
	}
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("OrderDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("OrderDAO", new OrderDAO(contextPath));
		}
		if (ctx.getAttribute("RentalAgencyDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("RentalAgencyDAO", new RentalAgencyDAO(contextPath));
		}
		if (ctx.getAttribute("BasketDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("BasketDAO", new BasketDAO(contextPath));
		}
		if (ctx.getAttribute("UserDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("UserDAO", new UserDAO(contextPath));
		}
	}
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Order> getOrders() {
		OrderDAO dao = (OrderDAO) ctx.getAttribute("OrderDAO");
		RentalAgencyDAO rentalDAO = (RentalAgencyDAO) ctx.getAttribute("RentalAgencyDAO");
		Collection<Order> orders=dao.getAll();
		for(Order order:orders) {
			order.setAgency(rentalDAO.getById(order.getAgency_id()));
		}
		
		
		return orders;
		
		
	}
	
	@POST
	@Path("/{username}/{from_date}/{to_date}")
	@Produces(MediaType.APPLICATION_JSON)
	public void postOrder(@PathParam("username")String username,@PathParam("from_date")String from_date,@PathParam("to_date")String to_date) {
		
		OrderDAO dao = (OrderDAO) ctx.getAttribute("OrderDAO");
		BasketDAO basketDAO = (BasketDAO) ctx.getAttribute("BasketDAO");
		UserDAO userDAO = (UserDAO) ctx.getAttribute("UserDAO");
		List<Integer> agencyIds=new ArrayList<>();
		List<Vehicle> vehicles=basketDAO.getByUsername(username).getVehicles();
		
		User user=userDAO.getUser(username);
		
		for(Vehicle vehicle:vehicles) {
			int id=vehicle.getRental_object_id();
			if(!agencyIds.contains(id) ) {
				agencyIds.add(id);
			}
		}
		double price=0;
		for(int agency_id:agencyIds) {
			List<Vehicle> listToAdd=new ArrayList<>();
			price=0;
			for(Vehicle vehicle:vehicles) {
					
					if(vehicle.getRental_object_id()==agency_id) {
						listToAdd.add(vehicle);
						price+=vehicle.getPrice();
					}
					
			}
			
			LocalDateTime startDate=LocalDateTime.parse(from_date);
			LocalDateTime endDate=LocalDateTime.parse(to_date);
			Duration duration = Duration.between(startDate, endDate);
			double len= duration.toDays();
			Order order=new Order("0",listToAdd,agency_id,startDate,len,price,username,user.getLast_name(),Order.Status.PROCESSING);
			dao.addOrder(order);
		}
		
		
	}
	
}
