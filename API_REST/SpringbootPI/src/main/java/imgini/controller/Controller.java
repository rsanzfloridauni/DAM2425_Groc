package imgini.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import imgini.model.Imagen;
import imgini.model.User;
import imgini.model.UserDTO;
import imgini.model.UserPUT;
import imgini.model.Utilities;
import imgini.repository.AttemptRepository;
import imgini.repository.ImagenRepository;
import imgini.repository.UserRepository;

@RestController
public class Controller {
	private ArrayList<String> tokens = new ArrayList<String>();

	@Autowired
	private AttemptRepository attemptRepository;

	@Autowired
	private ImagenRepository imagenRepository;

	@Autowired
	private UserRepository userRepository;

	@GetMapping("imgini/getImage")
	public ResponseEntity<Object> viewImages(@RequestParam(value = "token") String userToken) {
		if (!Utilities.checkUser(tokens, userToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

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
	public ResponseEntity<Resource> getImage(@RequestParam(value = "name") String imgName,
			@RequestParam(value = "token") String userToken) {
		if (!Utilities.checkUser(tokens, userToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		Resource resource = new ClassPathResource(
				"static" + System.lineSeparator() + "imgs" + System.lineSeparator() + imgName);
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

	@GetMapping("imgini/logout")
	ResponseEntity<Object> logout(@RequestParam(value = "token") String userToken) {
		try {
			tokens.remove(Utilities.findToken(tokens, userToken));
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} catch (Exception ex) {
			ex.printStackTrace();
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@GetMapping("imgini/getUserData")
	ResponseEntity<Object> getUserData(@RequestParam(value = "name") String userName,
			@RequestParam(value = "token") String userToken) {
		if (!Utilities.checkUser(tokens, userToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		Optional<User> user = userRepository.getUserByName(userName);

		if (user.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK).body(user.get());
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@PostMapping("imgini/register")
	ResponseEntity<Object> register(@RequestBody UserDTO userDTO) {
		List<User> allUsers = userRepository.findAll();
		boolean alreadyExists = false;
		for (User user : allUsers) {
			if (user.getUsername().equals(userDTO.getUsername())) {
				alreadyExists = true;
				break;
			}
		}
		if (alreadyExists) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		} else {
			userRepository.save(new User(userDTO.getUsername(), userDTO.getPassword()));
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
	}

	@PostMapping("imgini/login")
	ResponseEntity<Object> login(@RequestBody UserDTO userDTO) {
		Optional<User> user = userRepository.findByUserAndPassword(userDTO.getUsername(), userDTO.getPassword());
		if (user.isPresent()) {
			String uuid = UUID.randomUUID().toString();
			String token = uuid.split("-")[0];
			tokens.add(token);
			return ResponseEntity.status(HttpStatus.OK).body(token);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@DeleteMapping("imgini/delete")
	public ResponseEntity<String> deleteUser(@RequestParam(value = "name") String name,
			@RequestParam(value = "password") String password, @RequestParam(value = "token") String userToken) {
		if (!Utilities.checkUser(tokens, userToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		Optional<User> user = userRepository.findByUserAndPassword(name, password);
		if (user.isPresent()) {
			userRepository.delete(user.get());
			tokens.remove(Utilities.findToken(tokens, userToken));
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@PutMapping("imgini/update")
	public ResponseEntity<String> updateUser(@RequestParam(value = "token") String userToken,
			@RequestBody UserPUT updatedUser) {
		if (!Utilities.checkUser(tokens, userToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		Optional<User> userOptional = userRepository.getUserByName(updatedUser.getUsername());
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			user.setPassword(updatedUser.getPassword());
			user.setPoints(updatedUser.getPoints());
			user.setProfilePicture(updatedUser.getProfilePicture());

			userRepository.save(user);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
}
