// import React, { useEffect, useRef, useState } from 'react';
// import { json, useParams } from 'react-router-dom';
// import * as StompJs from '@stomp/stompjs';

// const CreateReadChat = () => {
//     const [chatList, setChatList] = useState([]);
//     const [chat, setChat] = useState('');
//     const [applyId] = useParams();
//     const client = useRef({});


//     const connect=()=>{
//         client.current = new StompJs.Client({
//             brokerURL:'ws://localhost:8787/ws',
//             onConnect: ()=>{
//                 console.log('success');
//                 subscribe();
//             },
//             connectHeaders: {
//                 Authorization: window.localStorage.getItem('authorization'),
//             },
//         });
//         client.current.activate();
//     };
    
//     const publish = (chat) => {
//         if (!client.current.connected) return;
    
//         client.current.publish({
//           destination: '/pub/chat',
//           body: JSON.stringify({
//             applyId: applyId,
//             chat: chat,
//           }),
//         });
    
//         setChat('');
//     };
//     const subscribe=()=>{
//         client.current.subscribe('sub/chat/'+applyId,(body)=>{
//             const json_body = JSON.parse(body.body);
//             setChatList((_chat_list)=>[
//                 ..._chat_list,json_body
//             ]);
//         });
//     };

//     const disconnect=()=>{
//         client.current.deactivate();
//     };

//     const handleChange = (event) => { // 채팅 입력 시 state에 값 설정
//         setChat(event.target.value);
//     };

//     const handleSubmit = (event, chat) => { // 보내기 버튼 눌렀을 때 publish
//         event.preventDefault();
//         publish(chat);
//     };

//     useEffect(()=>{
//         connect();
//         return()=>disconnect();
//     },[]);
    
//     const sendMsg=()=>{
//         if (connected && stompClient.current) {
//             const from = nickname;
//             const text = message;
//             const time = new Date().toLocaleTimeString();
//             const messageObject = { from, text, time };
      
//             console.log('메세지:', messageObject);
      
//             stompClient.current.send('/game/chat', {}, JSON.stringify(messageObject));
//           } else {
//             console.log('서버에 연결되지 않았습니다.');
//           }
//     }
    

//     return (
// <div>
//       <div className={'chat-list'}>{chatList}</div>
//       <form onSubmit={(event) => handleSubmit(event, chat)}>
//         <div>
//           <input type={'text'} name={'chatInput'} onChange={handleChange} value={chat} />
//         </div>
//         <input type={'submit'} value={'의견 보내기'} />
//       </form>
//     </div>
//     );
// };

// export default CreateReadChat;