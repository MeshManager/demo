package com.example.mmdemoback.repository;

import com.example.mmdemoback.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
    @Modifying
    @Query("update User u set u.darkMode = :darkMode where u.username = :username")
    void updateDarkModeByUsername(@Param("username") String username, @Param("darkMode") Boolean darkMode);
}
