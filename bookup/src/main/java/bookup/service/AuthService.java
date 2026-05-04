package bookup.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import bookup.dto.AuthResponse;
import bookup.dto.LoginRequest;
import bookup.dto.RegisterRequest;
import bookup.model.Usuario;
import bookup.repository.UsuarioRepository;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse registrar(RegisterRequest request) {
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado.");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(request.getNome());
        usuario.setEmail(request.getEmail());
        usuario.setSenha(passwordEncoder.encode(request.getSenha()));

        Usuario salvo = usuarioRepository.save(usuario);

        return new AuthResponse(salvo.getId(), salvo.getNome(), salvo.getEmail());
    }

    public AuthResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        boolean senhaCorreta = passwordEncoder.matches(request.getSenha(), usuario.getSenha());

        if (!senhaCorreta) {
            throw new RuntimeException("Senha inválida.");
        }

        return new AuthResponse(usuario.getId(), usuario.getNome(), usuario.getEmail());
    }
}