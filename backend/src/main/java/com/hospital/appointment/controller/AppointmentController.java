package com.hospital.appointment.controller;

import com.hospital.appointment.dto.BookAppointmentRequest;
import com.hospital.appointment.model.Appointment;
import com.hospital.appointment.model.Patient;
import com.hospital.appointment.service.AppointmentService;
import com.hospital.appointment.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private PatientService patientService;

    @PostMapping("/book")
    public ResponseEntity<?> bookAppointment(@Valid @RequestBody BookAppointmentRequest request) {
        // Register or retrieve existing patient
        Patient patient = patientService.createOrGetPatient(
                request.getName(),
                request.getMobileNumber(),
                request.getAge(),
                request.getGender()
        );

        // Book the appointment
        Appointment appointment = appointmentService.bookAppointment(
                patient,
                request.getAppointmentDate(),
                request.getTimeSlot(),
                request.getReason()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(appointment);
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyAppointments(
            @RequestHeader(value = "X-Patient-Mobile", required = false) String headerMobile,
            @RequestParam(value = "mobileNumber", required = false) String paramMobile) {

        String mobileNumber = (headerMobile != null) ? headerMobile : paramMobile;

        if (mobileNumber == null || mobileNumber.trim().isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Unauthorized: Mobile number required for authentication.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        List<Appointment> appointments = appointmentService.getAppointmentsByMobile(mobileNumber);
        return ResponseEntity.ok(appointments);
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<?> cancelAppointment(
            @PathVariable Long id,
            @RequestHeader(value = "X-Patient-Mobile", required = false) String headerMobile,
            @RequestParam(value = "mobileNumber", required = false) String paramMobile) {

        String mobileNumber = (headerMobile != null) ? headerMobile : paramMobile;

        if (mobileNumber == null || mobileNumber.trim().isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Unauthorized: Mobile number required for authentication.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        try {
            Appointment appointment = appointmentService.cancelAppointment(id, mobileNumber);
            return ResponseEntity.ok(appointment);
        } catch (SecurityException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
