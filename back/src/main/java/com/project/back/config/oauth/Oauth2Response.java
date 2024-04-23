package com.project.back.config.oauth;

public interface Oauth2Response {

    String getProvider();

    String getProviderId();

    String getEmail();

    String getName();
}
