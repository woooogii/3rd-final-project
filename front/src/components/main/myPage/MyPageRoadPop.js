import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const MyPageRoadPop = ({ children }) => {
    const portalElement = useRef(null);

    useEffect(() => {
        // 포탈 대상 요소 생성
        const el = document.createElement('div');
        el.id = 'MyPageRoadPop';
        document.body.appendChild(el);
        portalElement.current = el;

        // 컴포넌트 언마운트 시 요소 제거
        return () => {
            document.body.removeChild(el);
        };
    }, []);

    // 포탈 요소가 준비되지 않았다면 렌더링하지 않음
    if (!portalElement.current) {
        return null;
    }

    return ReactDOM.createPortal(children, portalElement.current);
};

export default MyPageRoadPop;