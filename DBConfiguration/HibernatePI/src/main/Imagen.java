package main;

public class Imagen {
	private Integer id;
	private String imageName;
	private String theme;
	private Integer difficulty;
	private String link;

	public Imagen(Integer id, String imageName, String theme, Integer difficulty, String link) {
		this.id = id;
		this.imageName = imageName;
		this.theme = theme;
		this.difficulty = difficulty;
		this.link = link;
	}

	public Imagen(String imageName, String theme, Integer difficulty, String link) {
		this.imageName = imageName;
		this.theme = theme;
		this.difficulty = difficulty;
		this.link = link;
	}

	public Imagen() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public String getTheme() {
		return theme;
	}

	public void setTheme(String theme) {
		this.theme = theme;
	}

	public Integer getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(Integer difficulty) {
		this.difficulty = difficulty;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}
}
