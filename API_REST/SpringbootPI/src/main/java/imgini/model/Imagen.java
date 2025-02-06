package imgini.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "image")
public class Imagen {
	
	@Id
	private String _id;
	private Integer id;
	private String imageName;
	private String theme;
	private Integer difficulty;
	private String link;

	public Imagen(String _id, Integer id, String imageName, String theme, Integer difficulty, String link) {
		this._id = _id;
		this.id = id;
		this.imageName = imageName;
		this.theme = theme;
		this.difficulty = difficulty;
		this.link = link;
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