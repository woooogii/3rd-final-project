import React, { useState } from 'react';
import Post from './post'; // 가정한 경로, 실제 경로에 맞게 수정 필요

const MpSnsInfo = () => {
    const [userInfo, setUserInfo] = useState({
        phone: '',
        address: ''
    });
    const [popup, setPopup] = useState(false);

    const handleInputChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    };

    const togglePopup = () => {
        setPopup(!popup);
    };

    const handleAddressInput = (newAddress) => {
        setUserInfo({
            ...userInfo,
            address: newAddress
        });
        togglePopup();
    };

    return (
        <div>
            전화번호 : <input type='text' name='phone' value={userInfo.phone} onChange={handleInputChange} placeholder='전화번호를 입력하세요'/> <br/>
            주소 : <input type='text' name='address' value={userInfo.address} onChange={handleInputChange} placeholder='주소를 입력하세요' readOnly/>
            <button onClick={togglePopup}>우편번호 찾기</button><br/>
            {popup && <Post company={userInfo} setcompany={(data) => handleAddressInput(data.address)}/>}
            상세주소: <input type='text' placeholder='상세주소를 입력하세요'/> <br/>
            <button>수정하기</button>
        </div>
    );
};

export default MpSnsInfo;