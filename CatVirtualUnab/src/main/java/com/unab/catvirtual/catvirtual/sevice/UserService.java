package com.unab.catvirtual.catvirtual.sevice;

import com.unab.catvirtual.catvirtual.entity.User;
import com.unab.catvirtual.catvirtual.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> listUsers(){
        return userRepository.findAll();
    }

    public User queryUser(String id){
        User user;
        Optional<User> optional =  userRepository.findById(id);

        if(!optional.isEmpty()){
            user = optional.get();
        }else{
            user = null;
        }
        return user;
    }

    public User addUser(User user){
        try{
            return userRepository.insert(user);
        }catch (Exception e){
            return null;
        }
    }

    public User saveUser(User user){
        //1 Buscamos si el User existe y recuperamos toda su información
        Optional<User> opcional = userRepository.findById(user.getId());
        //el User existe
        if (!opcional.isEmpty()){
            User userBD = opcional.get();
            //2 comparamos si los valores actuales son diferentes a los valores del User recibido como parametro

            if (user.getFisrtName()!=null) userBD.setFisrtName(user.getFisrtName());
            if (user.getLastName()!=null) userBD.setLastName(user.getLastName());
            if (user.getBirthDay()!=null) userBD.setBirthDay(user.getBirthDay());
            if (user.getAddress()!=null) userBD.setAddress(user.getAddress());
            if(user.getCellPhone()!=null) userBD.setCellPhone(user.getCellPhone());
            if(user.getEmail()!=null) userBD.setEmail(user.getEmail());
            if(user.getPassword()!=null) userBD.setPassword(user.getPassword());
            if(user.getRole()!=null) userBD.setRole(user.getRole());
            if (user.getGender()!=null) userBD.setGender(user.getGender());

            return userRepository.save(userBD);
        }else{ //el User no existe
            return null;
        }
    }

    public void deleteUser(String id){
        userRepository.deleteById(id);
    }

    public boolean emailExists(String email) {
        return !userRepository.findByEmail(email).isEmpty();
    }

    public User authenticateUser(String email, String password) {
        Optional<User> usuario = userRepository.findByEmailAndPassword(email, password);

        if (usuario.isEmpty()) {
            return null;
        } else {
            return usuario.get();
        }
    }
}
