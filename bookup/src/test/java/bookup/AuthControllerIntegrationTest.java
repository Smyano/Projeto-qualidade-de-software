package bookup;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import bookup.repository.UsuarioRepository;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
class AuthControllerIntegrationTest {

    @Container
    static MongoDBContainer mongoDBContainer = new MongoDBContainer("mongo:7.0");

    @DynamicPropertySource
    static void configurarMongo(DynamicPropertyRegistry registry) {
        registry.add("spring.data.mongodb.uri", mongoDBContainer::getReplicaSetUrl);
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @BeforeEach
    void limparBanco() {
        usuarioRepository.deleteAll();
    }

    @Test
    void deveCadastrarUsuarioComSucesso() throws Exception {
        String usuarioJson = """
            {
              "nome": "Samira",
              "email": "samira@gmail.com",
              "senha": "123456"
            }
        """;

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(usuarioJson))
                .andExpect(status().isOk());
    }

    @Test
    void deveFazerLoginComSucesso() throws Exception {
        String usuarioJson = """
            {
              "nome": "Samira",
              "email": "samira@gmail.com",
              "senha": "123456"
            }
        """;

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(usuarioJson))
                .andExpect(status().isOk());

        String loginJson = """
            {
              "email": "samira@gmail.com",
              "senha": "123456"
            }
        """;

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginJson))
                .andExpect(status().isOk());
    }

    @Test
    void deveRetornarErroQuandoEmailJaExiste() throws Exception {
        String usuarioJson = """
            {
              "nome": "Samira",
              "email": "samira@gmail.com",
              "senha": "123456"
            }
        """;

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(usuarioJson))
                .andExpect(status().isOk());

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(usuarioJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    void deveRetornarErroQuandoSenhaForInvalida() throws Exception {
        String usuarioJson = """
            {
              "nome": "Samira",
              "email": "samira@gmail.com",
              "senha": "123456"
            }
        """;

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(usuarioJson))
                .andExpect(status().isOk());

        String loginInvalidoJson = """
            {
              "email": "samira@gmail.com",
              "senha": "senhaerrada"
            }
        """;

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginInvalidoJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    void deveRetornarErroQuandoCadastroForInvalido() throws Exception {
        String usuarioInvalidoJson = """
            {
              "nome": "",
              "email": "emailerrado",
              "senha": ""
            }
        """;

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(usuarioInvalidoJson))
                .andExpect(status().isBadRequest());
    }
}