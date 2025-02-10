package imgini.model;

public class UserRanking {
	private String username;
	private int points;
	private String profilePicture;

	public UserRanking(String username, int points, String profilePicture) {
		this.username = username;
		this.points = points;
		this.profilePicture = profilePicture;
	}

	public UserRanking() {

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

}
