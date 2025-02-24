package imgini.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import imgini.model.Utilities;
import imgini.model.dto.AttemptDTO;
import imgini.model.dto.AttemptHistory;
import imgini.model.dto.AttemptInfo;
import imgini.model.dto.Ranking;
import imgini.model.dto.ThemeGroup;
import imgini.model.dto.UserDTO;
import imgini.model.dto.UserInfo;
import imgini.model.dto.UserPUT;
import imgini.model.dto.UserRanking;
import imgini.model.entity.Attempt;
import imgini.model.entity.Imagen;
import imgini.model.entity.User;
import imgini.repository.AttemptRepository;
import imgini.repository.ImagenRepository;
import imgini.repository.UserRepository;

@RestController
public class Controller {
	/**
	 * ArrayList where active user's tokens will be stored
	 */
	private ArrayList<String> tokens = new ArrayList<String>();

	/**
	 * Repository where the queries that interact with the attempt collection are
	 * stored
	 */
	@Autowired
	private AttemptRepository attemptRepository;

	/**
	 * Repository where the queries that interact with the image collection are
	 * stored
	 */
	@Autowired
	private ImagenRepository imagenRepository;

	/**
	 * Repository where the queries that interact with the user collection are
	 * stored
	 */
	@Autowired
	private UserRepository userRepository;

	/**
	 * @param userToken Token that will authenticate the user
	 * @return A JSON following the structure of the object Imagen with data about
	 *         today's image
	 */
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

