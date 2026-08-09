package com.hospital.appointment.controller;

import com.hospital.appointment.dto.LoginRequest;
import com.hospital.appointment.dto.SendOtpRequest;
import com.hospital.appointment.model.Patient;
import com.hospital.appointment.service.OtpService;
import com.hospital.appointment.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private OtpService otpService;

    @Autowired
    private PatientService patientService;

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@Valid @RequestBody SendOtpRequest request) {
        String mobileNumber = request.getMobileNumber();

        // Check if patient exists
        Optional<Patient> patient = patientService.findByMobileNumber(mobileNumber);
        if (patient.isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Mobile number not registered. Please book an appointment to register.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        // Generate and send OTP (in simulation, it gets stored in SMS logs)
        otpService.generateAndSendOtp(mobileNumber);

        Map<String, String> response = new HashMap<>();
        response.put("message", "OTP sent successfully to " + mobileNumber);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        String mobileNumber = request.getMobileNumber();
        String otpCode = request.getOtpCode();

        boolean isValid = otpService.validateOtp(mobileNumber, otpCode);
        if (!isValid) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Invalid or expired OTP code.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        Optional<Patient> patientOpt = patientService.findByMobileNumber(mobileNumber);
        if (patientOpt.isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Patient not found. Please book an appointment first.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        Patient patient = patientOpt.get();
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("patient", patient);
        // Return a mock token for frontend state keeping
        response.put("token", "mock-jwt-token-for-" + mobileNumber);

        return ResponseEntity.ok(response);
    }
}
