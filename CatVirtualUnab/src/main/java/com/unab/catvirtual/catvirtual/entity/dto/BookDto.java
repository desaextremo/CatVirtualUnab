package com.unab.catvirtual.catvirtual.entity.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookDto {
    private String isbn;
    private String categoryId;
    private String title;
    private String authorId;
    private int pages;
    private long price;
    private int year;
    private String description;
}
