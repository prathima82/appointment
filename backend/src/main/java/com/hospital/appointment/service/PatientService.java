package com.hospital.appointment.service;

import com.hospital.appointment.model.Patient;
import com.hospital.appointment.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public Optional<Patient> findByMobileNumber(String mobileNumber) {
        return patientRepository.findByMobileNumber(mobileNumber);
    }

    public Patient createOrGetPatient(String name, String mobileNumber, Integer age, String gender) {
        Optional<Patient> existingPatient = patientRepository.findByMobileNumber(mobileNumber);

        if (existingPatient.isPresent()) {
            Patient patient = existingPatient.get();
            // Update patient details if changed
            if (name != null && !name.trim().isEmpty()) {
                patient.setName(name);
            }
            if (age != null) {
                patient.setAge(age);
            }
            if (gender != null && !gender.trim().isEmpty()) {
                patient.setGender(gender);
            }
            return patientRepository.save(patient);
        } else {
            Patient newPatient = Patient.builder()
                    .name(name)
                    .mobileNumber(mobileNumber)
                    .age(age)
                    .gender(gender)
                    .build();
            return patientRepository.save(newPatient);
        }
    }
}
