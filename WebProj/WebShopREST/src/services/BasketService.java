package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import dao.BasketDAO;
import dao.UserDAO;
import dao.VehicleDAO;
import model.Basket;
import model.User;
import model.Vehicle;

@Path("/baskets")
public class BasketService {
	@Context
	ServletContext ctx;

	public BasketService() {
		
	}
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("BasketDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("BasketDAO", new BasketDAO(contextPath));
		}
		if (ctx.getAttribute("VehicleDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("VehicleDAO", new VehicleDAO(contextPath));
		}
	}
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Basket> getBaskets() {
		BasketDAO dao = (BasketDAO) ctx.getAttribute("BasketDAO");
		return dao.getAll();
		
		
	}
	@GET
	@Path("/getBasket/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public Basket getBasket(@PathParam("username")String username) {
		BasketDAO dao = (BasketDAO) ctx.getAttribute("BasketDAO");
		return dao.getByUsername(username);
		
		
	}
	
	
	@POST
	@Path("/{username}/{veh_id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Basket addVehicle(@PathParam("username")String username,@PathParam("veh_id")int id) {
		
		BasketDAO dao = (BasketDAO) ctx.getAttribute("BasketDAO");
		VehicleDAO vehdao=(VehicleDAO) ctx.getAttribute("VehicleDAO");
		
		return dao.addToBasket(vehdao.getVehicleById(id), username);
	}
	
	@DELETE
	@Path("/deleteOne/{username}/{veh_id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Basket removeVehicle(@PathParam("username")String username,@PathParam("veh_id")int id) {
		
		BasketDAO dao = (BasketDAO) ctx.getAttribute("BasketDAO");
		VehicleDAO vehdao=(VehicleDAO) ctx.getAttribute("VehicleDAO");
		return dao.removeFromBasket(vehdao.getVehicleById(id),username);
	}
	
	@DELETE
	@Path("/deleteAll/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public void removeAllVehicles(@PathParam("username")String username) {
		
		BasketDAO dao = (BasketDAO) ctx.getAttribute("BasketDAO");
		dao.removeAllFromBasket(username);
		
	}
	
}
