package kr.co.neighbor21.HyeYoung.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import kr.co.neighbor21.HyeYoung.VO.postitVO;

@Mapper
public interface PostitMapper {
    List<postitVO> getData() throws SQLException;

    public void saveData(List<PostitMapper> list);

    public void delData() throws SQLException;
}

