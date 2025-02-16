package imgini.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import imgini.model.entity.Attempt;
import imgini.model.entity.User;

public interface AttemptRepository extends MongoRepository<Attempt, String> {
	@Query(value = "{ 'attemptDate': ?0 }")
	Optional<Attempt> getAttByDate(String attemptDate);
	
	@Query("{ 'userId': ?0, 'attemptDate': ?1 }")
	Optional<Attempt> todaysAtt(Integer userId, String attemptDate);
	
	Optional<Attempt> findTopByOrderByIdDesc();
	
	@Query("{ 'userId': ?0 }")
	List<Attempt> getAttByUserId(Integer userId);
	
	Page<Attempt> findByUserId(Integer userId, Pageable pageable);
}
