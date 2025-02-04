package imgini.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import imgini.model.User;

public interface UserRepository extends MongoRepository<User, String> {

}
