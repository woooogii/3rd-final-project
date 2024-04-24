import React, { useEffect, useRef, useState } from 'react';
import './style/bicycleInfo.css';
import { FaSearchLocation } from "react-icons/fa";
import SearchModal from './SearchModal';

const LocationWithMarker = ({ entities, locNow, getLocation }) => {
  const [content, setContent] = useState({rent_id_nm:'',sta_add1:'',hold_num:''});
  const [isOpen,setIsOpen] = useState(false);//마커 클릭
  const [isShow,setIsShow] = useState(false);//검색 모달
  const mapRef = useRef(null);

  useEffect(() => {
    // 지도 생성
    const mapContainer = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.4989896, 127.0317389),
      level: 6,
    };
    mapRef.current = new window.kakao.maps.Map(mapContainer, options);

    // 마커 생성
    const imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
     imageSize = new window.kakao.maps.Size(24, 35);

    entities.forEach((item) => {
      const position = new window.kakao.maps.LatLng(item.sta_lat, item.sta_long),
      markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

      const marker = new window.kakao.maps.Marker({
        map: mapRef.current,
        position: position,
        title: item.sta_loc,
        image: markerImage,
      });
      window.kakao.maps.event.addListener(marker, 'click', function () {
        mapRef.current.panTo(marker.getPosition());
        setContent({
          rent_id_nm: item.rent_id_nm,
          sta_add1: item.sta_add1,
          hold_num: item.hold_num,
        });
        openResult();

      });
    });
    return () => {
      // 컴포넌트가 언마운트될 때 마커와 지도를 제거
      mapRef.current.relayout();
    };
  }, [entities, locNow]);
  
  //마커 클릭 이벤트
  const closeResult = () => { // 닫기 버튼 클릭 시 창 삭제
    setIsOpen(false);
  };
  const openResult = () => { // 마커 클릭 시 결과 창 열기
    setIsOpen(true);
  };
  
  //검색 이벤트
  const onOpenModal=()=>{
    setIsShow(true)
  }
  const onCloseModal=()=>{
      setIsShow(false)
  }
  //넘어온 값으로 지도 위치 재설정
  const handleClick=(data)=>{
    const bounds = new window.kakao.maps.LatLngBounds();
      const placePosition = new window.kakao.maps.LatLng(data.sta_lat, data.sta_long);
      bounds.extend(placePosition);
      mapRef.current.setBounds(bounds);
  }

  return (
    <div className="map_wrap">
      <button onClick={getLocation}>내위치찾기</button>

      <div id="map" style={{ width: '800px', height: '400px', position: 'relative', overflow: 'hidden' }}></div>
      {isOpen && 
          <div className="wrap">
            <div className="info" id='content'>
                <div className="title"> 
                    {content.rent_id_nm}
                    <div className="close" title="닫기" onClick={closeResult}></div>
                </div>
                <div className="body"> 
                    <div className="desc"> 
                        <div className="ellipsis">{content.sta_add1}</div>
                        <div className="jibun ellipsis">대여 가능 수:
                        {content.hold_num>0?content.hold_num:0}</div>
                    </div>
                </div>
            </div>  
          </div>
        }

      <div className="bi bi-search" onClick={onOpenModal}>
        <FaSearchLocation/>
        {isShow && <SearchModal onCloseModal={onCloseModal} handleClick={handleClick}/> }
      </div>
      
    </div>
  );
};

export default LocationWithMarker;
