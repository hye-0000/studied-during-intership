package kr.co.neighbor21.HyeYoung.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.neighbor21.HyeYoung.mapper.MapMapper;
import kr.co.neighbor21.HyeYoung.service.imple.MapServiceImpl;

@Service
public class MapService implements MapServiceImpl{
    /**TestServiceImple의 구현체를 작성하세요. (TestMapper로 부터 데이터 조회)*/
    @Autowired
    MapMapper mapper;

    @Override
    public ArrayList<HashMap<String, String>> getData(HashMap<String, String> param) {
        return mapper.getData(param);
    }

    @Override
    public ArrayList<HashMap<String, String>> getLineData(HashMap<String, String> param) {
        return mapper.getLineData(param);
    }
}
