package com.project.back.config.joinEmail;

public interface ResponseMessage {

    String SUCCESS = "Success.";

    String VALIDATION_FAIL = "Validation failed";
    String DUPLICATED_ID = "Duplicate Id.";

    String MAIL_FAIL = "Mail Failed";
    String SIGN_IN_FAIL = "Login information missmatch";   
    String CERTIFICATION_FAIL = "Certification failed.";

    String DATABASE_ERROR = "Database error.";
}
