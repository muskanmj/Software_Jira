package com.muskanjanweja.jiraproject.service;
import com.muskanjanweja.jiraproject.model.User;
import jakarta.persistence.Access;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
//Access-Control-Allow-Origin: *;
public interface UserService {
    public User saveUser(User user);
    public List<User> getAllUsers();
    public User get(Integer id);


    void deleteUser(Integer id);
}
