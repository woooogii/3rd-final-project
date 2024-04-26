// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Position from './Position';

// const Map = () => {//db에서 데이터 꺼내는 component
//     const [cycleData, setCycleData] = useState([]);

//     useEffect(() => {
//         fetchData();
//     }, []);

// //api 데이터 받아오기
//     const fetchData = async () => {
//         try {
//             const response = await fetch('http://openapi.seoul.go.kr:8088/6454624c56726c6134305a78427545/json/tbCycleStationInfo/1/500/');
//             const data = await response.json();
//             console.log(data);
//             setCycleData(data.stationInfo.row);
//             console.log('받아오기 성공');
//             console.log('보낼 데이터', data.stationInfo.row);
//             const lowercaseData = data.stationInfo.row.map(item => {
//                 const lowercaseItem = {};
//                 for (const key in item) {
//                     lowercaseItem[key.toLowerCase()] = item[key];
//                 }
//                 return lowercaseItem;
//             });
//             const resp = await axios.post('http://localhost:4000/pedal/insertData', lowercaseData);
//             console.log('전송 완료 데이터', lowercaseData);
//         } catch (error) {
//             console.error('error_resp', error);
//         }
//     }

//     // const sendData = async (data) => {
//     //     try {
//     //         console.log('보낼 데이터', data);
//     //         const lowercaseData = data.map(item => {
//     //             const lowercaseItem = {};
//     //             for (const key in item) {
//     //                 lowercaseItem[key.toLowerCase()] = item[key];
//     //             }
//     //             return lowercaseItem;
//     //         });
//     //         const resp = await axios.post('http://localhost:4000/pedal/insertData',lowercaseData);
//     //         console.log('전송 완료 데이터', lowercaseData);
//     //         setEntites(lowercaseData);
//     //     } catch (error) {
//     //         console.error('error_send', error);
//     //     }
//     // }

//     return (
//         <div>
//             {cycleData && <Position entities={cycleData}/>}
//         </div>
//     );
// };

// export default Map;