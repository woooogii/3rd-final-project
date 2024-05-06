import React, { useEffect, useState } from 'react';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

import './chat.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ChatList from './ChatList';

var stompClient =null;
const ChatRoom = () => {
    const loginUser = useSelector((state) => state.loginUser);//로그인 아이디로 채팅 들어가기
    const [entities,setEntities] = useState([]);//이전 문의내역 db꺼내기

    const [newChats, setNewChats] = useState([]);//새로운 문의내역
    const [tab,setTab] =useState("newChat");//클릭 시 새로운 채팅창 or 이전 문의내역
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
    });


    useEffect(() => {
        if (loginUser.uid && !userData.connected) {
            connect();
        }
    }, [loginUser.uid]);

    const connect =()=>{
        let Sock = new SockJS('http://localhost:4000/pedal');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        if(loginUser.uid){
            setUserData({...userData,"username":loginUser.uid,"connected": true});
            stompClient.subscribe('/chatroom/public', onMessageReceived);
            userJoin();
            getChats(loginUser.uid);
        }else{
            setUserData({...userData,"connected": true});
            stompClient.subscribe('/chatroom/public', onMessageReceived);
            userJoin();
        }
    }
    const onError = (err) => {
        console.log(err);
    }
    const getChats =async(uid)=>{
        try {
            console.log('getChats 시작',loginUser.uid)
            const response = await axios.get(`http://localhost:4000/pedal/getChats/${uid}`);
            console.log(response.data);
            setEntities(response.data);
            console.log('가져옴',entities);
        } catch (error) {
            console.log('error_getChats',error);
        }
    }
    const groupChatDate = (entities)=>{
        const groupedDate = {};
        entities.forEach(item => {
            const date = new Date(item.date).toDateString();//날짜만 읽음(시,분,초 무시)
            if(!groupedDate[date]){
                groupedDate[date] = [];
            }
            groupedDate[date].push(item);
        });
        return groupedDate;
    }
    const groupedEntities = groupChatDate(entities);

    const renderGroupedMessages = () => {
        return Object.entries(groupedEntities).map(([date, items]) => {
            const latestMessage = items[items.length - 1]; // 각 날짜별로 가장 최근 메시지
            return (
                <div key={date}>
                    <p  onClick={()=>{setTab(date)}}
                    className={`member ${tab===date && "active"}`}>
                        {latestMessage.message}
                    </p>
                </div>
            );
        });
    };
    const renderMessages = () => {
        const messages = groupedEntities[tab]; // 클릭한 날짜에 해당하는 메시지만 가져옴
        return (
            <ul className="chat-messages">
                {messages.map((message, index) => (
                    <li className={`message ${message.senderName === userData.username && "self"}`}
                    key={index}>
                        {message.senderName !== userData.username && 
                            <div className="avatar">
                                {message.senderName}
                            </div>
                        }
                        <div className="message-data">{message.message}</div>
                        {message.senderName === userData.username && 
                            <div className="avatar self">
                                {message.senderName}
                            </div>
                        }
                    </li>
                ))}
                <li className={'message'}>
                    <div className="message-data">
                    상담이 종료되었습니다. 새로운 문의사항이 있으시면 [새로운 채팅 &gt; 1:1 채팅상담]을 이용해 주시기 바랍니다.
                    </div>
                </li>
            </ul>
        );
    };

    const userJoin=()=>{
        console.log('userJoin');
        let chatMessage = {
            senderName: userData.username,
            status:"JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN":
                break;
            case "MESSAGE":
                setNewChats(prevChats => [...prevChats, payloadData]);
                break;
            case "LEAVE":
                setNewChats(prevChats => [...prevChats, payloadData]);
                break;
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

    const registerUser=()=>{
        connect();
    }

    const endChat = () => {
        if(stompClient){
            const chatMessage={
                senderName:userData.username,
                status:"LEAVE"
            };
            stompClient.send("/app/message",{},JSON.stringify(chatMessage));
            alert("채팅이 종료되었습니다.");
        }
    }

    return (
    <div className="chat-container">
        {userData.connected ?
            <div className="chat-box">
                {/* 채팅목록 */}
                <div className="member-list">
                    <div className='new-chat'>
                        <div>새로운 채팅</div>
                        <div>
                            <p onClick={()=>{setTab("newChat")}}
                            className={`member ${tab==="newChat" && "active"}`}>1:1채팅상담</p>
                        </div>
                    </div>
                    <div className='chat-list'>
                        <div>이전 문의내역</div>
                        <div>
                            {renderGroupedMessages()}
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={endChat}>채팅종료</button>
                </div>
                {/* 대화창 */}
                {tab==="newChat" &&
                <div className="chat-content">
                    <ul className="chat-messages">
                        {newChats.map((chat,index)=>(
                            <li className={`message ${chat.senderName === userData.username && "self"}`} 
                            key={index}>
                                {chat.senderName !== userData.username && 
                                    <div className="avatar">
                                        {chat.senderName}
                                    </div>
                                }
                                <div className="message-data">{chat.message}</div>
                                {chat.senderName === userData.username && 
                                    <div className="avatar self">
                                        {chat.senderName}
                                    </div>
                                }
                            </li>
                        ))}
                    </ul>

                    <div className="send-message">
                        <input type="text" className="input-message" placeholder="enter the message" value={userData.message} name='message' onChange={handleValue} /> 
                        <button type="button" className="send-button" onClick={sendValue}>send</button>
                    </div>
                </div>}
                {/* 이전 문의내역 */}
                {tab!=="newChat" &&
                <div className="chat-content">
                    {renderMessages()}

                    <div className="send-message">
                        <input type="text" className="input-message" placeholder="대화가 종료된 채팅입니다."/> 
                    </div>
                    </div>}
                </div>
                :
            <div className="register">
                <input
                    id="user-name"
                    placeholder="Enter your name"
                    name="username"
                    value={userData.username}
                    onChange={handleValue}
                    margin="normal"
                    />
                <button type="button" onClick={registerUser}>
                    connect
                </button> 
            </div>}
        </div>
    )
}

export default ChatRoom;