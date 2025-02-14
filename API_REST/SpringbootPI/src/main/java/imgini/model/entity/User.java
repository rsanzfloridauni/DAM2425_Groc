package imgini.model.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Document(collection = "user")
public class User {

	@Id
	@JsonIgnore
	private String _id;
	private Integer id;
	private String username;
	private String password;
	private Integer points;
	private String profilePicture;
	private String extension;

	public User(String _id, Integer id, String username, String password, Integer points, String profilePicture, String extension) {
		this._id = _id;
		this.id = id;
		this.username = username;
		this.password = password;
		this.points = points;
		this.profilePicture = profilePicture;
		this.extension = extension;
	}

	public User(Integer id, String username, String password) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.points = 0;
		this.profilePicture = "";
		this.extension = "";
	}
	
	public User() {
		
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
}
