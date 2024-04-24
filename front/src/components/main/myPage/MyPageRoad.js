import React, { useState } from 'react';
import MyPageRoadPop from './MyPageRoadPop';
import MyPagePopUp from './MyPagePopUp';

const MyPageRoad = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPostCode = () => {
        setIsPopupOpen(true);
    };

    const closePostCode = () => {
        setIsPopupOpen(false);
    };

    return (
        <div>
            <button type='button' onClick={openPostCode}>우편번호 검색</button>
            {isPopupOpen && (
                <MyPageRoadPop>
                    <MyPagePopUp onClose={closePostCode} />
                </MyPageRoadPop>
            )}
        </div>
    );
};

export default MyPageRoad;