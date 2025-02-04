package spiMain.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Server {
	@GetMapping("stromboli/carta")
	public ResponseEntity<Object> carta(@RequestParam(value = "token") String tokenUsuari) {
		try {
			if (Utilities.checkUser(tokens, tokenUsuari)) {
				return ResponseEntity.status(HttpStatus.OK).body(Utilities.restaurantInfo());
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
			}
		} catch (Exception ex) {
			ex.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

}
