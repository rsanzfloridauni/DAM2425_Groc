package imgini.model;

public class UserInfo {
	private String username;
	private String password;
	private String profilePicture;
	private String streakLink;
	
	public UserInfo(String username, String password, String profilePicture, String streakLink) {
		this.username = username;
		this.password = password;
		this.profilePicture = profilePicture;
		this.streakLink = streakLink;
	}
	
	public UserInfo() {
		
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

	public String getProfilePicture() {
		return profilePicture;
	}

	public void setProfilePicture(String profilePicture) {
		this.profilePicture = profilePicture;
	}

	public String getStreakLink() {
		return streakLink;
	}

	public void setStreakLink(String streakLink) {
		this.streakLink = streakLink;
	}
}
