package imgini.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import imgini.model.Imagen;
import imgini.repository.AttemptRepository;
import imgini.repository.ImagenRepository;
import imgini.repository.UserRepository;

@RestController
public class Controller {
	@Autowired
	private AttemptRepository attemptRepository;

	@Autowired
	private ImagenRepository imagenRepository;

	@Autowired
	private UserRepository userRepository;

	@GetMapping("imgini/getImage")
	public ResponseEntity<Object> viewImages() {
		long totalImages = imagenRepository.count();
		LocalDate today = LocalDate.now();
		long index = (today.getDayOfMonth() + today.getMonthValue() * 31 + today.getYear() * 365) % totalImages;

		List<Imagen> selectedImg = imagenRepository.getImgById(index + 1);

		if (selectedImg.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No hay imágenes en la base de datos.");
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(selectedImg.get(0));
		}
	}

	@GetMapping("imgini/image")
	public ResponseEntity<Resource> getImage(@RequestParam(value = "name") String imgName) {
		Resource resource = new ClassPathResource("static/imgs/" + imgName);
		if (resource.isFile()) {
			if (resource.getFilename().contains("png")) {
				return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.IMAGE_PNG).body(resource);
			} else {
				return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.IMAGE_JPEG).body(resource);
			}
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
}