	/**
	 * @param userToken Token that will authenticate the user
	 * @param imgTheme  String with the theme of the image to be retrieved
	 * @return A JSON following the structure of the object Imagen with data about a
	 *         randomly selected image from the database, matching the specified
	 *         theme
	 */
	@GetMapping("imgini/infiniteImage")
	public ResponseEntity<Object> infiniteImage(@RequestParam(value = "token") String userToken,
			@RequestParam(value = "theme") String imgTheme) {
		if (!Utilities.checkUser(tokens, userToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		List<Imagen> themeImgs = imagenRepository.getImgByTheme(imgTheme);
		if (themeImgs.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There are no images of this theme.");
		} else {
			Random r = new Random();
			int result = r.nextInt(themeImgs.size() - 0) + 0;
			return ResponseEntity.status(HttpStatus.OK).body(themeImgs.get(result));
		}
	}

	/**
	 * @param userToken Token that will authenticate the user
	 * @return Nothing, HTTPStatus NO_CONTENT if successfully logged out, or
	 *         HTTPStatus NOT_FOUND if couldn't find user
	 */
	@GetMapping("imgini/logout")
	public ResponseEntity<Object> logout(@RequestParam(value = "token") String userToken) {
		try {
			tokens.remove(Utilities.findToken(tokens, userToken));
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} catch (Exception ex) {
			ex.printStackTrace();
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	/**
	 * @param userToken Token that will authenticate the user
	 * @param page      Page number to show
	 * @param size      Size of the user array
	 * @return A JSON following the structure of the object ranking, with pagination
	 *         included to limit the number of displayed users per page
	 */
	@GetMapping("imgini/ranking")
	public ResponseEntity<Object> getRanking(@RequestParam(value = "token") String userToken,
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
			usersRanking.add(new UserRanking(user.getId(), user.getUsername(), user.getPoints(),
					user.getProfilePicture(), user.getExtension()));
		}

		Ranking ranking = new Ranking(page, usersPage.getTotalPages(), usersPage.hasPrevious(), usersPage.hasNext(),
				usersRanking);

		return ResponseEntity.status(HttpStatus.OK).body(ranking);
	}

	/**
	 * @param userToken Token that will authenticate the user
	 * @param username  String Name of the user to retrieve info from
	 * @return A JSON following the structure of the object UserInfo, with data
	 *         about the user and a link to the endpoint that displays their streak
	 *         and attempt history
	 */
	@GetMapping("imgini/userInfo")
	public ResponseEntity<Object> userInfo(@RequestParam(value = "token") String userToken,
			@RequestParam(value = "username") String username) {
		if (!Utilities.checkUser(tokens, userToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		Optional<User> user = userRepository.getUserByName(username);
		if (user.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		UserInfo userInfo = new UserInfo(user.get().getId(), username, user.get().getPoints(),
				user.get().getProfilePicture(), user.get().getExtension(),
				"http://localhost:8080/imgini/streak?token=" + userToken + "&username=" + username + "&page=1&size=10");

		return ResponseEntity.status(HttpStatus.OK).body(userInfo);
	}

	/**
	 * @param userToken Token that will authenticate the user
	 * @param username  String Name of the user to retrieve streak from
	 * @param page      Page number to show
	 * @param size      Size of the user array
	 * @return A JSON following the structure of the object AttemptHistory, with
	 *         pagination included to limit the number of attempt registries to show
	 *         per page, and the specified user's current streak
	 */
	@GetMapping("imgini/streak")
	public ResponseEntity<Object> streak(@RequestParam(value = "token") String userToken,
			@RequestParam(value = "username") String username, @RequestParam(value = "page") int page,
			@RequestParam(value = "size") int size) {
		if (!Utilities.checkUser(tokens, userToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		if (page <= 0) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}

		Optional<User> user = userRepository.getUserByName(username);

		if (user.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		Pageable pageable = PageRequest.of(page - 1, size, Sort.by("attemptDate").descending());
		Page<Attempt> attemptPage = attemptRepository.findByUserId(user.get().getId(), pageable);
		ArrayList<AttemptInfo> attempts = new ArrayList<AttemptInfo>();

		for (Attempt att : attemptPage.getContent()) {
			List<Imagen> selectedImg = imagenRepository.getImgById(att.getImageId());
			attempts.add(new AttemptInfo(selectedImg.get(0).getImageName(), att.getAttemptDate(), att.getTries(),
					att.isSuccess()));
		}

		AttemptHistory attHistory = new AttemptHistory(page, attemptPage.getTotalPages(), attemptPage.hasPrevious(),
				attemptPage.hasNext(), Utilities.getStreak(attemptPage), attempts);

		return ResponseEntity.status(HttpStatus.OK).body(attHistory);
	}

	/**
	 * @param userToken Token that will authenticate the user
	 * @return An array of Strings with all the image themes present in the database
	 */
	@GetMapping("imgini/imgsThemes")
	public ResponseEntity<Object> imgsThemes(@RequestParam(value = "token") String userToken) {
		if (!Utilities.checkUser(tokens, userToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		List<ThemeGroup> groups = imagenRepository.findDistinctThemes();
		List<String> themes = groups.stream().map(ThemeGroup::getTheme).collect(Collectors.toList());
		return ResponseEntity.status(HttpStatus.OK).body(themes);
	}

	/**
	 * @param userToken Token that will authenticate the user
	 * @param username  String name of the user to retrieve today's attempt from
	 * @return A JSON following the structure of the object AttemptDTO, with data
	 *         about today's attempt. If the specified user doesn't have an attempt
	 *         today, it returns HttpStatus NOT_FOUND
	 */
	@GetMapping("imgini/getAttempt")
	public ResponseEntity<Object> getAttempt(@RequestParam(value = "token") String userToken,
			@RequestParam(value = "username") String username) {
		if (!Utilities.checkUser(tokens, userToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		Optional<User> user = userRepository.getUserByName(username);
		if (user.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		String date = LocalDate.now().toString();
		Optional<Attempt> attempt = attemptRepository.todaysAtt(user.get().getId(), date);
		if (attempt.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		return ResponseEntity.status(HttpStatus.OK)
				.body(new AttemptDTO(attempt.get().getUserId(), attempt.get().getImageId(),
						attempt.get().getAttemptDate(), attempt.get().getTries(), attempt.get().isSuccess()));
	}

	/**
	 * @param userDTO Object with the new user's username and password
	 * @return HttpStatus FORBIDDEN if the user is already present, or HttpStatus OK
	 *         if created successfully
	 */
	@PostMapping("imgini/register")
	public ResponseEntity<Object> register(@RequestBody UserDTO userDTO) {
		String passwordHash = DigestUtils.sha256Hex(userDTO.getPassword());
		Optional<User> dbUser = userRepository.findByUserAndPassword(userDTO.getUsername(), passwordHash);
		if (dbUser.isPresent()) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		} else {
			Optional<User> lastUser = userRepository.findTopByOrderByIdDesc();
			userRepository.save(new User(lastUser.get().getId() + 1, userDTO.getUsername(), passwordHash));
			String uuid = UUID.randomUUID().toString();
			String token = uuid.split("-")[0];
			tokens.add(token);
			return ResponseEntity.status(HttpStatus.OK).body(token);
		}
	}

	/**
	 * @param userDTO Object with the new user's username and password
	 * @return HttpStatus NOT_FOUND if the user is not present, or HttpStatus OK if
	 *         user is found and credentials match
	 */
	@PostMapping("imgini/login")
	public ResponseEntity<Object> login(@RequestBody UserDTO userDTO) {
		String passwordHash = DigestUtils.sha256Hex(userDTO.getPassword());
		Optional<User> user = userRepository.findByUserAndPassword(userDTO.getUsername(), passwordHash);
		if (user.isPresent()) {
			String uuid = UUID.randomUUID().toString();
			String token = uuid.split("-")[0];
			tokens.add(token);
			return ResponseEntity.status(HttpStatus.OK).body(token);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	/**
	 * @param attemptDTO Object with the attempt info to be created
	 * @param userToken  Token that will authenticate the user
	 * @return HttpStatus FORBIDDEN if an attempt has already been created today, or
	 *         HttpStatus NO_CONTENT if the attempt is created successfully
	 */
	@PostMapping("imgini/newAttempt")
	public ResponseEntity<Object> registerAttempt(@RequestBody AttemptDTO attemptDTO,
			@RequestParam(value = "token") String userToken) {
		if (!Utilities.checkUser(tokens, userToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		Optional<Attempt> attempt = attemptRepository.todaysAtt(attemptDTO.getUserId(), attemptDTO.getAttemptDate());
		if (attempt.isPresent()) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		} else {
			Optional<Attempt> lastAttempt = attemptRepository.findTopByOrderByIdDesc();
			attemptRepository.save(new Attempt(lastAttempt.get().getId() + 1, attemptDTO.getUserId(), attemptDTO.getImageId(),
					attemptDTO.getAttemptDate(), attemptDTO.getTries(), attemptDTO.isSuccess()));

			Optional<User> userOptional = userRepository.getUserById(attemptDTO.getUserId());
			if (userOptional.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			if (attemptDTO.isSuccess()) {
				User user = userOptional.get();
				Integer currentPoints = user.getPoints();
				List<Imagen> img = imagenRepository.getImgById(attemptDTO.getImageId());
				if (!img.isEmpty()) {
					user.setPoints(currentPoints + (10 + img.get(0).getDifficulty() - (attemptDTO.getTries())));
					userRepository.save(user);
				}
			}
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
	}

	/**
	 * @param name      String Name of the user to be deleted
	 * @param password  String Password of the user to be deleted
	 * @param userToken Token that will authenticate the user
	 * @return HttpStatus NOT_FOUND if the user couldn't be found, or HttpStatus
	 *         NO_CONTENT if user and their attempts have been deleted successfully
	 */
	@DeleteMapping("imgini/delete")
	public ResponseEntity<String> deleteUser(@RequestParam(value = "name") String name,
			@RequestParam(value = "password") String password, @RequestParam(value = "token") String userToken) {
		if (!Utilities.checkUser(tokens, userToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		String passwordHash = DigestUtils.sha256Hex(password);
		Optional<User> user = userRepository.findByUserAndPassword(name, passwordHash);
		if (user.isPresent()) {
			userRepository.delete(user.get());
			List<Attempt> userAttempts = attemptRepository.getAttByUserId(user.get().getId());
			if (userAttempts != null && !userAttempts.isEmpty()) {
				attemptRepository.deleteAll(userAttempts);
			}
			tokens.remove(Utilities.findToken(tokens, userToken));
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	/**
	 * @param userToken   Token that will authenticate the user
	 * @param updatedUser Object with the updated information of the user
	 * @return HttpStatus NOT_FOUND if the user couldn't be found, or HttpStatus
	 *         NO_CONTENT if the user has been updated successfully
	 */
	@PutMapping("imgini/update")
	public ResponseEntity<String> updateUser(@RequestParam(value = "token") String userToken,
			@RequestBody UserPUT updatedUser) {
		if (!Utilities.checkUser(tokens, userToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		Optional<User> userOptional = userRepository.getUserByName(updatedUser.getOldName());
		if (userOptional.isPresent()) {
			String passwordHash = DigestUtils.sha256Hex(updatedUser.getPassword());
			User user = userOptional.get();
			user.setUsername(updatedUser.getNewName());
			user.setPassword(passwordHash);
			user.setProfilePicture(updatedUser.getProfilePicture());
			user.setExtension(updatedUser.getExtension());

			userRepository.save(user);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
}
