package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;


import dao.CommentDAO;
import dao.UserDAO;
import model.Comment;
import model.User;

@Path("/comments")
public class CommentService {
	@Context
	ServletContext ctx;

	public CommentService() {
		
	}
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("CommentDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("CommentDAO", new CommentDAO(contextPath));
		}
	}
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Comment> login() {
		CommentDAO dao = (CommentDAO) ctx.getAttribute("CommentDAO");
		return dao.getAll();
		
		
	}
}
