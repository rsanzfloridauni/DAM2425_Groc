package imgini.model.dto;

public class UserInfo {
	private Integer id;
	private String username;
	private String password;
	private Integer points;
	private String profilePicture;
	private String extension;
	private String streakLink;

	public UserInfo(Integer id, String username, String password, Integer points, String profilePicture, String extension, String streakLink) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.points = points;
		this.profilePicture = profilePicture;
		this.extension = extension;
		this.streakLink = streakLink;
	}

	public UserInfo() {

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

	public String getExtension() {
		return extension;
	}

	public void setExtension(String extension) {
		this.extension = extension;
	}

	public String getStreakLink() {
		return streakLink;
	}

	public void setStreakLink(String streakLink) {
		this.streakLink = streakLink;
	}
}
