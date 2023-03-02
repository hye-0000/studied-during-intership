package kr.co.neighbor21.HyeYoung.service;

import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import kr.co.neighbor21.HyeYoung.VO.postitVO;
import kr.co.neighbor21.HyeYoung.mapper.PostitMapper;

@Service("postitService")
public class PostitServiceImpl implements PostitService {
    private Gson gson = new Gson();
    @Resource(name = "postitMapper")
    private PostitMapper postitMapper;

    @Override
    public List<postitVO> getData() throws SQLException {
        return postitMapper.getData();
    }

    @Override
    public void saveData(String postitVO) {

        postitMapper.saveData(Arrays.asList(gson.fromJson(postitVO, PostitMapper[].class)));
    }

    @Override
    public void delData() throws SQLException {
        postitMapper.delData();
    }
}
