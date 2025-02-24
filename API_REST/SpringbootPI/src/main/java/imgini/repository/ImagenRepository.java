package imgini.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import imgini.model.dto.ThemeGroup;
import imgini.model.entity.Imagen;

public interface ImagenRepository extends MongoRepository<Imagen, String> {

	@Query(value = "{ 'id': ?0 }")
	List<Imagen> getImgById(long id);
	
	@Query(value = "{ 'theme': ?0}")
	List<Imagen> getImgByTheme(String imgTheme);
	
	@Aggregation(pipeline = {
		    "{ '$group': { '_id': '$theme' } }"
		})
		List<ThemeGroup> findDistinctThemes();
}
