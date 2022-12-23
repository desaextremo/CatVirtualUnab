package com.unab.catvirtual.catvirtual.controller;

import com.unab.catvirtual.catvirtual.entity.Category;
import com.unab.catvirtual.catvirtual.sevice.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "*")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/all")
    public List<Category> listCategoryes(){
        return categoryService.listCategoryes();
    }

    @GetMapping("/{id}")
    public Category queryBook(@PathVariable("id") String id){
        return categoryService.queryCategory(id);
    }

    @PostMapping("/new")
    public Category addBook(@RequestBody Category category){
        return categoryService.addCategory(category);
    }

    @PutMapping("/save")
    public Category saveBook(@RequestBody Category category){
        return categoryService.saveCategory(category);
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable("id") String id){
        categoryService.deleteCategory(id);
    }
}
