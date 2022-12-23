package com.unab.catvirtual.catvirtual.controller;

import com.unab.catvirtual.catvirtual.entity.Author;
import com.unab.catvirtual.catvirtual.sevice.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/author")
@CrossOrigin(origins = "*")
public class AuthorController {
    @Autowired
    private AuthorService authorService;

    @GetMapping("/all")
    public List<Author> listAuthors(){
        return authorService.listAuthors();
    }

    @GetMapping("/{id}")
    public Author queryAuthor(@PathVariable("id") String id){
        return authorService.queryAuthor(id);
    }

    @PostMapping("/new")
    public Author addAuthor(@RequestBody Author author){
        return authorService.addAuthor(author);
    }

    @PutMapping("/save")
    public Author saveBook(@RequestBody Author author){
        return authorService.saveAuthor(author);
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable("id") String id){
        authorService.deleteAuthor(id);
    }
}
