package kr.co.neighbor21.HyeYoung.controller;



import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import kr.co.neighbor21.HyeYoung.service.MapService;

@Controller
public class YoungController {

    @GetMapping("/hello")
    public String getHello(){
        return "hello";
    }

    @GetMapping("/index")
    public String getIndex(){
        System.out.println("=================index");
        return "index";
    }


    @Autowired
    MapService service;
    
    @GetMapping("/map")
    public String getMap(){
        System.out.println("=================map");
        return "map";
    }

    @PostMapping("/getData")
    @ResponseBody
    public String getData(@RequestBody HashMap<String, String> param){
        Gson gson = new Gson();
        ArrayList<HashMap<String, String>> rData = service.getData(param);
        return gson.toJson(rData);
    }

    @PostMapping("/getLineData")
    @ResponseBody
    public String getLineData(@RequestBody HashMap<String, String> param){
        Gson gson = new Gson();
        ArrayList<HashMap<String, String>> rData = service.getLineData(param);
        return gson.toJson(rData);
    }

    // @GetMapping("/postit")
    // public String getPostit(){
    //     System.out.println("==============postit");
    //     try {
    //         // for (PostitVO vo : postitService.getData()) {
    //         //     System.out.println(vo.toString());
    //         // }
    //     } catch (Exception e) {
    //         System.out.println("으갹");
    //         e.printStackTrace();
    //     }
    //     return "postit";
    // }
    
    // @Resource(name = "postitService")
    // private PostitService postitService;

    // @RequestMapping(value="/getData")
    // @ResponseBody
    // public String getData() throws SQLException{
    //     List<postitVO> vo = null;
    //     Gson gson = new Gson();
    //     try{
    //         vo = postitService.getData();
            
    //     }catch(SQLException e){
    //         System.out.println("으갹");
    //         e.printStackTrace();
    //     }
    //     System.out.println(vo);
    //     return gson.toJson(vo);
    //     //return "resources/templates/postit";
    //     //Gson gson = new Gson();
        
    // }

    
}