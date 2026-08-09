package com.hospital.appointment.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

public class LoginRequest {
    @Getter @Setter
    @NotBlank(message = "Mobile number is required")
    private String mobileNumber;

    @Getter @Setter
    @NotBlank(message = "OTP code is required")
    private String otpCode;
}
