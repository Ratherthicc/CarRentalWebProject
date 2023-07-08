package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import model.Comment;
import model.Comment.CommentStatus;
import model.Location;
import model.User;





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
		loadAll();
		return comments;
	}
	public void update(Comment comment) {
		loadAll();
		for (int i = 0; i < comments.size(); i++) {
            if (comments.get(i).equals(comment)) {
            	comments.set(i, comment);
            	saveAll();
                break;
            }
        }
	}
	public void addComment(Comment comment) {
		loadAll();
		comments.add(comment);
		saveAll();
	}
	public List<Comment> getAllByAgencyId(int agencyId) {
		loadAll();
		List<Comment> retComments=new ArrayList<Comment>();
		for (Comment comment : comments) {
			if(comment.getAgency().getId() == agencyId) {
				retComments.add(comment);
			}
		}
		return retComments;
	}
	
	public List<Comment> loadAll() {
		String row;
		try (BufferedReader csvReader = new BufferedReader(new FileReader(csvFilePath))){
			comments.clear();
			while ((row = csvReader.readLine()) != null) {    
				String[] data=row.split(",");
				
				Comment comment=new Comment(
											data[0], // username
											Integer.parseInt(data[1]), // agencyId
											data[2], // text
											Integer.parseInt(data[3]), // rating
											data[4].equals("APPROVED") ? // is_rated
												CommentStatus.APPROVED : 
												(data[4].equals("REJECTED") ? CommentStatus.REJECTED :CommentStatus.ON_HOLD)
										   );
				comments.add(comment);
			}
			csvReader.close();
		}
		catch (Exception e) {
			return null;
		}
	
		return comments;
	}
	public void saveAll() {
		try (BufferedWriter writer = new BufferedWriter(new FileWriter(csvFilePath))) {
			
			StringBuilder line = new StringBuilder();
			for(Comment comment : comments) {
				
				line.append(comment.getBuyer().getUsername());
				line.append(",");
				line.append(comment.getAgency().getId());
				line.append(",");
				line.append(comment.getText());
				line.append(",");
				line.append(comment.getRating());
				line.append(",");
				line.append(comment.getIs_rated().toString());
				line.append("\n");
				
			}
			writer.write(line.toString());
			writer.close();
        } catch (IOException e) {
            System.err.println("Error writing to CSV file: " + e.getMessage());
        }
	}
}
