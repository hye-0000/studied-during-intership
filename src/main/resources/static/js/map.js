var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
mapOption = { 
    center: new kakao.maps.LatLng(35.58916335139806, 129.36841501924968), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 

// /**
//  * @description 지도 중심 좌표 이동 시키기
//  */
// function setCenter(){
//     var moveLatLon = new kakao.maps.LatLng(35.58916335139806, 129.36841501924968);

//     map.setCenter(moveLatLon);
// }

// /**
//  * @description 지도 중심 좌표 부드럽게 이동 시키기
//  */
//  function panTo(){
//     var moveLatLon = new kakao.maps.LatLng(35.58916335139806, 129.36841501924968);

//     map.panTo(moveLatLon)
// }

// //지도 레벨을 표시
// displayLevel();

// /**
//  * @description 지도 레벨을 증가 시킴(확대)
//  * - 지도 레벨은 지도의 확대 수준을 의미<br>
//  * - 지도 레벨은 1~14까지 존재, 숫자가 작을수록 확대 수준이 높음
//  */
// function zoomIn(){
//     var level = map.getLevel();
//     map.setLevel(level - 1);
//     displayLevel();
// }

// /**
//  * @description 지도 레벨을 감소 시킴(축소)
//  */
// function zoomOut(){
//     var level = map.getLevel();
//     map.setLevel(level + 1);
//     displayLevel();
// }

// function displayLevel(){
//     var levelEl = document.getElementById('maplevel');
//     // levelEl.innerHTML = "현재 지도 레벨은 " + map.getLevel() + " 레벨 입니다.";
// }

// //지도 정보 얻어오기
// // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
// var mapTypeControl = new kakao.maps.MapTypeControl();

// // 지도 타입 컨트롤을 지도에 표시합니다
// map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// function getInfo() {
//     // 지도의 현재 중심좌표를 얻어옵니다 
//     var center = map.getCenter(); 
    
//     // 지도의 현재 레벨을 얻어옵니다
//     var level = map.getLevel();
    
//     // 지도타입을 얻어옵니다
//     var mapTypeId = map.getMapTypeId(); 
    
//     // 지도의 현재 영역을 얻어옵니다 
//     var bounds = map.getBounds();
    
//     // 영역의 남서쪽 좌표를 얻어옵니다 
//     var swLatLng = bounds.getSouthWest(); 
    
//     // 영역의 북동쪽 좌표를 얻어옵니다 
//     var neLatLng = bounds.getNorthEast(); 
    
//     // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
//     var boundsStr = bounds.toString();
    
    
//     var message = '지도 중심좌표는 위도 ' + center.getLat() + ', <br>';
//     message += '경도 ' + center.getLng() + ' 이고 <br>';
//     message += '지도 레벨은 ' + level + ' 입니다 <br> <br>';
//     message += '지도 타입은 ' + mapTypeId + ' 이고 <br> ';
//     message += '지도의 남서쪽 좌표는 ' + swLatLng.getLat() + ', ' + swLatLng.getLng() + ' 이고 <br>';
//     message += '북동쪽 좌표는 ' + neLatLng.getLat() + ', ' + neLatLng.getLng() + ' 입니다';
    
//     // 개발자도구를 통해 직접 message 내용을 확인해 보세요.
//     // ex) console.log(message);
// }

// // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
// var mapTypeControl = new kakao.maps.MapTypeControl();

// // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
// map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
// var zoomControl = new kakao.maps.ZoomControl();
// map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// // 버튼 클릭에 따라 지도 이동 기능을 막거나 풀고 싶은 경우에는 map.setDraggable 함수를 사용합니다
// function setDraggable(draggable) {
//     // 마우스 드래그로 지도 이동 가능여부를 설정합니다
//     map.setDraggable(draggable);    
// }

import { AF } from "./aljjabaegi-3.0.0.js";
import { AF_cookie } from "./aljjabaegi-3.0.0.js";
import { AF_date } from "./aljjabaegi-3.0.0.js";
(() => {
    "use strict";
    AF.onload(function(){
        getData();
        getLineData();
    });
    const getData = () => {
        /** test_bsta의 좌표 정보를 받아옴*/
        const url = "/HYEYOUNG/getData";
        AF.fetch(url, {body: {}, method: 'POST'}).then(response => {
            setData(response);
        });       
    }

    const getLineData = () => {
        /**test_link의 좌표 정보를 가져옴*/
        const url = "/HYEYOUNG/getLineData";
        AF.fetch(url, {body: {}, method: 'POST'}).then(response => {           
            setLine(response);
        });       
    }
   
    let bounds = map.getBounds();
    let markers = [],
        polyline;
    /**
     * @description 받아온 데이터로 지도에 마커를 생성함
     * @param {Object} data 
     * - LAT, LNG
     */
    const setData = (data) => {
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";   
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35);     
        // 마커 이미지를 생성합니다    
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);     

        
        for(let d of data){
            var latlng = new kakao.maps.LatLng(d['LAT'], d['LNG']);            

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: latlng, // 마커를 표시할 위치
                image : markerImage // 마커 이미지 
            });  
            
            markers.push(marker);
        }


        // if(bounds.contain(marker.getPosition()==true))

        var markerschool = new kakao.maps.Marker({
            map: map, 
            position: new kakao.maps.LatLng(37.2228, 127.1902),
            image: markerImage
        })        
        console.log(markerschool)
    }
    
   
    /**
     * @description 받아온 데이터로 지도에 선을 생성함
     * @param {Object} data
     * - LAT, LMG
     */
    const setLine = (data) => {
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        var linePath = [];           
        for(let d of data){
            linePath.push(new kakao.maps.LatLng(d['LAT'], d['LNG']))
        }
        // 지도에 표시할 선을 생성합니다
        polyline = new kakao.maps.Polyline({
            path: linePath, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: '#FF0000', // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid' // 선의 스타일입니다
        });
        // 지도에 선을 표시합니다   
        polyline.setMap(map);       
    }
        
    function updateMarkers(map, markers) {
    
        var mapBounds = map.getBounds();
        var marker, position;
    
        for (var i = 0; i < markers.length; i++) {

            marker = markers[i]
            position = marker.getPosition();
    
            if (mapBounds.contain(position)) {
                showMarker();
            } else {
                hideMarker();
            }
        }
    }
    // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
    function setMarkers(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }   
        polyline.setMap(map);         
    }
    
    function showMarker() {
        setMarkers(map) 
    }
    
    function hideMarker() {   
        setMarkers(null);
    }

    kakao.maps.event.addListener(map, 'zoom_changed', function() {
        if(this.getLevel() <= 6){
            updateMarkers(map, markers)
        }    
        else{
            hideMarker();
            //polyline.setMap(null);
        }
    });

    AF_cookie.setCookie({key: "LAT", value: "35.58916335139806"});
    AF_cookie.setCookie({key: "LNG", value: "129.36841501924968"});
})();