package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import dao.LocationDAO;
import dao.RentalAgencyDAO;
import dao.UserDAO;
import dao.VehicleDAO;
import model.User;
import model.Vehicle;

@Path("/vehicles")
public class VehicleService {

	@Context
	ServletContext ctx;

	public VehicleService() {
		
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("VehicleDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
	    	
			ctx.setAttribute("VehicleDAO", new VehicleDAO(contextPath));
		}
		
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Vehicle> getVehicles() {
		VehicleDAO dao = (VehicleDAO) ctx.getAttribute("VehicleDAO");
		return dao.getAll();
		
		
	}
}
