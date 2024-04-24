import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './user.css';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
    const navigate = useNavigate();
    const [userForm, setUserForm] = useState({
        uid: '',
        upwd: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserForm({ ...userForm, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/pedal/login', userForm, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

  
            if (response.status === 200) {
                console.log(response.data);
                alert(response.data)
                alert('로그인 완료');
                navigate('/pedal/home');
            } else {
                throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
            }
        } catch (error) {
            setErrorMessage('아이디 또는 비밀번호가 올바르지 않습니다.');
            console.log(error);
        }
    };

/*
    const googleLogin = async () => {
        
        try {
            const response = await axios.get("http://localhost:4000/oauth2/authorization/google")
            console.log(response.data)
        } catch (error) {
            
        }
    }
*/
    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className='login-title'>LOGIN</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input className="login-input" type="text" id="uid" placeholder="이메일" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <input className="login-input" type="password" id="upwd" placeholder="비밀번호" onChange={handleChange} required />
                    </div>
                    <button className="login-button" type="submit">로그인</button>
                </form>
             
                <p className='msg-box' style={{ color: 'red' }}>{errorMessage}</p>
                <div className="additional-options">
                    <div className="google-login">
                   {/* <FaGoogle onClick={()=>{googleLogin()}}/> */}
                   <a href="http://localhost:4000/oauth2/authorization/google"><FaGoogle/></a>
                    </div>
                    <div className="join-link">
                        <br/>
                        <Link to="/password-reset">비밀번호 찾기</Link>
                        <p>
                            아직 회원이 아니신가요? <Link to="/pedal/join">회원가입</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;