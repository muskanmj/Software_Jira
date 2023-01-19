package com.muskanjanweja.jiraproject.controller;
import com.muskanjanweja.jiraproject.model.User;
import com.muskanjanweja.jiraproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin

@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public String add(@RequestBody User user){
        userService.saveUser(user);
        return String.valueOf(user.getId());
    }

    @GetMapping("/getAll")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }


    @PutMapping("/{id}")
    public ResponseEntity<User> update(@RequestBody User user,@PathVariable Integer id){
        try{
            User existingUser=userService.get(id);
            userService.saveUser(user);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Integer id){
        userService.deleteUser(id);
        return "Deleted User"+id;
    }

}
