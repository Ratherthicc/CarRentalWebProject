package services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
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

import dao.CommentDAO;
import dao.LocationDAO;
import dao.OrderDAO;
import dao.RentalAgencyDAO;
import dao.VehicleDAO;
import model.Basket;
import model.Comment;
import model.Comment.CommentStatus;
import model.Location;
import model.Order;
import model.Order.Status;
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
		if (ctx.getAttribute("OrderDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("OrderDAO", new OrderDAO(contextPath));
		}
		if (ctx.getAttribute("CommentDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("CommentDAO", new CommentDAO(contextPath));
		}
	}
	
	@GET
	@Path("/getRateableAgencies/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<RentalAgency> getRateableAgencies(@PathParam("username") String username){
		RentalAgencyDAO rentalAgencyDAO = (RentalAgencyDAO) ctx.getAttribute("RentalAgencyDAO");
		OrderDAO orderDAO = (OrderDAO) ctx.getAttribute("OrderDAO");
		LocationDAO locationDAO = (LocationDAO) ctx.getAttribute("LocationDAO");
		Collection<RentalAgency> retAgencies = new ArrayList<RentalAgency>();
		
		for (Order o : orderDAO.getAll()) {
			if(o.getUsername().equals(username) && o.getStatus().toString().equals(Status.RETURNED.toString())) {
				RentalAgency r = rentalAgencyDAO.getById(o.getAgency_id());
				r.setLocation(locationDAO.GetById(r.getLocation().getId()));
				
				retAgencies.add(r);
			}
		}
		return retAgencies;
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
	
	@PUT
	@Path("/updateRating/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void updateRating(@PathParam("id")int id) {
		
		RentalAgencyDAO dao = (RentalAgencyDAO) ctx.getAttribute("RentalAgencyDAO");
		CommentDAO commentDAO=(CommentDAO) ctx.getAttribute("CommentDAO");
		double rating=0;
		int i=0;
		for(Comment com : commentDAO.getAll()) {
			if(com.getAgency().getId()==id && com.getIs_rated()==CommentStatus.APPROVED) {
				rating+=com.getRating();
				i++;
			}
		}
		if(i==0)rating=0;
		else {
			rating=rating/i;
		}
		dao.updateRating(id,rating);
		
	}
	
}
