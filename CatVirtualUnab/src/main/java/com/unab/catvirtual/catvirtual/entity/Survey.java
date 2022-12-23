package com.unab.catvirtual.catvirtual.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "surveys")
@Data
@Builder
public class Survey {
    @Id
    private String id;
    @DBRef
    private Book book;
    @DBRef
    private User user;
    private String vote;
    private String resume;
}
