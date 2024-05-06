import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './style/bicycleInfo.css';
import SearchModal from './SearchModal';

import { TbCurrentLocation } from "react-icons/tb";
import { CgSearch } from "react-icons/cg";
import { FaRegStar } from "react-icons/fa";
import ItemLocation from './ItemLocation';
import Likesdata from './Likesdata';


const LocationWithMarker = ({ entities}) => {
  const [content, setContent] = useState({sid:'',rent_id_nm:'',sta_add1:'',hold_num:''});
  const [isOpen,setIsOpen] = useState(false);//마커 클릭
  const [isShow,setIsShow] = useState(false);//검색 모달
  const [isLike,setIsLike] = useState(false);//즐겨찾기 모달

  const loginUser = useSelector((state) => state.loginUser);
  const navigate = useNavigate();

  const mapRef = useRef(null);

  useEffect(() => {
    // 지도 생성
    const mapContainer = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.4989896, 127.0317389),
      level: 2,
    };
    mapRef.current = new window.kakao.maps.Map(mapContainer, options);

    // 마커 생성
    const imageSrc = '/main-banner-image/free-icon-cycle-lane-5695618.png';
    const imageSize = new window.kakao.maps.Size(46, 46);

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
          sid: item.rent_id,
          rent_id_nm: item.rent_id_nm,
          sta_add1: item.sta_add1,
          hold_num: item.hold_num,
        });
        marker.setImage(new window.kakao.maps.MarkerImage(imageSrc, imageSize));
        openResult();
      });
    });
    if (mapRef.current) {
      mapRef.current.relayout();
    }
  }, [entities]);

  const getLocation=()=>{
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const locPosition = new window.kakao.maps.LatLng(lat, lon)
        mapRef.current.setCenter(locPosition); 
    },(error)=>{
        console.error(error)
    },
    { enableHighAccuracy: true }
    );
}
  
  //마커 클릭 이벤트
  const closeResult = () => { // 닫기 버튼 클릭 시 창 삭제
    setIsOpen(false);
  };
  const openResult = () => { // 마커 클릭 시 결과 창 열기
    setIsOpen(true);
  };
  
  //검색
  const onOpenModal=()=>{
    setIsShow(true);
    setIsOpen(false);
  }
  const onCloseModal=()=>{
      setIsShow(false);
  }
  //넘어온 값으로 지도 위치 재설정
  const handleClick=(data)=>{
    const bounds = new window.kakao.maps.LatLngBounds();
      const placePosition = new window.kakao.maps.LatLng(data.sta_lat, data.sta_long);
      bounds.extend(placePosition);
      mapRef.current.setBounds(bounds);
      onCloseModal();
  }
  
  //즐겨찾기
  const searchLikes=()=>{
    if (!loginUser.uid) {
      alert('로그인 후 사용 가능합니다.');
      navigate('/pedal/login');
      return;
    }else{
      setIsLike(true);
      setIsOpen(false);
    }
  }
  const handleLikeClick=(data)=>{
    const bounds = new window.kakao.maps.LatLngBounds();
    const placePosition = new window.kakao.maps.LatLng(data.staLat, data.staLong);
    bounds.extend(placePosition);
    mapRef.current.setBounds(bounds);
    setContent({
      sid: data.rentId,
      rent_id_nm: data.rentIdNm,
      sta_add1: data.staAddr,
      hold_num: data.holdNum,
    });
    onCloseLike();
    setIsOpen(true);
  }

  const onCloseLike=()=>{
    setIsLike(false)
  }

  return (
    <div className='map-container'>
      <div className='map-header'>
        <h3>대여소 안내</h3>
      </div>
      <div id='map' className='map-show' ref={mapRef}></div>
      <div className="bi-location" onClick={getLocation}>
          <TbCurrentLocation className="bi-location-icon"/>
      </div>
      <div>
        {isOpen && <ItemLocation content={content} closeResult={closeResult}/>}
      </div>
      <div className="bi-search" onClick={onOpenModal}>
        <CgSearch className="bi-search-icon" />
      </div>
      <div className="bi-like" onClick={searchLikes}>
        <FaRegStar className="bi-like-icon" />
      </div>
      {isShow && <SearchModal onCloseModal={onCloseModal} handleClick={handleClick}/> }
      {isLike && <Likesdata onCloseLike={onCloseLike} uid = {loginUser.uid} handleClick={handleLikeClick}/>}
    </div>
  );
};

export default LocationWithMarker;

