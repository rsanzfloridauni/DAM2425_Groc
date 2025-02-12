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
	private String imgBase64;
	private String extension;

	public Imagen(String _id, Integer id, String imageName, String theme, Integer difficulty, String imgBase64,
			String extension) {
		this._id = _id;
		this.id = id;
		this.imageName = imageName;
		this.theme = theme;
		this.difficulty = difficulty;
		this.imgBase64 = imgBase64;
		this.extension = extension;
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

	public String getimgBase64() {
		return imgBase64;
	}

	public void setimgBase64(String imgBase64) {
		this.imgBase64 = imgBase64;
	}

	public String getExtension() {
		return extension;
	}

	public void setExtension(String extension) {
		this.extension = extension;
	}
}