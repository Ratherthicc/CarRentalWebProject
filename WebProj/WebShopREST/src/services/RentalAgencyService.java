package services;

import java.util.Collection;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import dao.LocationDAO;
import dao.RentalAgencyDAO;
import dao.VehicleDAO;
import model.Basket;
import model.Comment;
import model.Location;
import model.Order;
import model.RentalAgency;
import model.User;
import model.Vehicle;

@Path("/rentalAgency")
public class RentalAgencyService {
	
	@Context
	ServletContext ctx;

	public RentalAgencyService() {
		
	}
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("RentalAgencyDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
	    	
			ctx.setAttribute("RentalAgencyDAO", new RentalAgencyDAO(contextPath));
		}
		if(ctx.getAttribute("LocationDAO") == null) {
			String contextPath = ctx.getRealPath("");
			
			ctx.setAttribute("LocationDAO", new LocationDAO(contextPath));
		}
		if(ctx.getAttribute("VehicleDAO") == null) {
			String contextPath = ctx.getRealPath("");
			
			ctx.setAttribute("VehicleDAO", new VehicleDAO(contextPath));
		}
		if(ctx.getAttribute("VehicleService") == null) {
			ctx.setAttribute("VehicleService", new VehicleService());
		}
	}
	
	@GET
	@Path("/getAll")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<RentalAgency> getAll(){
		RentalAgencyDAO rentalAgencyDAO = (RentalAgencyDAO) ctx.getAttribute("RentalAgencyDAO");
		LocationDAO locationDAO = (LocationDAO) ctx.getAttribute("LocationDAO");
		VehicleDAO vehicleDAO= (VehicleDAO) ctx.getAttribute("VehicleDAO");
		
		Collection<RentalAgency> rentalAgencies = rentalAgencyDAO.getAll();
		for (RentalAgency rentalAgency : rentalAgencies) {
			rentalAgency.setLocation(locationDAO.GetById(rentalAgency.getLocation().getId()));
			
			for(Vehicle vehi:vehicleDAO.getByRentalObjectId(rentalAgency.getId())) {
				rentalAgency.addVehicles(vehi);
			}
			
		}
		
		
		
		return rentalAgencies;
	}
	
	@GET
	@Path("/getById/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public RentalAgency GetById(@PathParam("id") int id) {
		RentalAgencyDAO rentalAgencyDAO = (RentalAgencyDAO) ctx.getAttribute("RentalAgencyDAO");
		VehicleDAO vehicleDAO = (VehicleDAO) ctx.getAttribute("VehicleDAO");
		LocationDAO locationDAO = (LocationDAO) ctx.getAttribute("LocationDAO");
		
		RentalAgency rentalAgency =  rentalAgencyDAO.getById(id);
		rentalAgency.setLocation(locationDAO.GetById(rentalAgency.getLocation().getId()));
		for (Vehicle v : vehicleDAO.getByRentalObjectId(rentalAgency.getId())) {
			rentalAgency.addVehicles(v);
		}
		return rentalAgency;
	}
	
	@POST
	@Path("/addAgency/{open}/{close}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public int addAgency(@PathParam("open")String open,@PathParam("close")String close,RentalAgency agency) {
		
		RentalAgencyDAO dao = (RentalAgencyDAO) ctx.getAttribute("RentalAgencyDAO");
		return dao.addAgency(agency,open,close);
	}
}
