import React, { useState } from 'react';
import axios from 'axios';

const Join = () => {

    const [uid,setuId] = useState('');
    const [upwd,setuPwd] = useState('');
    const [uname,setuName] = useState('');
    const [uphone,setuPhone] = useState('');
    const [uaddress,setuAddress] = useState('');
    const [uaddrdetail,setuAddrDetail] = useState('');

    const joinForm = {
        uid:uid,
        upwd:upwd,
        uname:uname,
        uphone:uphone,
        uaddress:uaddress,
        uaddrdetail:uaddrdetail
    }

    const onSubmit = async(e) =>{
        e.preventDefault();

        try {
            //서버로 form을 post요청본고
            const response = await axios.post('http://localhost:4000/pedal/join',joinForm)
            console.log(response.data)
            //성공시 서버에선 true 반환
            if(response.data === true) {
                alert('가입이 완료되었습니다.')
                window.location.href = '/login'
            } else {
                console.log('가입 실패')
            }


        } catch (error) {
            console.log('가입오류:',error)
        }

    }



    return (
        <div>
            <form onSubmit={onSubmit}>
                아이디:  <input type='text' value={uid} onChange={(e)=>setuId(e.target.value)}/> <br/>
                비밀번호:  <input type='text' value={upwd} onChange={(e)=>setuPwd(e.target.value)}/> <br/>
                이름:  <input type='text' value={uname} onChange={(e)=>setuName(e.target.value)}/> <br/>
                전화번호:  <input type='text' value={uphone} onChange={(e)=>setuPhone(e.target.value)}/> <br/>
                주소:  <input type='text' value={uaddress} onChange={(e)=>setuAddress(e.target.value)}/> <br/>
                상세주소:  <input type='text' value={uaddrdetail} onChange={(e)=>setuAddrDetail(e.target.value)}/> <br/>

                <button type='submit'>회원가입</button>
                 
            </form>
        </div>
    );
};

export default Join;