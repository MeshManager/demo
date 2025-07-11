package com.example.mmdemoback.controller;

import com.example.mmdemoback.dto.UserRequestDTO;
import com.example.mmdemoback.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/demo")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    ResponseEntity<Object> login(@RequestBody UserRequestDTO.toLoginDTO loginDTO) {
        if(userService.login(loginDTO)){
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/darkmode/{username}")
    ResponseEntity<Boolean> getDarkMode(@PathVariable("username") String username) {
        boolean darkMode = userService.darkmode(username);
        return ResponseEntity.ok(darkMode);
    }

    @PostMapping("/darkmode/{username}")
    ResponseEntity<Boolean> updateDarkMode(@PathVariable("username") String username, @RequestBody UserRequestDTO.toUpdateDarknessDTO updateDarknessDTO) {
        Void darkMode = userService.updateDarkmode(username, updateDarknessDTO.getDarkness());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/logo")
    ResponseEntity<String> getLogo() {
        return ResponseEntity.ok("https://gogetyourgreen-images.s3.ap-northeast-2.amazonaws.com/logo.png");
    }

    @GetMapping("/header")
    public ResponseEntity<Map<String, String>> getHeaders(@RequestHeader Map<String, String> headers) {
        return ResponseEntity.ok(headers);
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("OK");
    }

    @RequestMapping(value = {"/darkmode/**", "/user/**"}, method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handleOptions() {
        return ResponseEntity.ok().build();
    }
}
