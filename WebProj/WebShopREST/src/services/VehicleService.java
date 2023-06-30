package services;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import dao.LocationDAO;
import dao.OrderDAO;
import dao.RentalAgencyDAO;
import dao.UserDAO;
import dao.VehicleDAO;
import model.RentalAgency;
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
		if (ctx.getAttribute("RentalAgencyDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
	    	
			ctx.setAttribute("RentalAgencyDAO", new RentalAgencyDAO(contextPath));
		}
		if (ctx.getAttribute("OrderDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
	    	
			ctx.setAttribute("OrderDAO", new OrderDAO(contextPath));
		}
		
	}
	@GET
	@Path("/ByRentalObject/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Vehicle> getByRentalObjectId(@PathParam("id") int rentalObjectId){
		VehicleDAO dao = (VehicleDAO) ctx.getAttribute("VehicleDAO");
		
		return dao.getAll().stream()
				.filter(v -> v.getRental_object_id() == rentalObjectId).collect(Collectors.toList());
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Vehicle> getVehicles() {
		VehicleDAO dao = (VehicleDAO) ctx.getAttribute("VehicleDAO");
		Collection<Vehicle> lista= dao.getAll();
		RentalAgencyDAO dao2=(RentalAgencyDAO) ctx.getAttribute("RentalAgencyDAO");
		Collection<RentalAgency> objects=dao2.getAll();
		for(Vehicle veh:lista) {
			for(RentalAgency ren:objects) {
				if(veh.getRental_object_id()==ren.getId()) {
					veh.setRental_object(ren);
					
					break;
				}
			}
			
		}
		return lista;
		
		
	}
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Vehicle getVehicle(@PathParam("id")int id) {
		VehicleDAO dao = (VehicleDAO)ctx.getAttribute("VehicleDAO");
		
		
		return dao.getVehicleById(id);
	}
	
	
	
}
