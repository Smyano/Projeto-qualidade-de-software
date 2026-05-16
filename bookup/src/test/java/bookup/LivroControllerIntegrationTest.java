package bookup;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import bookup.repository.LivroRepository;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
class LivroControllerIntegrationTest {

    @Container
    static MongoDBContainer mongoDBContainer = new MongoDBContainer("mongo:7.0");

    @DynamicPropertySource
    static void configurarMongo(DynamicPropertyRegistry registry) {
        registry.add("spring.data.mongodb.uri", mongoDBContainer::getReplicaSetUrl);
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void limparBanco() {
        livroRepository.deleteAll();
    }

    @Test
    void deveCadastrarListarAtualizarEExcluirLivro() throws Exception {
        String livroJson = """
            {
              "titulo": "Dom Casmurro",
              "autor": "Machado de Assis",
              "genero": "Romance",
              "ano": "1899",
              "status": "Lido",
              "capa": "",
              "descricao": "Clássico brasileiro"
            }
        """;

        String respostaCriacao = mockMvc.perform(post("/livros")
                .contentType(MediaType.APPLICATION_JSON)
                .content(livroJson))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode json = objectMapper.readTree(respostaCriacao);
        String id = json.get("id").asText();

        mockMvc.perform(get("/livros"))
                .andExpect(status().isOk());

        String livroAtualizadoJson = """
            {
              "titulo": "Dom Casmurro Atualizado",
              "autor": "Machado de Assis",
              "genero": "Romance",
              "ano": "1900",
              "status": "Lendo",
              "capa": "",
              "descricao": "Descrição atualizada"
            }
        """;

        mockMvc.perform(put("/livros/" + id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(livroAtualizadoJson))
                .andExpect(status().isOk());

        mockMvc.perform(delete("/livros/" + id))
                .andExpect(status().isNoContent());
    }

    @Test
    void deveListarLivrosMesmoQuandoNaoExistemRegistros() throws Exception {
        mockMvc.perform(get("/livros"))
                .andExpect(status().isOk());
    }

    @Test
    void deveRetornarNoContentAoExcluirLivro() throws Exception {
        String livroJson = """
            {
              "titulo": "Livro Teste",
              "autor": "Autor Teste",
              "genero": "Teste",
              "ano": "2026",
              "status": "Quero ler",
              "capa": "",
              "descricao": "Teste"
            }
        """;

        String respostaCriacao = mockMvc.perform(post("/livros")
                .contentType(MediaType.APPLICATION_JSON)
                .content(livroJson))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode json = objectMapper.readTree(respostaCriacao);
        String id = json.get("id").asText();

        mockMvc.perform(delete("/livros/" + id))
                .andExpect(status().isNoContent());
    }
}