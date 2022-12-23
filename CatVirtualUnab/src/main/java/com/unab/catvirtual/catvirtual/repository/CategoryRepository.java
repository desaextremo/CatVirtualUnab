package com.unab.catvirtual.catvirtual.repository;

import com.unab.catvirtual.catvirtual.entity.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category,String> {
}
