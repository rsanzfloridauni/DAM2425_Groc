package imgini.model.dto;

public class UserRanking {
	private Integer id;
	private String username;
	private int points;
	private String profilePicture;
	private String extension;

	public UserRanking(Integer id, String username, int points, String profilePicture, String extension) {
		this.id = id;
		this.username = username;
		this.points = points;
		this.profilePicture = profilePicture;
		this.extension = extension;
	}

	public UserRanking() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

	public String getProfilePicture() {
		return profilePicture;
	}

	public void setProfilePicture(String profilePicture) {
		this.profilePicture = profilePicture;
	}

	public String getExtension() {
		return extension;
	}

	public void setExtension(String extension) {
		this.extension = extension;
	}

}
