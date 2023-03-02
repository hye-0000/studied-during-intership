package kr.co.neighbor21.HyeYoung.service;

import java.sql.SQLException;
import java.util.List;

import kr.co.neighbor21.HyeYoung.VO.postitVO;

public interface PostitService {
    List<postitVO> getData() throws SQLException;

    public void saveData(String postitVO);

    public void delData() throws SQLException;

}
