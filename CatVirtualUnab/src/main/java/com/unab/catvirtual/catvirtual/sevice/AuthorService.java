package com.unab.catvirtual.catvirtual.sevice;

import com.unab.catvirtual.catvirtual.entity.Author;
import com.unab.catvirtual.catvirtual.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorService {
    @Autowired
    private AuthorRepository authorRepository;

    public List<Author> listAuthors(){
        return authorRepository.findAll();
    }

    public Author queryAuthor(String isbn){
        Author author;
        Optional<Author> optional =  authorRepository.findById(isbn);

        if(!optional.isEmpty()){
            author = optional.get();
        }else{
            author = null;
        }
        return author;
    }

    public Author addAuthor(Author author){
        try{
            return authorRepository.insert(author);
        }catch (Exception e){
            return null;
        }
    }

    public Author saveAuthor(Author author){
        //1 Buscamos si el author existe y recuperamos toda su información
        Optional<Author> opcional = authorRepository.findById(author.getId());
        //el author existe
        if (!opcional.isEmpty()){
            Author authorBD = opcional.get();
            //2 comparamos si los valores actuales son diferentes a los valores del Author recibido como parametro

            if (author.getFisrtName()!=null) authorBD.setFisrtName(author.getFisrtName());
            if (author.getLastName()!=null) authorBD.setLastName(author.getLastName());
            if (author.getCountry()!=null) authorBD.setCountry(author.getCountry());
            if (author.getAbout()!=null) authorBD.setAbout(author.getAbout());
            if(author.getDateBorn()!=null) authorBD.setDateBorn(author.getDateBorn());

            return authorRepository.save(authorBD);
        }else{ //el author no existe
            return null;
        }
    }

    public void deleteAuthor(String id){
        authorRepository.deleteById(id);
    }

}
