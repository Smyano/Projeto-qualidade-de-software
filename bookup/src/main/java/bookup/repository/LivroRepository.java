package bookup.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import bookup.model.Livro;

@Repository
public interface LivroRepository extends MongoRepository<Livro, String> {
}