package services;

import java.util.Collection;

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
import dao.CanceledOrdersDAO;
import dao.VehicleDAO;
import model.Basket;
import model.CanceledOrders;

@Path("/canceledOrders")
public class CanceledOrdersService {
	@Context
	ServletContext ctx;
	
	public CanceledOrdersService() {	
	}
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("CanceledOrdersDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("CanceledOrdersDAO", new CanceledOrdersDAO(contextPath));
		}
		
	}
	
	@GET
	@Path("/getAll")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<CanceledOrders> getCanceledOrders() {
		CanceledOrdersDAO dao = (CanceledOrdersDAO) ctx.getAttribute("CanceledOrdersDAO");
		return dao.getAll();
		
		
	}
	
	@POST
	@Path("/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public void addVehicle(@PathParam("username")String username) {
		
		CanceledOrdersDAO dao = (CanceledOrdersDAO) ctx.getAttribute("CanceledOrdersDAO");
		dao.addCanceledOrder(username);
	}
	
	@GET
	@Path("/checkUser/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public boolean checkUser(@PathParam("username")String username) {
		CanceledOrdersDAO dao = (CanceledOrdersDAO) ctx.getAttribute("CanceledOrdersDAO");
		return dao.checkUser(username);
		
		
		
	}
	
}
