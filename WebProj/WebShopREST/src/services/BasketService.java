package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import dao.BasketDAO;
import dao.UserDAO;
import model.Basket;
import model.User;

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
	}
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Basket> getBaskets() {
		BasketDAO dao = (BasketDAO) ctx.getAttribute("BasketDAO");
		return dao.getAll();
		
		
	}
}
