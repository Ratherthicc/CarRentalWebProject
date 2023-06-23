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
import model.RentalAgency;
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
}
