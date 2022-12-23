package com.unab.catvirtual.catvirtual.repository;

import com.unab.catvirtual.catvirtual.entity.Author;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AuthorRepository extends MongoRepository<Author,String> {
}
