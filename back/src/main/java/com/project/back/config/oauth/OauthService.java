package com.project.back.config.oauth;

import java.nio.file.attribute.UserPrincipal;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.project.back.config.email.MailSendService;
import com.project.back.entity.UserEntity;
import com.project.back.repository.UserRepository;

@Service
public class OauthService extends DefaultOAuth2UserService {
    //DefaultOAuth2UserService OAuth2UserService의 구현체

    private final SocialRepository socialRepository;
    private final UserRepository userRepository;


    public OauthService(SocialRepository socialRepository, UserRepository userRepository) {

        this.socialRepository = socialRepository;
        this.userRepository = userRepository;

    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println(oAuth2User.getAttributes());

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        Oauth2Response oAuth2Response = null;
        if (registrationId.equals("google")) {

            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        }
        else {

            return null;
        }
        String username = oAuth2Response.getProvider()+" "+oAuth2Response.getProviderId();
        SocialEntity existData = socialRepository.findByUsername(username);

        String role = "ROLE_USER";
        if (existData == null) {

            SocialEntity socialEntity = new SocialEntity();
            socialEntity.setUsername(username);
            socialEntity.setEmail(oAuth2Response.getEmail());
            socialEntity.setRole(role);

            socialRepository.save(socialEntity);
        }
        else {

            existData.setUsername(username);
            existData.setEmail(oAuth2Response.getEmail());

            role = existData.getRole();

            socialRepository.save(existData);
        }

        return new CustomOAuth2User(oAuth2Response, role);
    }


}
