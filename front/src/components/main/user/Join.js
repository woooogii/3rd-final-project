import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './join.css';



const Join = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        uid: '',
        upwd: '',
        upwd2: '',
        uname: '',
        uphone: '',
        uaddress: '',
        uaddrdetail: '',
    });
    const [pwdLengthError, setPwdLengthError] = useState(false);
    const [emailFormatError, setEmailFormatError] = useState(false);

    // 이메일 형식 검사
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    // 비밀번호 길이 검사
    const validatePasswordLength = () => {
        return form.upwd.length >= 8;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // 이메일 형식 검사
        setEmailFormatError(!validateEmail(form.uid));

        // 비밀번호 길이 검사
        setPwdLengthError(!validatePasswordLength());

        // 비밀번호 일치 여부 검사
        const pwdMismatch = form.upwd !== form.upwd2;

        // 유효성 검사 통과 여부 확인
        if (!validateEmail(form.uid) || !validatePasswordLength() || pwdMismatch) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/pedal/join', form);
            if (response.data === true) {
                console.log(form)
                alert('가입이 완료되었습니다.');
                navigate('/pedal/login');
            } else {
                console.log('가입 실패');
            }
        } catch (error) {
            console.log('가입 오류:', error);
        }
    };

    const handleEmailVerification = async () => {
        
        try {
            const response = await axios.post('http://localhost:4000/pedal/email-certification', form);
            
            
            // 1. 카트랑 오더리스트에 이미지 넣기 
           
            // 1. css점검 

            // 1.인증버튼은 비활성화 상태
            // 2.이메일을 적으면 인증버튼이 활성화됨
            // 3.누르면 지금 이 함수가 실행됨
            // 4.인풋칸 하나가 더 생김(4자리 입력할거)
            // 5.그럼 이메일을 받게됨 숫자 4자리
            // 6.맞게 쓰고 누르면(틀리면 틀렸다고 빨간 메세지) 사용 가능한 이메일입니다 띄우면서 통과. 
            //     근데 버튼누르면 서버에 요청 한번 더해야됨 "pedal/check-certification" 여기로 
            
            // 7.이건 시간 되면 비밀번호 찾기도 한번 추가 
            // 8.비번은 걍 난수 보내주고 그거로 비번 업데이트해서 다시 비번 수정시키기 등등등등



        } catch (error) {
            
        }

        console.log('이메일 인증 시작');
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm({ ...form, [id]: value });
    
        // 이메일 형식 검사
        if (id === 'uid') {
            setEmailFormatError(!validateEmail(value));
        }
    
        // 비밀번호 길이 검사
        if (id === 'upwd') {
            setPwdLengthError(value.length < 8);
        }
    };

    return (
        <div className='join-container'>
            <div className='join-box'>
                <h2 className="join-title">회원가입</h2>
                <form onSubmit={onSubmit}>
                    <div className="join-form-group email-form">
                        <input className="join-input" type="text" id="uid" value={form.uid} onChange={handleChange} placeholder="이메일" required />
                        <button className="join-email-button" type="button" onClick={handleEmailVerification}>인증</button>
                    </div>
                    {emailFormatError && <p className="join-error-message">올바른 이메일 형식이 아닙니다.</p>}
                    <div className="join-form-group">
                        <input className="join-input" type="password" id="upwd" value={form.upwd} onChange={handleChange} placeholder="비밀번호" required />
                    </div>
                    {pwdLengthError && <p className="join-error-message red">비밀번호는 8자 이상이어야 합니다.</p>}
                    <div className="join-form-group">
                        <input className="join-input" type="password" id="upwd2" value={form.upwd2} onChange={handleChange} placeholder="비밀번호 확인" required />
                    </div>
                    <div>
                        {form.upwd !== form.upwd2 && <p className="join-error-message red">비밀번호가 일치하지 않습니다.</p>}
                    </div>
                    <div className="join-form-group">
                        <input className="join-input" type="text" id="uname" value={form.uname} onChange={handleChange} placeholder="이름" required />
                    </div>
                    <div className="join-form-group">
                        <input className="join-input" type="text" id="uphone" value={form.uphone} onChange={handleChange} placeholder="전화번호" required />
                    </div>
                    <div className="join-form-group">
                        <input className="join-input" type="text" id="uaddress" value={form.uaddress} onChange={handleChange} placeholder="주소" required />
                    </div>
                    <div className="join-form-group">
                        <input className="join-input" type="text" id="uaddrdetail" value={form.uaddrdetail} onChange={handleChange} placeholder="상세주소" required />
                    </div>
                    <div className="join-form-group">


                        <button type="button" id='btn' class="btn btn-outline-primary" onClick={() => navigate('/pedal/login')}  style={{borderRadius:'20px', fontSize:'17px',}} >&nbsp; 취소하기 &nbsp;</button>
                        <button type="submit" id='btn'  class="btn btn-primary" style={{borderRadius:'20px', fontSize:'17px'}} >&nbsp;가입하기&nbsp;</button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Join;
