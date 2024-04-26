// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Position from './Position';

// const BicycleData = () => {
//     const [cycleData, setCycleData] = useState([]);

//     // 이전 데이터를 가져오는 함수
//     const fetchPreviousData = async () => {
//         try {
//             // 이전 데이터를 가져오는 API 호출
//             const response = await axios.get('http://localhost:4000/pedal/station');
//             const previousData = response.data;
            
//             // 이전 데이터가 존재하면 migrateData 함수를 실행하여 새로운 데이터와 통합
//             if (previousData) {
//                 fetchDataAndMigrate(previousData);
//             } else {
//                 // 이전 데이터가 없을 경우 바로 새로운 데이터를 가져옴
//                 fetchDataAndMigrate([]);
//             }
//         } catch (error) {
//             console.error('error_resp', error);
//         }
//     };

//     const migrateData = (previousData, newData) => {
//         const migratedData = [...previousData];

//         newData.forEach(newItem => {
//             const index = migratedData.findIndex(prevItem => prevItem.rent_id === newItem.rent_id);
//             if (index !== -1) {
//                 migratedData[index] = newItem;
//             } else {
//                 migratedData.push(newItem);
//             }
//         });
//         return migratedData;
//     };

//     const fetchDataAndMigrate = async (previousData) => {
//         try {
//             const response = await axios.get('http://openapi.seoul.go.kr:8088/6454624c56726c6134305a78427545/json/tbCycleStationInfo/1/50/');
//             const data = response.data;
//             const newData = data.stationInfo.row;
//             console.log(newData);
//             const migratedData = migrateData(previousData, newData);
//             setCycleData(migratedData);
//             // HTTP 요청에 대한 응답을 기다리지 않고 state가 갱신될 때까지 기다립니다.
//             await new Promise(resolve => setTimeout(resolve, 0));

//             console.log(cycleData)
//             const lowercaseData = migratedData.map(item => {
//                 const lowercaseItem = {};
//                 for (const key in item) {
//                     lowercaseItem[key.toLowerCase()] = item[key];
//                 }
//                 return lowercaseItem;
//             });

//             await axios.post('http://localhost:4000/pedal/insertData', lowercaseData);
//         } catch (error) {
//             console.error('error_resp', error);
//         }
//     };

//     useEffect(() => {
//         fetchPreviousData();
//     }, []);

//     return (
//         <div>
//             {/* {cycleData && <Position entities={cycleData}/>} */}
//         </div>
//     );
// };

// export default BicycleData;
