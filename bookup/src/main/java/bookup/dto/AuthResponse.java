package bookup.dto;

public class AuthResponse {

    private String id;
    private String nome;
    private String email;

    public AuthResponse(String id, String nome, String email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }
}