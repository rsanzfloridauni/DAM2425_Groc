package imgini.model;

import java.util.ArrayList;

public class AttemptHistory {
	private int currentPage;
	private int numPages;
	private boolean previousPage;
	private boolean nextPage;
	private int currentStreak;
	private ArrayList<AttemptInfo> attempts;

	public AttemptHistory(int currentPage, int numPages, boolean previousPage, boolean nextPage, int currentStreak,
			ArrayList<AttemptInfo> attempts) {
		this.currentPage = currentPage;
		this.numPages = numPages;
		this.previousPage = previousPage;
		this.nextPage = nextPage;
		this.currentStreak = currentStreak;
		this.attempts = attempts;
	}

	public AttemptHistory() {

	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public int getNumPages() {
		return numPages;
	}

	public void setNumPages(int numPages) {
		this.numPages = numPages;
	}

	public boolean isPreviousPage() {
		return previousPage;
	}

	public void setPreviousPage(boolean previousPage) {
		this.previousPage = previousPage;
	}

	public boolean isNextPage() {
		return nextPage;
	}

	public void setNextPage(boolean nextPage) {
		this.nextPage = nextPage;
	}

	public int getCurrentStreak() {
		return currentStreak;
	}

	public void setCurrentStreak(int currentStreak) {
		this.currentStreak = currentStreak;
	}

	public ArrayList<AttemptInfo> getAttempts() {
		return attempts;
	}

	public void setAttempts(ArrayList<AttemptInfo> attempts) {
		this.attempts = attempts;
	}
}
