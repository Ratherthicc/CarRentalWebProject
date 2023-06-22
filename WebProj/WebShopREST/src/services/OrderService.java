package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import dao.OrderDAO;
import dao.UserDAO;
import model.Order;
import model.User;
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
	}
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Order> getOrders() {
		OrderDAO dao = (OrderDAO) ctx.getAttribute("OrderDAO");
		return dao.getAll();
		
		
	}
}
