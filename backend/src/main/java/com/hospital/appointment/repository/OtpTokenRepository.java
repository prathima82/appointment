package com.hospital.appointment.repository;

import com.hospital.appointment.model.OtpToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface OtpTokenRepository extends JpaRepository<OtpToken, Long> {
    Optional<OtpToken> findFirstByMobileNumberAndUsedFalseAndExpiryTimeAfterOrderByCreatedAtDesc(
            String mobileNumber, LocalDateTime currentTime);
}
