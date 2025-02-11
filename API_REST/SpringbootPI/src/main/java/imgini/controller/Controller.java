package imgini.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

import imgini.model.Attempt;
import imgini.model.AttemptHistory;
import imgini.model.AttemptInfo;
import imgini.model.Imagen;
import imgini.model.Ranking;
import imgini.model.User;
import imgini.model.UserDTO;
import imgini.model.UserInfo;
import imgini.model.UserPUT;
import imgini.model.UserRanking;
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

	@GetMapping("imgini/dailyImage")
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

	@GetMapping("imgini/getImage")
	public ResponseEntity<Resource> getImage(@RequestParam(value = "name") String imgName,
			@RequestParam(value = "token") String userToken) {
		if (!Utilities.checkUser(tokens, userToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

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

	@GetMapping("imgini/ranking")
	ResponseEntity<Object> getRanking(@RequestParam(value = "token") String userToken,
			@RequestParam(value = "page") int page, @RequestParam(value = "size") int size) {
		if (!Utilities.checkUser(tokens, userToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		if (page <= 0) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}

		Pageable pageable = PageRequest.of(page - 1, size, Sort.by("points").descending());
		Page<User> usersPage = userRepository.findAll(pageable);
		ArrayList<UserRanking> usersRanking = new ArrayList<UserRanking>();

		for (User user : usersPage.getContent()) {
			usersRanking.add(new UserRanking(user.getUsername(), user.getPoints(), user.getProfilePicture()));
		}

		Ranking ranking = new Ranking(page, usersPage.getTotalPages(), usersPage.hasPrevious(), usersPage.hasNext(),
				usersRanking);

		return ResponseEntity.status(HttpStatus.OK).body(ranking);
	}

	@GetMapping("imgini/userInfo")
	ResponseEntity<Object> userInfo(@RequestParam(value = "token") String userToken,
			@RequestParam(value = "username") String username, @RequestParam(value = "password") String password) {
		if (!Utilities.checkUser(tokens, userToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		Optional<User> user = userRepository.findByUserAndPassword(username, password);
		UserInfo userInfo = new UserInfo(username, password, user.get().getProfilePicture(),
				"http://localhost:8080/imgini/streak?token=" + userToken + "&user=" + username + "&page=1&size=10");

		return ResponseEntity.status(HttpStatus.OK).body(userInfo);
	}

	@GetMapping("imgini/streak")
	ResponseEntity<Object> streak(@RequestParam(value = "token") String userToken,
			@RequestParam(value = "username") String username, @RequestParam(value = "page") int page,
			@RequestParam(value = "size") int size) {
		if (!Utilities.checkUser(tokens, userToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		if (page <= 0) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
		
		Pageable pageable = PageRequest.of(page - 1, size, Sort.by("attemptDate").descending());
		Page<Attempt> attemptPage = attemptRepository.findAll(pageable);
		ArrayList<AttemptInfo> attempts = new ArrayList<AttemptInfo>();

		for (Attempt att : attemptPage.getContent()) {
			List<Imagen> selectedImg = imagenRepository.getImgById(att.getImageId() + 1);
			attempts.add(new AttemptInfo(selectedImg.get(0).getImageName(), att.getAttemptDate(), att.getTries()));
		}

		AttemptHistory attHistory = new AttemptHistory(page, attemptPage.getTotalPages(), attemptPage.hasPrevious(), attemptPage.hasNext(),
				5, attempts);

		return ResponseEntity.status(HttpStatus.OK).body(attHistory);		
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
			String uuid = UUID.randomUUID().toString();
			String token = uuid.split("-")[0];
			tokens.add(token);
			return ResponseEntity.status(HttpStatus.OK).body(token);
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

		Optional<User> userOptional = userRepository.getUserByName(updatedUser.getOldName());
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			user.setUsername(updatedUser.getNewName());
			user.setPassword(updatedUser.getPassword());
			user.setProfilePicture(updatedUser.getProfilePicture());

			userRepository.save(user);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
}
