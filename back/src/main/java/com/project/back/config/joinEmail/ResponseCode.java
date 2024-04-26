package com.project.back.config.joinEmail;

public interface ResponseCode {

    String SUCCESS = "SU";

    String VALIDATION_FAIL = "VF";
    String DUPLICATED_ID = "DI";

    String MAIL_FAIL = "MF";
    String SIGN_IN_FAIL = "SF";
    String CERTIFICATION_FAIL = "CF";

    String DATABASE_ERROR = "DBE";
}
