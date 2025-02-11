package imgini.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Utilities {
	public static int findToken(ArrayList<String> tokens, String token) {
		for (int i = 0; i < tokens.size(); i++) {
			if (tokens.get(i).equals(token)) {
				return i;
			}
		}
		return -1;
	}
	
	public static boolean checkUser(ArrayList<String> tokens, String token) {
		for (String tok : tokens) {
			if (tok.equals(token)) {
				return true;
			}
		}
		return false;
	}
	
	public static int getStreak(List<Attempt> atts) {
		LocalDate today = LocalDate.now();
		LocalDate attemptDate;
		int streak = 0;
		for (Attempt att : atts) {
			attemptDate = LocalDate.parse(att.getAttemptDate());
			if (!today.equals(attemptDate)) {
				break;
			}
			streak++;
			today.minusDays(1);
		}
		return streak;
	}
}
