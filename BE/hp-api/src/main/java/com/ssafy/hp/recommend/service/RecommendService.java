package com.ssafy.hp.recommend.service;

import com.ssafy.hp.user.domain.User;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public interface RecommendService {
    JSONArray recommendExercise(String uri);
    JSONArray recommendExercise(String uri, User user);
    JSONArray recommendExercise(String uri, User user, String exerciseId);
    JSONArray recommendPill(String uri);
    JSONArray recommendPill(String uri, User user);
    JSONArray recommendPill(String uri, User user, String pillId);
}
