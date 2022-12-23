package com.unab.catvirtual.catvirtual.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection="authors")
@Data
@Builder
public class Author {
    @Id
    private String id;
    private String fisrtName;
    private String lastName;
    private LocalDate dateBorn;
    private String country;
    private String about;
}
