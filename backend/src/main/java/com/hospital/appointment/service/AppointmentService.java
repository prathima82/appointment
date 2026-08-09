package com.hospital.appointment.service;

import com.hospital.appointment.model.Appointment;
import com.hospital.appointment.model.Patient;
import com.hospital.appointment.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private SmsService smsService;

    public Appointment bookAppointment(Patient patient, LocalDate date, String timeSlot, String reason) {
        Appointment appointment = Appointment.builder()
                .patient(patient)
                .appointmentDate(date)
                .timeSlot(timeSlot)
                .reason(reason)
                .status("BOOKED")
                .build();

        Appointment savedAppointment = appointmentRepository.save(appointment);

        // Send booking confirmation SMS
        String confirmationMessage = String.format(
                "Dear %s, your appointment at Liberty Heart Centre is booked for %s in the slot %s. " +
                "Thank you for choosing us!",
                patient.getName(), date.toString(), timeSlot
        );
        smsService.sendSms(patient.getMobileNumber(), confirmationMessage);

        return savedAppointment;
    }

    public List<Appointment> getAppointmentsByMobile(String mobileNumber) {
        return appointmentRepository.findByPatientMobileNumberOrderByAppointmentDateDesc(mobileNumber);
    }

    public Appointment cancelAppointment(Long appointmentId, String patientMobile) {
        Optional<Appointment> optionalAppointment = appointmentRepository.findById(appointmentId);
        
        if (optionalAppointment.isPresent()) {
            Appointment appointment = optionalAppointment.get();
            // Verify that this appointment belongs to the mobile number requesting the cancellation
            if (appointment.getPatient().getMobileNumber().equals(patientMobile)) {
                appointment.setStatus("CANCELLED");
                Appointment updatedAppointment = appointmentRepository.save(appointment);

                // Send cancellation notice SMS
                String cancellationMessage = String.format(
                        "Dear %s, your appointment scheduled for %s at %s has been cancelled successfully.",
                        appointment.getPatient().getName(),
                        appointment.getAppointmentDate().toString(),
                        appointment.getTimeSlot()
                );
                smsService.sendSms(patientMobile, cancellationMessage);

                return updatedAppointment;
            } else {
                throw new SecurityException("Unauthorized: This appointment does not belong to the logged-in patient.");
            }
        } else {
            throw new IllegalArgumentException("Appointment not found with ID: " + appointmentId);
        }
    }
}
