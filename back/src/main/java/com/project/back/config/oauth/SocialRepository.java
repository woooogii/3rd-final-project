package com.project.back.config.oauth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface SocialRepository extends JpaRepository<SocialEntity, Long> {
    
    SocialEntity findByUsername(String username);

    SocialEntity findByEmail(String email);

}
