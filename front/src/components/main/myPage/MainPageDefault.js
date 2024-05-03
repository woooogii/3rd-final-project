import React from 'react';
import './MyPageCss.css';

const MainPageDefault = ({ setActiveComponent, tokenType }) => {
    // 구글 로그인 사용자와 일반 JWT 사용자에게 다른 내용 표시
    return (
        <div className='defaultContainer'>
            {tokenType === 'googleJwtToken' ? (
                <div>
                   
                   
                    <div className="card text-end">
                        <div className="card-body">
                            <h5 className="card-title">나의 개인정보</h5>
                            <p className="card-text"><b> &nbsp; </b></p>   
                            <button type="button" class="btn btn-primary"  onClick={() => setActiveComponent('googleInfo')} style={{borderRadius:'20px', fontSize:'17px'}} >&nbsp;개인정보수정&nbsp;</button>
                        </div>
                    </div>
                    <br/>
                    <div className="card text-end">
                        <div className="card-body">
                            <h5 className="card-title">나의 이용정보</h5>
                            <p className="card-text"><b>  &nbsp; </b></p>
                            <button type="button" class="btn btn-primary"  onClick={() => setActiveComponent('tickets')} style={{borderRadius:'20px', fontSize:'17px'}} >&nbsp;티켓 구매 내역&nbsp;</button>
                            <button type="button" class="btn btn-primary"  onClick={() => setActiveComponent('orders')} style={{borderRadius:'20px', fontSize:'17px'}} >&nbsp;상점 이용 내역&nbsp;</button>
                        </div>
                    </div>
                    </div>   
                
            ) : (
                <>
                    <div className="card text-end">
                        <div className="card-body">
                            <h5 className="card-title">개인정보</h5>
                            <p className="card-text"><b> &nbsp;</b></p>
                            <button type="button" class="btn btn-primary"   onClick={() => setActiveComponent('info')} style={{borderRadius:'20px', fontSize:'17px'}} >&nbsp;개인정보수정&nbsp;</button>
                            <button type="button" class="btn btn-primary"   onClick={() => setActiveComponent('checkpwd')} style={{borderRadius:'20px', fontSize:'17px'}} >&nbsp;비밀번호수정&nbsp;</button>
                        </div>
                    </div>

                    <br/>

                    <div className="card text-end">
                        <div className="card-body" style={{backgroundColor: '#f8f9fa'}}>
                            <h5 className="card-title">나의 이용 내역</h5>
                            <p className="card-text"><b>&nbsp;</b></p>
                            <button type="button" class="btn btn-primary"  onClick={() => setActiveComponent('tickets')} style={{borderRadius:'20px', fontSize:'17px'}} >&nbsp;티켓 구매 내역&nbsp;</button>
                            <button type="button" class="btn btn-primary"  onClick={() => setActiveComponent('orders')} style={{borderRadius:'20px', fontSize:'17px'}} >&nbsp;상점 이용 내역&nbsp;</button>
                        </div>
                    </div>
                    
                  
                </>
            )}
              
                    
                    
        </div>
    );
};

export default MainPageDefault;