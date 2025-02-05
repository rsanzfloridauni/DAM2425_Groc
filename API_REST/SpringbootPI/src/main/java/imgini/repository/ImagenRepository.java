package imgini.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import imgini.model.Imagen;

public interface ImagenRepository extends MongoRepository<Imagen, String> {

	@Query(value = "{ 'id': ?0 }")
	List<Imagen> getImgById(long id);
	
}
