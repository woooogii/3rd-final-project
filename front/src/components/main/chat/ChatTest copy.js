import React, { useEffect, useState } from 'react';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

import './chat.css';
import { useSelector } from 'react-redux';

var stompClient =null;
const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState([]); 
    const loginUser = useSelector((state) => state.loginUser);
    const [tab,setTab] =useState("newChat");//클릭 시 새로운 채팅창 or 이전 문의내역
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
    });

    useEffect(()=>{
        console.log(loginUser.uid);
        console.log('userData 있음',userData);

        connect();
    },[loginUser.uid]);

    const connect =()=>{//대화 유저 연결
        let Sock = new SockJS('http://localhost:4000/pedal');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {//연결되면 실행
        setUserData({...userData,"username":loginUser.uid,"connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user'+userData.username+'/private', onPrivateMessage);
        userJoin();
    }
    const onError = (err) => {
        console.log(err);
    }

    const userJoin=()=>{
        console.log('userJoin');
          let chatMessage = {
            senderName: userData.username,
            status:"JOIN"
          };
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN":
                setPrivateChats(prevPrivateChats => {
                    const updatedPrivateChats = new Map(prevPrivateChats);
                    updatedPrivateChats.set(payloadData.senderName, []);
                    return updatedPrivateChats;
                });
                break;
            case "MESSAGE":
                setPublicChats(prevPublicChats => [...prevPublicChats, payloadData]);
                break;
        }
    }
    
    const onPrivateMessage = (payload) => {
        var payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            setPrivateChats(prevPrivateChats => { // 수정된 부분
                const updatedPrivateChats = new Map(prevPrivateChats);
                updatedPrivateChats.get(payloadData.senderName).push(payloadData);
                return updatedPrivateChats;
            });
        } else {
            setPrivateChats(prevPrivateChats => { // 수정된 부분
                const updatedPrivateChats = new Map(prevPrivateChats);
                updatedPrivateChats.set(payloadData.senderName, [payloadData]);
                return updatedPrivateChats;
            });
        }
    }

    const handleValue =(e)=>{
        const {value,name}=e.target;
        setUserData({...userData,[name]: value});
    }
    const sendValue=()=>{
            if (stompClient) {
              var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE"
              };
              console.log(chatMessage);
              stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
              setUserData({...userData,"message": ""});
            }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.username,
            receiverName:tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
          if(userData.username !== tab){
            privateChats.get(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
          }
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    return (
    <div className="chat-container">
        {userData.connected &&
            <div className="chat-box">
                <div className="member-list">
                    <ul>
                        <li className='new-chat-title'>새로운 채팅</li>
                        <li onClick={()=>{setTab("newChat")}} className={`member ${tab==="newChat" && "active"}`}>1:1채팅상담</li>
                        <li className='before-chat-title'>이전 문의내역</li>
                        {[...privateChats.keys()].map((name,index)=>(
                            <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                        ))}
                    </ul>
                </div>

                {tab==="newChat" &&
                <div className="chat-content">
                    <ul className="chat-messages">
                        {publicChats.map((chat,index)=>(
                            <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                {chat.senderName !== userData.username && <div className="avatar">
                                    {chat.senderName}</div>}
                                <div className="message-data">{chat.message}</div>
                                {chat.senderName === userData.username && <div className="avatar self">
                                    {chat.senderName}</div>}
                            </li>
                        ))}
                    </ul>

                    <div className="send-message">
                        <input type="text" className="input-message" placeholder="enter the message" value={userData.message} name='message' onChange={handleValue} /> 
                        <button type="button" className="send-button" onClick={sendValue}>send</button>
                    </div>
                </div>}
                {tab!=="newChat" && 
                <div className="chat-content">
                    <ul className="chat-messages">
                        {[...privateChats.get(tab)].map((chat,index)=>(
                            <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                <div className="message-data">{chat.message}</div>
                                {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                            </li>
                        ))}
                    </ul>

                    <div className="send-message">
                        <input type="text" className="input-message" placeholder="enter the message" value={userData.message} name='message' onChange={handleValue} /> 
                        <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                    </div>
                </div>}
            </div>
        }
    </div>
    )
}

export default ChatRoom;