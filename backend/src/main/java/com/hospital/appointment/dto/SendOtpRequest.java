package com.hospital.appointment.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

public class SendOtpRequest {
    @Getter @Setter
    @NotBlank(message = "Mobile number is required")
    private String mobileNumber;
}
