package bookup.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import bookup.model.Livro;
import bookup.repository.LivroRepository;

@Service
public class LivroService {

    private final LivroRepository livroRepository;

    public LivroService(LivroRepository livroRepository) {
        this.livroRepository = livroRepository;
    }

    public List<Livro> listarTodos() {
        return livroRepository.findAll();
    }

    public Optional<Livro> buscarPorId(String id) {
        return livroRepository.findById(id);
    }

    public Livro salvar(Livro livro) {
        return livroRepository.save(livro);
    }

    public Livro atualizar(String id, Livro livroAtualizado) {
        return livroRepository.findById(id)
                .map(livro -> {
                    livro.setTitulo(livroAtualizado.getTitulo());
                    livro.setAutor(livroAtualizado.getAutor());
                    livro.setGenero(livroAtualizado.getGenero());
                    livro.setAno(livroAtualizado.getAno());
                    livro.setStatus(livroAtualizado.getStatus());
                    livro.setCapa(livroAtualizado.getCapa());
                    livro.setDescricao(livroAtualizado.getDescricao());
                    return livroRepository.save(livro);
                })
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));
    }

    public void excluir(String id) {
        livroRepository.deleteById(id);
    }
}