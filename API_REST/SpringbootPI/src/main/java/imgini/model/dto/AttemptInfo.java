package imgini.model.dto;

public class AttemptInfo {
	private String imageName;
	private String attemptDate;
	private int tries;
	private boolean success;

	public AttemptInfo(String imageName, String attemptDate, int tries, boolean success) {
		super();
		this.imageName = imageName;
		this.attemptDate = attemptDate;
		this.tries = tries;
		this.success = success;
	}

	public AttemptInfo() {

	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
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

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
}
