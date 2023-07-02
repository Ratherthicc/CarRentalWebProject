package services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import dao.OrderDAO;
import dao.UserDAO;
import model.Order;
import model.User;

@Path("/users")
public class UserService {
	@Context
	ServletContext ctx;

	public UserService() {
		
	}
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("UserDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("UserDAO", new UserDAO(contextPath));
		}
		if (ctx.getAttribute("OrderDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("OrderDAO", new OrderDAO(contextPath));
		}
	}
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> login() {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		return dao.getAll();
		
		
	}
	@GET
	@Path("/getBuyers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getBuyers() {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		return dao.getBuyers();
		
		
	}
	@GET
	@Path("/getManagers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getManagers() {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		
		
		
		return dao.getManagers();
		
		
	}
	@GET
	@Path("/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public User findu(@PathParam("username") String us) {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		return dao.findUserByUsername(us);
		
		
	}
	
	@GET
	@Path("/login/{username}/{password}")
	@Produces(MediaType.APPLICATION_JSON)
	public User find(@PathParam("username") String us,@PathParam("password") String pas) {
		UserDAO dao = (UserDAO)ctx.getAttribute("UserDAO");
		
		return dao.findUser(us,pas);

	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public User nesto(User u) {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		return dao.addUser(u);
		
		
	}
	
	@PUT
	@Path("/updateUser/")
	@Produces(MediaType.APPLICATION_JSON)
	public User nesto2(User u) {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		return dao.updateUser(u);
		
		
	}
	
	@PUT
	@Path("/updatePoints/{username}/{points}")
	@Produces(MediaType.APPLICATION_JSON)
	public User nesto2(@PathParam("points")double points,@PathParam("username")String username) {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		return dao.updatePoints(username,points);
		
	}
	
	@PUT
	@Path("/updateAgencyId/{username}/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public User updateAgencyId(@PathParam("id")int id,@PathParam("username")String username) {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		return dao.updateAgencyId(username,id);
		
	}
	
	@GET
	@Path("/purchasersFrom/{rentalAgencyId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getPurchasersByRentalId(@PathParam("rentalAgencyId") int rentalAgencyId){
		UserDAO userDAO = (UserDAO) ctx.getAttribute("UserDAO");
		OrderDAO orderDAO = (OrderDAO) ctx.getAttribute("OrderDAO");
		Collection<User> purchasers = new ArrayList<User>();
		
		for (Order order : orderDAO.getAll()) {
			if(rentalAgencyId == order.getAgency_id()) {
				purchasers.add(userDAO.findUserByUsername(order.getUsername()));
			}
		}
		return purchasers;
	}
	
}
	
	

