package imgini.model;

import java.util.ArrayList;

public class Ranking {
	private int currentPage;
	private int numPages;
	private boolean previousPage;
	private boolean nextPage;
	private ArrayList<UserRanking> users;
	
	public Ranking(int currentPage, int numPages, boolean previousPage, boolean nextPage,
			ArrayList<UserRanking> users) {
		this.currentPage = currentPage;
		this.numPages = numPages;
		this.previousPage = previousPage;
		this.nextPage = nextPage;
		this.users = users;
	}
	
	public Ranking() {
		
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

	public ArrayList<UserRanking> getUsers() {
		return users;
	}

	public void setUsers(ArrayList<UserRanking> users) {
		this.users = users;
	}
}
