package imgini.model.dto;

public class AttemptDTO {
	private Integer userId;
	private Integer imageId;
	private String attemptDate;
	private Integer tries;
	private boolean success;

	public AttemptDTO(Integer userId, Integer imageId, String attemptDate, Integer tries, boolean success) {
		this.userId = userId;
		this.imageId = imageId;
		this.attemptDate = attemptDate;
		this.tries = tries;
		this.success = success;
	}

	public AttemptDTO() {
		
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
