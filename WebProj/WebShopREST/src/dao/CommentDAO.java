package dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import model.Comment;





public class CommentDAO {
	private List<Comment> comments=new ArrayList<Comment>();
	private String csvFilePath;
	public CommentDAO() {
		
	}
	/*
	 * @param contextPath
	 */
	public CommentDAO(String contextPath) {
		this.csvFilePath = contextPath.replace("\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\WebShopREST\\", "\\WebProj\\WebShopREST\\WebContent\\data\\comments.csv");
		loadAll();
	}
	public Collection<Comment> getAll() {
		return comments;
	}
	
	public List<Comment> loadAll() {return null;}
	public void saveAll() {}
}
