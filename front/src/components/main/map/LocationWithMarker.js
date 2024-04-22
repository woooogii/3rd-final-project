import React, { useEffect, useState } from 'react';
import './style/bicycleInfo.css';

const LocationWithMarker = ({ entities, locNow, getLocation }) => {
  const closeResult = () => {
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // 결과 창 비우기
  };

  useEffect(() => {
    // 지도 생성
    const mapContainer = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.4989896, 127.0317389),
      level: 6,
    };
    const newMap = new window.kakao.maps.Map(mapContainer, options);

    // 마커 생성
    const imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    //마커 아이콘(변경가능..?)
    const imageSize = new window.kakao.maps.Size(24, 35);
    entities.forEach((item) => {
      const position = new window.kakao.maps.LatLng(item.sta_lat, item.sta_long);
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

      const marker = new window.kakao.maps.Marker({
        map: newMap,
        position: position,
        title: item.sta_loc,
        image: markerImage,
      });
      let content = `
            <div class="wrap">
                <div class="info">
                    <div class="title"> 
                        ${item.rent_id_nm}
                        <div class="close" title="닫기"></div>
                    </div>
                    <div class="body"> 
                        <div class="desc"> 
                            <div class="ellipsis">${item.sta_add1}</div>
                            <div class="jibun ellipsis">대여 가능 수:${item.hold_num}</div>
                        </div>
                    </div>
                </div>  
            </div>
            `;
      window.kakao.maps.event.addListener(marker, 'click', function () {
        newMap.panTo(marker.getPosition());
        let message = content;

        let resultDiv = document.getElementById('result');
        resultDiv.innerHTML = message;

        // 마커 클릭 시 close 버튼에 이벤트 연결
        const closeBtn = resultDiv.querySelector('.close');
        closeBtn.addEventListener('click', closeResult);
      });
    });
    return () => {
      // 컴포넌트가 언마운트될 때 마커와 지도를 제거
      newMap.relayout();
    };
  }, [entities, locNow]);

  return (
    <div className="map_wrap">
      <button onClick={getLocation}>내위치찾기</button>
      <div id="map" style={{ width: '800px', height: '400px', position: 'relative', overflow: 'hidden' }}></div>
      <div id="result"></div>
    </div>
  );
};

export default LocationWithMarker;
