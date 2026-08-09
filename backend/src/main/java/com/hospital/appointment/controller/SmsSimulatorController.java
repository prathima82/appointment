package com.hospital.appointment.controller;

import com.hospital.appointment.service.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mock-sms")
public class SmsSimulatorController {

    @Autowired
    private SmsService smsService;

    @GetMapping("/messages")
    public ResponseEntity<List<SmsService.SmsLog>> getMessages(
            @RequestParam(value = "mobileNumber", required = false) String mobileNumber) {
        
        List<SmsService.SmsLog> logs = smsService.getSmsLogs();
        
        if (mobileNumber != null && !mobileNumber.trim().isEmpty()) {
            List<SmsService.SmsLog> filteredLogs = new ArrayList<>();
            for (SmsService.SmsLog log : logs) {
                if (log.getMobileNumber().equals(mobileNumber)) {
                    filteredLogs.add(log);
                }
            }
            // Reverse list to show newest first
            List<SmsService.SmsLog> reversed = new ArrayList<>(filteredLogs);
            Collections.reverse(reversed);
            return ResponseEntity.ok(reversed);
        }

        // Return all in reverse order (newest first)
        List<SmsService.SmsLog> reversed = new ArrayList<>(logs);
        Collections.reverse(reversed);
        return ResponseEntity.ok(reversed);
    }

    @PostMapping("/clear")
    public ResponseEntity<?> clearMessages() {
        smsService.clearLogs();
        return ResponseEntity.ok(Map.of("message", "Simulator SMS logs cleared"));
    }
}
