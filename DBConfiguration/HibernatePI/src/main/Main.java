package main;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.Serializable;
import java.nio.file.Files;
import java.util.Base64;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JOptionPane;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;

public class Main {
	private static final String rutaJsonImgs = "resources/imgJson.json";
	private static Session session;

	private static void insertImages() throws Exception {
		session.beginTransaction();
		JSONTokener jsonToken = new JSONTokener(new FileReader(rutaJsonImgs));
		JSONArray jsonArray = new JSONArray(jsonToken);
		for (int i = 0; i < jsonArray.length(); i++) {
			JSONObject jsonImage = jsonArray.getJSONObject(i);
			Imagen img = new Imagen(jsonImage.getString("imageName"), jsonImage.getString("theme"),
					jsonImage.getInt("difficulty"), jsonImage.getString("link"));
			Serializable id = session.save(img);
		}
		session.getTransaction().commit();
		session.clear();
	}

	private static void showImage() throws Exception {
		session.beginTransaction();
		Random r = new Random();
		int low = 1;
		int high = 34;
		int result = r.nextInt(high-low) + low;
		
		Imagen imgId = (Imagen) session.get(Imagen.class, result);
		File imgFile = new File(imgId.getLink());
		byte[] fileContent = Files.readAllBytes(imgFile.toPath());
		String encodedString = Base64.getEncoder().encodeToString(fileContent);
		ImageIcon icona = base64ToImageIcon(encodedString, -1, -1);
		JOptionPane.showMessageDialog(null, "Imatge nº" + result, "Tarjeta de la imatge", JOptionPane.INFORMATION_MESSAGE, icona);
		session.getTransaction().commit();
		session.clear();
	}
	
	private static ImageIcon base64ToImageIcon(String base64, int buttonWidth, int buttonHeight) {
		try {
			byte[] imageBytes = Base64.getDecoder().decode(base64);
			ByteArrayInputStream bis = new ByteArrayInputStream(imageBytes);
			BufferedImage image = ImageIO.read(bis);
			bis.close();			
			Image resizedImg = image.getScaledInstance(buttonWidth, buttonHeight, Image.SCALE_SMOOTH);
			ImageIcon imgIcon = new ImageIcon(resizedImg);
			return imgIcon;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static void main(String[] args) {
		try {
			Configuration configuration = new Configuration().configure("hibernate.cfg.xml");
			configuration.addClass(Imagen.class);
			StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
					.applySettings(configuration.getProperties()).build();
			SessionFactory sessionFactory = configuration.buildSessionFactory(registry);

			session = sessionFactory.openSession();
			insertImages();
			// showImage();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
