import React from 'react';
import styles from './MyPageCss.css';

const MainPageDefault = ({ setActiveComponent, tokenType }) => {
    // 구글 로그인 사용자와 일반 JWT 사용자에게 다른 내용 표시
    return (
        <div style={{backgroundColor: '#ffffff'}} className='defaultContainer'>
            {tokenType === 'googleJwtToken' ? (
                <div>
                   
                    <p>이거시 구글 로그인의 디폴트 페이지.</p>
                </div>
            ) : (
                <>
                    <div className="card text-end">
                        <div className="card-body">
                            <h5 className="card-title">개인정보</h5>
                            <p className="card-text"><b> / </b></p>
                            <button onClick={() => setActiveComponent('info')} className='btn' style={{backgroundColor: '#1675F2', fontSize: '17px'}}>개인정보 조회 및 수정</button>
                            <button onClick={() => setActiveComponent('checkpwd')} className='btn' style={{backgroundColor: '#1675F2', fontSize: '17px'}}>비밀번호 변경</button>
                        </div>
                    </div>

                    <br/>

                    <div className="card text-end">
                        <div className="card-body" style={{backgroundColor: '#f8f9fa'}}>
                            <h5 className="card-title">나의 이용 내역</h5>
                            <p className="card-text"><b>/</b></p>
                            <button onClick={() => setActiveComponent('tickets')} className='btn' style={{backgroundColor: '#1675F2', fontSize: '17px'}}>티켓 구매 내역</button>
                            <button onClick={() => setActiveComponent('checkpwd')} className='btn' style={{backgroundColor: '#1675F2', fontSize: '17px'}}>상점 이용 내역</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MainPageDefault;