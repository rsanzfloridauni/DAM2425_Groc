package imgini.model;

public class AttemptInfo {
	private String imageName;
	private String attemptDate;
	private int tries;

	public AttemptInfo(String imageName, String attemptDate, int tries) {
		super();
		this.imageName = imageName;
		this.attemptDate = attemptDate;
		this.tries = tries;
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
}
