import React, { useEffect, useRef, useState } from 'react';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import { v4 as uuidv4 } from 'uuid';

import './chat.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

var stompClient =null;
const ChatRoom = () => {
    const loginUser = useSelector((state) => state.loginUser);//로그인 아이디로 채팅 들어가기
    const [entities,setEntities] = useState([]);//이전 문의내역 db꺼내기
    const [newChats, setNewChats] = useState([]);//새로운 문의내역
    const [tab,setTab] = useState('newChat');//클릭 시 새로운 채팅창 or 이전 문의내역
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        sendmessage: '',
        receivemessage: '',
        chatRoom: '' 
    });

    const messagesEndRef = useRef(null);//밑에서 위로

    useEffect(() => {
        scrollToBottom();
    }, [newChats, entities, tab]);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    };


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
            const response = await axios.get('http://localhost:4000/pedal/getChats');
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

    const renderGroupedMessages = () => {// 클릭한 날짜에 해당하는 메시지만 가져와서 목록에 가장 최근 메세지 표시
        return Object.entries(groupedEntities).map(([date, items]) => {
            const latestMessage = items[items.length - 1]; // 각 날짜별로 가장 최근 메시지
            return (
                <div key={date} onClick={() => {setTab(date);}}
                className={`text-item ${tab === date && "active"}`}>
                    <div className='chat-circle'>1:1</div>
                    <div className='item-message'>
                        <p className='message-date'>{new Date(latestMessage.date).toLocaleDateString()}<br/>
                            {latestMessage.receiveMessage}</p>
                    </div>
                </div>
            );
        });
    };
    const renderMessages = () => {// 클릭한 날짜에 해당하는 메시지만 가져와서 대화창에 띄움
        const messages = groupedEntities[tab];
        console.log('messages',messages);
        if (!messages) {
            return null;
        }
        return (
            <div className="before-chat-messages">
                {messages.map((message, index) => (
                    <div className='before-message' key={index}>
                        {message.senderName !== userData.username && (
                            <>
                                <div className="before-receiver">
                                    {message.senderName}
                                </div>
                                <div className="before-message-receiver-data">{message.receiveMessage}
                                </div>
                            </>
                        )}
                        {message.senderName === userData.username && (
                            <>
                            <div className="before-self">
                                나
                            </div>
                            <div className="before-message-self-data">{message.sendMessage}</div>
                            </>
                        )}
                    </div>
                ))}
                <div className='end-text'>
                    상담이 종료되었습니다.<br/>
                    새로운 문의사항이 있으시면 &#91;1:1 채팅상담&#93;을 이용해 주시기 바랍니다.
                </div>
            </div>
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

    const sendValue = async () => {
        if (stompClient) {
            try {
                // 채팅 메시지 전송
                let chatMessage = {
                    user: loginUser.uid,
                    senderName: userData.username,
                    receiverName: userData.username,
                    sendMessage: userData.sendmessage,
                    receiveMessage: userData.sendmessage,
                    status: "MESSAGE",
                };
                stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
                setUserData({ ...userData, "sendmessage": "" });
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    }

    const registerUser=()=>{
        connect();
    }

    const endChat = () => {
        if(stompClient){
            const chatMessage={
                status:"LEAVE"
            };
            const endMessage={
                senderName:'',
                receiveMessage:'상담이 종료되었습니다.',
                date: new Date().toISOString()
            };
            setNewChats(prevChats=>[...prevChats,endMessage]);
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
                        <p onClick={()=>{setTab("newChat")}}>1:1채팅상담</p>
                    </div>
                    <div className='chat-list'>
                        <div className='list-title'>이전 문의내역</div>
                        {renderGroupedMessages()}
                    </div>
                </div>
                {/* 대화창 */}
                {tab === "newChat" &&
                <div className="chat-content" ref={messagesEndRef}>
                    <div className='chat-close'>
                        <button className='close-button' onClick={endChat}>채팅종료</button>
                    </div>
                    <div className="new-chat-messages">
                        {/* 채팅방 내용 출력 */}
                        {newChats.map((chat, index) => (
                            <div className='new-message' key={index}>
                                {chat.senderName !== userData.username &&
                                    <>
                                        <div className="new-receiver">
                                            {chat.senderName}
                                        </div>
                                        <div className="new-message-receiver-data">{chat.receiveMessage}</div>
                                    </>
                                }
                                <div className="message-data">{chat.message}</div>
                                {chat.senderName === userData.username &&
                                    <>
                                        <div className="new-self">
                                            나
                                        </div>
                                        <div className="new-message-self-data">{chat.sendMessage}</div>
                                    </>
                                }
                            </div>
                        ))}
                    </div>

                    <div className="new-send-message">
                        <input type="text" className="input-new-message" placeholder="문의하실 내용을 입력해주세요." value={userData.sendmessage} name='sendmessage' onChange={handleValue} />
                        <button type="button" className="new-send-button" onClick={sendValue}>send</button>
                    </div>
                </div>}
                {/* 이전 문의내역 */}
                {tab!=="newChat" &&
                <div className="chat-content" ref={messagesEndRef}>
                    {renderMessages()}
                    <div className="end-send-message">
                        <input type="text" className="input-end-message" placeholder="대화가 종료된 채팅입니다."/> 
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