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
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import dao.UserDAO;
import model.User;

@Path("/users")
public class UserService {
	@Context
	ServletContext ctx;

	public UserService() {
		
	}
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("UserDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("UserDAO", new UserDAO(contextPath));
		}
	}
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> login() {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		return dao.getAll();
		
		
	}
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public User nesto(User u) {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		return dao.addUser(u);
		
		
	}
}
	
	

