package imgini.model;

public class UserPUT {
	private String username;
	private String password;
	private Integer points;
	private String profilePicture;
	
	public UserPUT(String username, String password, Integer points, String profilePicture) {
		super();
		this.username = username;
		this.password = password;
		this.points = points;
		this.profilePicture = profilePicture;
	}
	
	public UserPUT() {
		
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getPoints() {
		return points;
	}

	public void setPoints(Integer points) {
		this.points = points;
	}

	public String getProfilePicture() {
		return profilePicture;
	}

	public void setProfilePicture(String profilePicture) {
		this.profilePicture = profilePicture;
	}
	
}
