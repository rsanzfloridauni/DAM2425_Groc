package main;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

public class Main {

	public static void main(String[] args) {
		try {
			List<Map<String, Object>> images = new ArrayList<>();
			File imgsDir = new File("resources/images");
			ArrayList<String> idNames = extractImgsNames(new File("resources/imgNames.txt"));
			Integer currentIndex = 0;

			for (File subDir : imgsDir.listFiles()) {
				File[] imgs = subDir.listFiles();
				String theme = subDir.getName();
				for (int i = 0; i < imgs.length; i++) {
					Map<String, Object> jsonData = new LinkedHashMap<>();
					String[] imgData = idNames.get(currentIndex).split(":");
					jsonData.put("id", Integer.parseInt(imgData[0]));
					jsonData.put("imageName", imgData[1]);
					jsonData.put("theme", theme);
					jsonData.put("difficulty", Integer.parseInt(imgData[2]));
					jsonData.put("imgBase64", imgTo64(imgs[i]));
					jsonData.put("extension", imgs[i].getName().substring(imgs[i].getName().indexOf('.') + 1));
					images.add(jsonData);
					currentIndex++;
				}
			}

			ObjectMapper mapper = new ObjectMapper();
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            mapper.writeValue(new File("resources/imgDb.json"), images);
            
            System.out.println("JSON generado correctamente.");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static ArrayList<String> extractImgsNames(File imgsNames) {
		try {
			ArrayList<String> names = new ArrayList<String>();
			FileReader fr = new FileReader(imgsNames);
			BufferedReader br = new BufferedReader(fr);
			String linea = br.readLine();
			while (linea != null) {
				names.add(linea);
				linea = br.readLine();
			}
			return names;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	public static String imgTo64(File img) throws IOException {
		byte[] fileContent = Files.readAllBytes(img.toPath());
		String encodedString = Base64.getEncoder().encodeToString(fileContent);
		return encodedString;
	}

}
