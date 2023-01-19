package com.muskanjanweja.jiraproject.repository;
import com.muskanjanweja.jiraproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}
