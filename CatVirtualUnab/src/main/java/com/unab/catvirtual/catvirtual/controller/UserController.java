package com.unab.catvirtual.catvirtual.controller;

import com.unab.catvirtual.catvirtual.entity.User;
import com.unab.catvirtual.catvirtual.sevice.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public List<User> listUsers(){
        return userService.listUsers();
    }

    @GetMapping("/{id}")
    public User queryUser(@PathVariable("id") String id){
        return userService.queryUser(id);
    }

    @PostMapping("/new")
    public User addUser(@RequestBody User user){
        return userService.addUser(user);
    }

    @PutMapping("/save")
    public User saveBook(@RequestBody User User){
        return userService.saveUser(User);
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable("id") String id){
        userService.deleteUser(id);
    }

    @GetMapping("/{email}/{password}")
    public User authenticateUser(@PathVariable("email") String email, @PathVariable("password") String password) {
        return userService.authenticateUser(email, password);
    }

    @GetMapping("/emailexist/{email}")
    public boolean emailExists(@PathVariable("email") String email) {
        return userService.emailExists(email);
    }
}
