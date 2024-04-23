import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './join.css';

const Join = () => {
    const navigate = useNavigate();
    const [uid, setuId] = useState('');
    const [upwd, setuPwd] = useState('');
    const [upwd2, setuPwd2] = useState('');
    const [uname, setuName] = useState('');
    const [uphone, setuPhone] = useState('');
    const [uaddress, setuAddress] = useState('');
    const [uaddrdetail, setuAddrDetail] = useState('');
    const [pwdMismatch, setPwdMismatch] = useState(false);

    const joinForm = {
        uid: uid,
        upwd: upwd,
        uname: uname,
        uphone: uphone,
        uaddress: uaddress,
        uaddrdetail: uaddrdetail,
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // 비밀번호 일치 여부 확인
        if (upwd !== upwd2) {
            setPwdMismatch(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/pedal/join', joinForm);
            if (response.data === true) {
                alert('가입이 완료되었습니다.');
                navigate('/pedal/login');
            } else {
                console.log('가입 실패');
            }
        } catch (error) {
            console.log('가입 오류:', error);
        }
    };

    const handleEmailVerification = () => {
        // 여기에 이메일 인증 처리 로직 추가
        console.log('이메일 인증 시작');
    };

    return (
        <div className='join-container'>
            <div className='join-box'>
                <h2 className="join-title">회원가입</h2>
                <form onSubmit={onSubmit}>
                    <div className="join-form-group email-form">
                        <input className="join-input" type="text" value={uid} onChange={(e) => setuId(e.target.value)} placeholder="이메일" required />
                        <button className="join-email-button" type="button" onClick={handleEmailVerification}>인증</button>
                    </div>
                    <div className="join-form-group">
                        <input className="join-input" type="password" value={upwd} onChange={(e) => setuPwd(e.target.value)} placeholder="비밀번호" required />
                    </div>
                    <div className="join-form-group">
                        <input className="join-input" type="password" value={upwd2} onChange={(e) => setuPwd2(e.target.value)} placeholder="비밀번호 확인" required />
                        {pwdMismatch && <p className="join-error-message">비밀번호가 일치하지 않습니다.</p>}
                    </div>
                    <div className="join-form-group">
                        <input className="join-input" type="text" value={uname} onChange={(e) => setuName(e.target.value)} placeholder="이름" required />
                    </div>
                    <div className="join-form-group">
                        <input className="join-input" type="text" value={uphone} onChange={(e) => setuPhone(e.target.value)} placeholder="전화번호" required />
                    </div>
                    <div className="join-form-group">
                        <input className="join-input" type="text" value={uaddress} onChange={(e) => setuAddress(e.target.value)} placeholder="주소" required />
                    </div>
                    <div className="join-form-group">
                        <input className="join-input" type="text" value={uaddrdetail} onChange={(e) => setuAddrDetail(e.target.value)} placeholder="상세주소" required />
                    </div>
                    <div className="join-form-group">
                        <button className='join-button' type="submit">가입하기</button>
                        <button className='join-button' type="button" onClick={() => navigate('/pedal/login')}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Join;