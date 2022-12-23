package com.unab.catvirtual.catvirtual.repository;

import com.unab.catvirtual.catvirtual.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User,String> {

    public Optional<User> findByEmail(String email);
    public Optional<User> findByEmailAndPassword(String email,String password);
}
