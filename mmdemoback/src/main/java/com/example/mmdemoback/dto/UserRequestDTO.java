package com.example.mmdemoback.dto;

import lombok.Getter;

import java.util.UUID;

public class UserRequestDTO {
    @Getter
    public static class toLoginDTO {
        private String userName;
        private String password;
    }

    @Getter
    public static class toUpdateDarknessDTO {
        private Boolean darkness;
    }

}
