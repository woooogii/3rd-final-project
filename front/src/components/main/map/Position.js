import React, { useEffect, useState } from 'react';
import LocationWithMarker from './LocationWithMarker';


const Position = ({entities}) => {//현재 위치 불러오는 component
    const [locNow, setLocNow] = useState(null);
    
    useEffect(() => {
        getLocation();
    },[])
    //내위치 불러오기
    const getLocation=()=>{
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setLocNow(new window.kakao.maps.LatLng(lat, lon));
        },(error)=>{
            console.error(error)
        },
        { enableHighAccuracy: true }
        );
    }
    return (
        <div>
            
            <LocationWithMarker entities={entities} locNow={locNow} getLocation={getLocation}/>
        </div>
    );
};

export default Position;