package bookup;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "bookup.repository")
public class BookupApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookupApplication.class, args);
    }
}