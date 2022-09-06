package com.ssafy.hp.security.oauth;

import com.ssafy.hp.user.domain.type.Provider;
import lombok.*;

import javax.persistence.*;
import java.util.Map;


@Embeddable
@Access(AccessType.FIELD) // getXXX 메서드가 getter 가 아닌 필드임을 명시
@SuppressWarnings("JpaAttributeTypeInspection") // attribute type을 map으로 사용하기 위해 나타나는 warning 제거
public abstract class OAuth2UserInfo {

    protected Map<String, Object> attributes;

    public OAuth2UserInfo() {
    }

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public abstract String getUserEmail();

    public abstract Provider getUserProvider();

    public abstract String getUserProviderId();

    public abstract String getUserName();
}
