package com.unab.catvirtual.catvirtual.controller;

import com.unab.catvirtual.catvirtual.entity.Book;
import com.unab.catvirtual.catvirtual.entity.dto.BookDto;
import com.unab.catvirtual.catvirtual.sevice.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book")
@CrossOrigin(origins = "*")
public class BookController {
    @Autowired
    BookService bookService;

    @GetMapping("/all")
    public List<Book> listBooks(){
        return bookService.listBooks();
    }

    @GetMapping("/{id}")
    public Book queryBook(@PathVariable("id") String isbn){
        return bookService.queryBook(isbn);
    }

    @PostMapping("/new")
    public Book addBook(@RequestBody BookDto bookDto){
        return bookService.addBook(bookDto);
    }

    @PutMapping("/save")
    public Book saveBook(@RequestBody BookDto bookDto){
        return bookService.saveBook(bookDto);
    }

    @DeleteMapping("/{isbn}")
    public void deleteBook(@PathVariable("isbn") String id){
        bookService.deleteBook(id);
    }

    @GetMapping("/author/{authorId}")
    public List<Book> listBooksByAuthor(@PathVariable("authorId") String authorId){
        return bookService.listBooksByAuthor(authorId);
    }

    @GetMapping("/category/{categoryId}")
    public List<Book> listBookByCategory(@PathVariable("categoryId") String categoryId){
        return bookService.listBookByCategory(categoryId);
    }

    @GetMapping("/ind/{letter}")
    public List<Book> listBooksByLetter(@PathVariable("letter") String letter){
        return bookService.listBooksByLetter(letter);
    }

    @GetMapping("/init/{letter}")
    public List<Book> findByLetter(@PathVariable("letter") String letter){
        return bookService.findByLetter(letter);
    }

    @GetMapping("/price/{inferior}/{superior}")
    public List<Book> findBookRange(@PathVariable("inferior") long priceMin, @PathVariable("superior") long priceMax){
        return bookService.findBookRange(priceMin,priceMax);
    }

    @GetMapping("/end/{letter}")
    public List<Book> findByTitleEndingWith(@PathVariable("letter") String letter){
        return bookService.findByTitleEndingWith(letter);
    }

    @GetMapping("/endtwo/{letter}")
    public List<Book> findBooksEndWith(@PathVariable("letter") String letter){
        return bookService.findBooksEndWith(letter);
    }

    @GetMapping("/contain/{letter}")
    public List<Book> findByTitleContains(@PathVariable("letter") String text){
        return bookService.findByTitleContains(text);
    }

    @GetMapping("/containtwo/{letter}")
    public List<Book> findBooksContain(@PathVariable("letter") String text){
        return bookService.findBooksContain(text);
    }
}
