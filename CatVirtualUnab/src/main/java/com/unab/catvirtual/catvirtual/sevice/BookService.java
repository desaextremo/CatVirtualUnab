package com.unab.catvirtual.catvirtual.sevice;

import com.unab.catvirtual.catvirtual.entity.Author;
import com.unab.catvirtual.catvirtual.entity.Book;
import com.unab.catvirtual.catvirtual.entity.Category;
import com.unab.catvirtual.catvirtual.entity.dto.BookDto;
import com.unab.catvirtual.catvirtual.repository.AuthorRepository;
import com.unab.catvirtual.catvirtual.repository.BookRepository;
import com.unab.catvirtual.catvirtual.repository.CategoryRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Book> listBooks(){
        return bookRepository.findAll();
    }

    public Book queryBook(String isbn){
        Book book;
        Optional<Book> optional =  bookRepository.findById(isbn);

        if(!optional.isEmpty()){
            book = optional.get();
        }else{
            book = null;
        }
        return book;
    }

    public Book addBook(BookDto bookDto){
        Book book = Book.builder().build();
        Optional<Author> author= Optional.empty();
        Optional<Category> category= Optional.empty();

        //busco un libro x el isbn recibido
        Optional<Book> optional =  bookRepository.findById(bookDto.getIsbn());

        //no existe un libro asociado al isbn
        if (optional.isEmpty()){
            //si en el dto enviaron inf de codigo autor, busca en la base de datos
            if (bookDto.getAuthorId()!=null) author = authorRepository.findById(bookDto.getAuthorId());
            //si en el dto enviaron inf de codigo categoria, busca en la base de datos
            if (bookDto.getCategoryId()!=null) category = categoryRepository.findById(bookDto.getCategoryId());

            //copia los datos del dto al libro
            BeanUtils.copyProperties(bookDto, book);

            //Si se obtiene información de autor y de categoria, los asigna al nuevo objeto antes de insertar
            if (!author.isEmpty()) book.setAuthor(author.get());

            if (!category.isEmpty()) book.setCategory(category.get());

            //inserta el libro y retorna su información
            return bookRepository.insert(book);
        }else{
            return null;
        }
    }

    /*
        Recibe un BookDto, valida si en la base de datos existe un libro asociado al ISBN
        Si existe lo recupera (libroBD).
        Adicionalmente a partir del BookDto valida si hay información del id de autor y de categorias
        de ser asi los obtiene de la base de datos mediante el método findById.
        Crea un Book vacio y pega los datos del BookDto al objeto Book
        Si el Book contaba con informacion de autor y/o categorias los agrega
     */
    public Book saveBook(BookDto bookDto){
        Book book = Book.builder().build();
        Optional<Author> author= Optional.empty();
        Optional<Category> category= Optional.empty();

        //1 Buscamos si el libro existe y recuperamos toda su información
        Optional<Book> optional =  bookRepository.findById(bookDto.getIsbn());

        //el libro existe lo obtengo de la base de datos
        if (!optional.isEmpty()){
            Book libroBD = optional.get();

            //si en el dto enviaron inf de codigo autor, busca en la base de datos
            if (bookDto.getAuthorId()!=null) author = authorRepository.findById(bookDto.getAuthorId());
            //si en el dto enviaron inf de codigo categoria, busca en la base de datos
            if (bookDto.getCategoryId()!=null) category = categoryRepository.findById(bookDto.getCategoryId());

            //copia los datos del dto al libro
            BeanUtils.copyProperties(bookDto, book);

            //Si se obtiene información de autor y de categoria, los asigna al nuevo objeto antes de insertar
            if (!author.isEmpty()) book.setAuthor(author.get());

            if (!category.isEmpty()) book.setCategory(category.get());

            //2 comparamos si los valores actuales son diferentes a los valores del libro recibido como parametro
            if (book.getCategory()!=null) libroBD.setCategory(book.getCategory());
            if (book.getAuthor()!=null) libroBD.setAuthor(book.getAuthor());
            if (book.getDescription()!=null) libroBD.setDescription(book.getDescription());
            if (book.getTitle()!=null) libroBD.setTitle(book.getTitle());
            if(book.getPages()!=0) libroBD.setPages(book.getPages());
            if(book.getPrice()!=0) libroBD.setPrice(book.getPrice());
            if(book.getYear()!=0) libroBD.setYear(book.getYear());
            if(book.getDescription()!=null) libroBD.setDescription(book.getDescription());

            return bookRepository.save(libroBD);
        }else{ //el libro no existe
            return null;
        }
    }

    public void deleteBook(String id){
        bookRepository.deleteById(id);
    }

    public List<Book> listBooksByAuthor(String authorId){
        Query query = new Query();
        Criteria dateCriteria = Criteria.where("author.id").is(authorId);

        query.addCriteria(dateCriteria);
        List<Book> books = mongoTemplate.find(query, Book.class);

        return books;
    }

    public List<Book> listBookByCategory(String categoryId){
        Query query = new Query();
        Criteria dateCriteria = Criteria.where("category.id").is(categoryId);

        query.addCriteria(dateCriteria);
        List<Book> books = mongoTemplate.find(query, Book.class);

        return books;
    }

    public List<Book> listBooksByLetter(String letter){

        return bookRepository.findByTitleStartsWithOrderByTitleAsc(letter);
    }

    public List<Book> findByLetter(String letter){
        return bookRepository.findByLetter(letter);
    }

    public List<Book> findByTitleEndingWith(String letter){
        return bookRepository.findByTitleEndingWithOrderByTitleAsc(letter);
    }

    public List<Book> findBooksEndWith(String letter){
        return bookRepository.findBooksEndWith(letter);
    }

    public List<Book> findByTitleContains(String text){
        return bookRepository.findByTitleContainsOrderByTitleAsc(text);
    }

    public List<Book> findBooksContain(String text){
        return bookRepository.findBooksContain(text);
    }

    public List<Book> findBookRange(long priceMin, long priceMax){
        return bookRepository.findBookRange(priceMin,priceMax);
    }

}
