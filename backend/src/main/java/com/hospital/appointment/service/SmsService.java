package com.hospital.appointment.service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class SmsService {

    private static final Logger log = LoggerFactory.getLogger(SmsService.class);
    
    // In-memory queue to simulate received SMS logs
    private final List<SmsLog> smsLogs = new CopyOnWriteArrayList<>();

    public void sendSms(String mobileNumber, String message) {
        SmsLog sms = new SmsLog(mobileNumber, message, LocalDateTime.now());
        smsLogs.add(sms);

        // Print prominently in the terminal for testing/viewing
        log.info("\n======================================================\n" +
                 "SMS SENT TO: {}\n" +
                 "MESSAGE: {}\n" +
                 "======================================================", 
                 mobileNumber, message);
    }

    public List<SmsLog> getSmsLogs() {
        return this.smsLogs;
    }

    public void clearLogs() {
        this.smsLogs.clear();
    }

    @Getter
    @AllArgsConstructor
    @ToString
    public static class SmsLog {
        private final String mobileNumber;
        private final String message;
        private final LocalDateTime timestamp;
    }
}
