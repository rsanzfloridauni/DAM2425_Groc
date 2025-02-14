package imgini.model.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "attempt")
public class Attempt {

	@Id
	private String _id;
	private Integer id;
	private Integer userId;
	private Integer imageId;
	private String attemptDate;
	private Integer tries;
	private boolean success;

	public Attempt(String _id, Integer id, Integer userId, Integer imageId, String attemptDate, Integer tries,
			boolean success) {
		this._id = _id;
		this.id = id;
		this.userId = userId;
		this.imageId = imageId;
		this.attemptDate = attemptDate;
		this.tries = tries;
		this.success = success;
	}

	public Attempt(Integer id, Integer userId, Integer imageId, String attemptDate, Integer tries, boolean success) {
		this.id = id;
		this.userId = userId;
		this.imageId = imageId;
		this.attemptDate = attemptDate;
		this.tries = tries;
		this.success = success;
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

	public Integer getTries() {
		return tries;
	}

	public void setTries(Integer tries) {
		this.tries = tries;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
}
