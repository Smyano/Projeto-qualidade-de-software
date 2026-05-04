package bookup.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import bookup.model.Usuario;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    Optional<Usuario> findByEmail(String email);
}