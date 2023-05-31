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
import model.RentalAgency;

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
	}
	
	@GET
	@Path("/getAll")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<RentalAgency> getAll(){
		RentalAgencyDAO rentalAgencyDAO = (RentalAgencyDAO) ctx.getAttribute("RentalAgencyDAO");
		LocationDAO locationDAO = (LocationDAO) ctx.getAttribute("LocationDAO");
		
		for (RentalAgency rentalAgency : rentalAgencyDAO.getAll()) {
			rentalAgency.setLocation(locationDAO.GetById(rentalAgency.getLocation().getId()));
		}
		return rentalAgencyDAO.getAll();
	}
}
