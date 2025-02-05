package imgini.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
public class User {

	@Id
	private String _id;
	private String username;
	private String password;
	private Integer points;
	private String profilePicture;

	public User(String _id, String username, String password, Integer points, String profilePicture) {
		this._id = _id;
		this.username = username;
		this.password = password;
		this.points = points;
		this.profilePicture = profilePicture;
	}

	public User(String username, String password) {
		this.username = username;
		this.password = password;
		this.points = 0;
		this.profilePicture = "";
	}
	
	public User() {
		
	}

	public String getId() {
		return _id;
	}

	public void setId(String id) {
		this._id = id;
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
