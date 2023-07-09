package model;

public class Comment {
	private User buyer;
	private RentalAgency agency;
	private String text;
	private int rating;
	private CommentStatus is_rated;
	
	public enum CommentStatus{
		APPROVED,
		REJECTED,
		ON_HOLD
	};
	
	public Comment() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Comment(String username, int agencyId, String text, int rating, CommentStatus is_rated) {
		super();
		this.buyer = new User();
		this.buyer.setUsername(username);
		this.agency = new RentalAgency();
		this.agency.setId(agencyId);
		this.text = text;
		this.rating = rating;
		this.is_rated = is_rated;
	}
	
	public boolean equals(Comment c) {
		//bez poredjenja po statusu!
		return (c.getAgency().getId() == this.agency.getId()
				&& c.getBuyer().getUsername().equals(this.getBuyer().getUsername())
				&& c.getText().equals(this.getText())
				&& c.getRating() == this.getRating());
	}
	
	public CommentStatus getIs_rated() {
		return is_rated;
	}
	public void setIs_rated(CommentStatus is_rated) {
		this.is_rated = is_rated;
	}
	public User getBuyer() {
		return buyer;
	}
	public void setBuyer(User buyer) {
		this.buyer = buyer;
	}
	public RentalAgency getAgency() {
		return agency;
	}
	public void setAgency(RentalAgency agency) {
		this.agency = agency;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public int getRating() {
		return rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	
	
}
