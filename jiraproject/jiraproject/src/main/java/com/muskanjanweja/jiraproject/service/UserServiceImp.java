package com.muskanjanweja.jiraproject.service;

import com.muskanjanweja.jiraproject.model.User;
import com.muskanjanweja.jiraproject.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sound.sampled.Control;
import java.util.List;

@Service
public class UserServiceImp implements UserService{


    @Autowired
    private UserRepository userRepository;

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @Override
    public User get(Integer id){
        return userRepository.findById(id).get();
    }
    @Override
    public void deleteUser(Integer id){
        userRepository.deleteById(id);
    }
}
