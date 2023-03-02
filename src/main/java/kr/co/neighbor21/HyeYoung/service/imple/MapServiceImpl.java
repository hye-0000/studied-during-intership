package kr.co.neighbor21.HyeYoung.service.imple;

import java.util.ArrayList;
import java.util.HashMap;

public interface MapServiceImpl {
    public ArrayList<HashMap<String, String>> getData(HashMap<String, String> param);
    public ArrayList<HashMap<String, String>> getLineData(HashMap<String, String> param);
}
