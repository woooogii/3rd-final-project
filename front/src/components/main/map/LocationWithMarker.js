import React, { useEffect, useState } from 'react';
import './style/bicycleInfo.css';

const LocationWithMarker = ({ entities, locNow,getLocation }) => {
    const [overlays, setOverlays] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    useEffect(() => {
        //현재 위치 정보 불러올 수 있는지 확인
        if (!locNow) {
            console.log('위치 정보를 받아올 수 없습니다.');
            return;
        }
        console.log(locNow);//내 현재 위치(위도,경도)
        // 지도 생성
        const mapContainer = document.getElementById('map');
        const options = {
            center: locNow,
            level: 3,
        };
        const newMap = new window.kakao.maps.Map(mapContainer, options);

        // 마커 생성
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
        //마커 아이콘(변경가능..?)
        const imageSize = new window.kakao.maps.Size(24, 35);
        const newOverlays = [];
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
                        <div class="close" onclick="closeOverlay()" title="닫기"></div>
                    </div>
                    <div class="body"> 
                        <div class="desc"> 
                            <div class="ellipsis">${item.sta_add1}</div>
                            <div class="jibun ellipsis">대여 가능 수:${item.hold_num}</div>
                        </div>
                    </div>
                </div>  
            </div>`
            const overlay = new window.kakao.maps.CustomOverlay({
                content: content,
                map: newMap,
                position: marker.getPosition(),
                zIndex: 999
            });
            // 초기에 오버레이는 숨김 상태로 설정
            overlay.setMap(null);
            newOverlays.push(overlay);

            window.kakao.maps.event.addListener(marker, 'click', function() {
                // 이전에 클릭한 마커의 오버레이를 숨기기
                if (selectedMarker !== null) {
                    overlays[selectedMarker].setMap(null);
                }
                overlay.setMap(newMap);
                setSelectedMarker(newOverlays.indexOf(overlay));
            });

            window.kakao.maps.event.addListener(newMap, 'click', function() {
                // 지도 클릭 시 모든 오버레이 숨기기
                overlay.setMap(null);
                setSelectedMarker(null);
            });
        });

        // 오버레이들을 상태로 저장
        setOverlays(newOverlays);

        return () => {
            // 컴포넌트가 언마운트될 때 마커와 지도를 제거
            newMap.relayout();
        };
    }, [entities, locNow]);

    return (
    <div>
        <button onClick={getLocation}>내위치찾기</button>
        <div id="map" style={{ width: '800px', height: '400px' }}></div>
    </div>
    );
};

export default LocationWithMarker;
