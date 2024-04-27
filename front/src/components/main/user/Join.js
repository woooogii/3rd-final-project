import React, { useState, useEffect } from 'react';
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
        certification: ''
    });
    const [pwdLengthError, setPwdLengthError] = useState(false);
    const [emailFormatError, setEmailFormatError] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [showCertificationInput, setShowCertificationInput] = useState(false);
    const [isCertified, setIsCertified] = useState(false); // 추가: 인증 완료 여부

    // 이메일 형식 검사
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    // 비밀번호 길이 검사
    const validatePasswordLength = () => {
        return form.upwd.length >= 8;
    };

    useEffect(() => {
        // 인증 완료 후 버튼 상태 변경
        if (isCertified) {
            setEmailFormatError(false); // 인증 완료 시 이메일 형식 오류 해제
        }
    }, [isCertified]);

    const onSubmit = async (e) => {
        e.preventDefault();

        // 이메일 형식 검사
        setEmailFormatError(!validateEmail(form.uid));

        // 비밀번호 길이 검사
        setPwdLengthError(!validatePasswordLength());

        // 비밀번호 일치 여부 검사
        const pwdMismatch = form.upwd !== form.upwd2;

        // 유효성 검사 통과 여부 확인
        if (!validateEmail(form.uid) || !validatePasswordLength() || pwdMismatch || !isEmailVerified) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/pedal/join', form);
            if (response.data === true) {
                console.log(form);
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
            const response = await axios.post('http://localhost:4000/pedal/email-certification', { email: form.uid });
            if (response.data.code === "SU") {
                setIsEmailVerified(true);
                setIsCertified(true); // 추가: 인증 완료 상태 설정
                setShowCertificationInput(true);
            }
        } catch (error) {
            console.error('이메일 인증 오류:', error);
        }
    };

    const handleCertificationConfirmation = async () => {
        try {
            const response = await axios.post('http://localhost:4000/pedal/check-certification', {
                email: form.uid,
                certificationNumber: form.certification
            });

            if (response.data.code === "SU") {
                alert('인증완료');
                setIsEmailVerified(true);
                setShowCertificationInput(false);
            } else {
                alert('인증번호가 틀렸습니다');
            }

        } catch (error) {
            alert('인증번호가 틀렸습니다');
            console.error('이메일 인증 오류:', error);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm({ ...form, [id]: value });

        if (id === 'uid') {
            setEmailFormatError(!validateEmail(value));
            setIsCertified(false); // 이메일 변경 시 인증 완료 상태 초기화
        }

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
                        <input
                            className="join-input"
                            type="text"
                            id="uid"
                            value={form.uid}
                            onChange={handleChange}
                            placeholder="이메일"
                            required
                        />
                        <button
                            className={`join-email-button ${!validateEmail(form.uid) && 'disabled'}`}
                            type="button"
                            onClick={isCertified ? undefined : handleEmailVerification}
                            disabled={!validateEmail(form.uid) || isCertified} // 인증 완료 시 버튼 비활성화
                            style={{
                                backgroundColor: !validateEmail(form.uid) ? 'grey' : isCertified ? 'grey' : 'blue',
                                cursor: isCertified ? 'default' : 'pointer'
                            }}
                        >
                            {showCertificationInput ? "인증" : (isEmailVerified ? "완료" : "인증")}
                        </button>
                    </div>
                    {emailFormatError && <p className="join-error-message">올바른 이메일 형식이 아닙니다.</p>}
                    {!isEmailVerified && !showCertificationInput && <p className="join-error-message">이메일을 인증해주세요.</p>}
                    {showCertificationInput && (
                        <div className="join-form-group">
                            <input
                                className="join-input"
                                type="text"
                                id="certification"
                                value={form.certification}
                                onChange={handleChange}
                                placeholder="인증번호를 입력해주세요"
                                required
                            />
                            <button className="join-certification-button" onClick={handleCertificationConfirmation}>
                                확인
                            </button>
                        </div>
                    )}
                    <div className="join-form-group">
                        <input
                            className="join-input"
                            type="password"
                            id="upwd"
                            value={form.upwd}
                            onChange={handleChange}
                            placeholder="비밀번호"
                            required
                        />
                    </div>
                    {pwdLengthError && <p className="join-error-message red">비밀번호는 8자 이상이어야 합니다.</p>}
                    <div className="join-form-group">
                        <input
                            className="join-input"
                            type="password"
                            id="upwd2"
                            value={form.upwd2}
                            onChange={handleChange}
                            placeholder="비밀번호 확인"
                            required
                        />
                    </div>
                    {form.upwd !== form.upwd2 && <p className="join-error-message red">비밀번호가 일치하지 않습니다.</p>}
                    <div className="join-form-group">
                        <input
                            className="join-input"
                            type="text"
                            id="uname"
                            value={form.uname}
                            onChange={handleChange}
                            placeholder="이름"
                            required
                        />
                    </div>
                    <div className="join-form-group">
                        <input
                            className="join-input"
                            type="text"
                            id="uphone"
                            value={form.uphone}
                            onChange={handleChange}
                            placeholder="전화번호"
                            required
                        />
                    </div>
                    <div className="join-form-group">
                        <input
                            className="join-input"
                            type="text"
                            id="uaddress"
                            value={form.uaddress}
                            onChange={handleChange}
                            placeholder="주소"
                            required
                        />
                    </div>
                    <div className="join-form-group">
                        <input
                            className="join-input"
                            type="text"
                            id="uaddrdetail"
                            value={form.uaddrdetail}
                            onChange={handleChange}
                            placeholder="상세주소"
                            required
                        />
                    </div>
                    <div className="join-form-group join-buttons">
                        <button
                            type="button"
                            id="btn"
                            className="btn btn-outline-primary"
                            onClick={() => navigate('/pedal/login')}
                        >
                            취소하기
                        </button>
                        <button type="submit" id="btn" className="btn btn-primary">
                            가입하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Join;
