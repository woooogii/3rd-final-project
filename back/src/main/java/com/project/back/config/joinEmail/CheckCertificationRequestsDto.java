package com.project.back.config.joinEmail;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CheckCertificationRequestsDto {
    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String certificationNumber;

}
