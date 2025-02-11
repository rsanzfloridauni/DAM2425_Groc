package imgini.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "attempt")
public class Attempt {

	@Id
	private Integer id;
	private Integer userId;
	private Integer imageId;
	private String attemptDate;
	private int tries;

	public Attempt(Integer id, Integer userId, Integer imageId, String attemptDate, int tries) {
		this.id = id;
		this.userId = userId;
		this.imageId = imageId;
		this.attemptDate = attemptDate;
		this.tries = tries;
	}
	
	public Attempt() {
		
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getImageId() {
		return imageId;
	}

	public void setImageId(Integer imageId) {
		this.imageId = imageId;
	}

	public String getAttemptDate() {
		return attemptDate;
	}

	public void setAttemptDate(String attemptDate) {
		this.attemptDate = attemptDate;
	}

	public int getTries() {
		return tries;
	}

	public void setTries(int tries) {
		this.tries = tries;
	}
}
