package imgini.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import imgini.model.Attempt;

public interface AttemptRepository extends MongoRepository<Attempt, String> {

}
