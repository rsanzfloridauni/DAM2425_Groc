package imgini.controller;

import java.util.ArrayList;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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

	@GetMapping("imgini/images")
	public ResponseEntity<Object> viewImages() {
		Random r = new Random();
		int low = 1;
		int high = 34;
		int result = r.nextInt(high - low) + low;
		Optional<Imagen> img = imagenRepository.findById(String.valueOf(result));

		if (img.isPresent()) {
			return new ResponseEntity<>(img.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Imagen no encontrada", HttpStatus.NOT_FOUND);
		}
	}
}
