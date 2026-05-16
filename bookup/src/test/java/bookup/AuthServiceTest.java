package bookup;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import bookup.dto.AuthResponse;
import bookup.dto.LoginRequest;
import bookup.dto.RegisterRequest;
import bookup.model.Usuario;
import bookup.repository.UsuarioRepository;
import bookup.service.AuthService;

import static org.mockito.Mockito.mock;

class AuthServiceTest {

    private UsuarioRepository usuarioRepository;
    private PasswordEncoder passwordEncoder;
    private AuthService authService;

    @BeforeEach
    void setup() {
        usuarioRepository = mock(UsuarioRepository.class);
        passwordEncoder = mock(PasswordEncoder.class);
        authService = new AuthService(usuarioRepository, passwordEncoder);
    }

    @Test
    void deveRegistrarUsuarioComSucesso() {
        RegisterRequest request = new RegisterRequest();
        request.setNome("Samira");
        request.setEmail("samira@gmail.com");
        request.setSenha("123456");

        Usuario usuarioSalvo = new Usuario();
        usuarioSalvo.setId("1");
        usuarioSalvo.setNome("Samira");
        usuarioSalvo.setEmail("samira@gmail.com");
        usuarioSalvo.setSenha("senhaCriptografada");

        when(usuarioRepository.findByEmail("samira@gmail.com")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("123456")).thenReturn("senhaCriptografada");
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuarioSalvo);

        AuthResponse response = authService.registrar(request);

        assertEquals("1", response.getId());
        assertEquals("Samira", response.getNome());
        assertEquals("samira@gmail.com", response.getEmail());
    }

    @Test
    void deveLancarErroQuandoEmailJaExiste() {
        RegisterRequest request = new RegisterRequest();
        request.setNome("Samira");
        request.setEmail("samira@gmail.com");
        request.setSenha("123456");

        Usuario usuarioExistente = new Usuario();
        usuarioExistente.setEmail("samira@gmail.com");

        when(usuarioRepository.findByEmail("samira@gmail.com")).thenReturn(Optional.of(usuarioExistente));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            authService.registrar(request);
        });

        assertEquals("Email já cadastrado.", exception.getMessage());
    }

    @Test
    void deveFazerLoginComSucesso() {
        LoginRequest request = new LoginRequest();
        request.setEmail("samira@gmail.com");
        request.setSenha("123456");

        Usuario usuario = new Usuario();
        usuario.setId("1");
        usuario.setNome("Samira");
        usuario.setEmail("samira@gmail.com");
        usuario.setSenha("senhaCriptografada");

        when(usuarioRepository.findByEmail("samira@gmail.com")).thenReturn(Optional.of(usuario));
        when(passwordEncoder.matches("123456", "senhaCriptografada")).thenReturn(true);

        AuthResponse response = authService.login(request);

        assertEquals("1", response.getId());
        assertEquals("Samira", response.getNome());
        assertEquals("samira@gmail.com", response.getEmail());
    }

    @Test
    void deveLancarErroQuandoUsuarioNaoExiste() {
        LoginRequest request = new LoginRequest();
        request.setEmail("naoexiste@gmail.com");
        request.setSenha("123456");

        when(usuarioRepository.findByEmail("naoexiste@gmail.com")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            authService.login(request);
        });

        assertEquals("Usuário não encontrado.", exception.getMessage());
    }

    @Test
    void deveLancarErroQuandoSenhaForInvalida() {
        LoginRequest request = new LoginRequest();
        request.setEmail("samira@gmail.com");
        request.setSenha("senhaerrada");

        Usuario usuario = new Usuario();
        usuario.setEmail("samira@gmail.com");
        usuario.setSenha("senhaCriptografada");

        when(usuarioRepository.findByEmail("samira@gmail.com")).thenReturn(Optional.of(usuario));
        when(passwordEncoder.matches("senhaerrada", "senhaCriptografada")).thenReturn(false);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            authService.login(request);
        });

        assertEquals("Senha inválida.", exception.getMessage());
    }
}