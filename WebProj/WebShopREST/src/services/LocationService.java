package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import dao.CommentDAO;
import dao.LocationDAO;
import model.Comment;
import model.Location;
@Path("/locations")
public class LocationService {
	@Context
	ServletContext ctx;

	public LocationService() {
		
	}
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("LocationDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("LocationDAO", new LocationDAO(contextPath));
		}
	}
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Location> login() {
		LocationDAO dao = (LocationDAO) ctx.getAttribute("LocationDAO");
		return dao.getAll();
		
		
	}
	
}
