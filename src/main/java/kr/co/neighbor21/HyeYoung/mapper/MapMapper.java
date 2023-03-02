package kr.co.neighbor21.HyeYoung.mapper;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MapMapper {
    public ArrayList<HashMap<String, String>> getData(HashMap<String, String> param);
    public ArrayList<HashMap<String, String>> getLineData(HashMap<String, String> param);
}
