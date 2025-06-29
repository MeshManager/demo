package com.example.mmdemoback.service;

import com.example.mmdemoback.domain.User;
import com.example.mmdemoback.dto.UserRequestDTO;
import com.example.mmdemoback.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public Boolean login(UserRequestDTO.toLoginDTO loginDTO) {

        User user = userRepository.findByUsername(loginDTO.getUserName());

        if (user == null) {
            return false;
        } else return Objects.equals(user.getPassword(), loginDTO.getPassword());
    }

    public Boolean darkmode(String userName) {
        User user = userRepository.findByUsername(userName);
        return user.getDarkMode();
    }

    @Modifying
    @Transactional
    public Void updateDarkmode(String userName, Boolean darkmode) {
        User user = userRepository.findByUsername(userName);
        userRepository.updateDarkModeByUsername(user.getUsername(), darkmode);
        return null;
    }
}
