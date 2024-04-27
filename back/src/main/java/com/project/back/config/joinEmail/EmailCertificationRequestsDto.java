package com.project.back.config.joinEmail;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class EmailCertificationRequestsDto {
    @NotBlank
    @Email
    private String email;


}
