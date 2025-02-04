package imgini.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import imgini.model.Imagen;

public interface ImagenRepository extends MongoRepository<Imagen, String> {

}
