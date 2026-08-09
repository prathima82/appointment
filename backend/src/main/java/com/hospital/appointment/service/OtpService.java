package com.hospital.appointment.service;

import com.hospital.appointment.model.OtpToken;
import com.hospital.appointment.repository.OtpTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OtpService {

    @Autowired
    private OtpTokenRepository otpTokenRepository;

    @Autowired
    private SmsService smsService;

    private final SecureRandom random = new SecureRandom();

    /**
     * Generates a 6-digit OTP and sends it via SmsService.
     */
    public String generateAndSendOtp(String mobileNumber) {
        // Generate random 6 digit code
        String otp = String.format("%06d", random.nextInt(1000000));

        // Set expiry to 5 minutes from now
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(5);

        OtpToken otpToken = OtpToken.builder()
                .mobileNumber(mobileNumber)
                .otpCode(otp)
                .expiryTime(expiry)
                .used(false)
                .build();

        otpTokenRepository.save(otpToken);

        // Send OTP via SmsService
        String smsMessage = "Your Liberty Heart & Vascular Surgery Centre OTP is " + otp + ". Valid for 5 minutes.";
        smsService.sendSms(mobileNumber, smsMessage);

        return otp;
    }

    /**
     * Validates if the OTP is correct, unused, and not expired.
     */
    public boolean validateOtp(String mobileNumber, String otpCode) {
        Optional<OtpToken> optionalToken = otpTokenRepository
                .findFirstByMobileNumberAndUsedFalseAndExpiryTimeAfterOrderByCreatedAtDesc(
                        mobileNumber, LocalDateTime.now());

        if (optionalToken.isPresent()) {
            OtpToken token = optionalToken.get();
            if (token.getOtpCode().equals(otpCode)) {
                token.setUsed(true);
                otpTokenRepository.save(token);
                return true;
            }
        }
        return false;
    }
}
