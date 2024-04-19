import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const navigate = useNavigate();
    const [userForm, setUserForm] = useState({
        uid: '',
        upwd: '',
    });

    const handleChange = (e) => {
        const {id, value} = e.target
        setUserForm({...userForm, [id]: value})
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/pedal/login',userForm,{
                withCredentials: true, //쿠키 접근 가능하게
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            
           
            if(response.status !== 200){
                throw new Error('아이디,비밀번호 오류')
            }
            alert('로그인완료')
            navigate('/pedal/home')
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            아이디:  <input type='text' id='uid' onChange={handleChange}/> <br/>
            비밀번호:  <input type='text' id='upwd' onChange={handleChange}/> <br/>
            <button type='submit' >로그인</button>
            </form>
            <Link to="/pedal/join">회원가입</Link>
        </div>
    );
};

export default Login;