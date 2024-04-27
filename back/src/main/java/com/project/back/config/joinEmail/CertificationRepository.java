package com.project.back.config.joinEmail;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificationRepository extends JpaRepository<CertificationEntity, String>{

    CertificationEntity findByEmail(String email);

}
