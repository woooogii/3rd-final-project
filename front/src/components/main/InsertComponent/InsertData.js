import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InsertData = () => {
    const [cycleData, setCycleData] = useState([]);
    const [entites,setEntites] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

//api 데이터 받아오기
    const fetchData = async () => {
        try {
            const response = await fetch('http://openapi.seoul.go.kr:8088/6454624c56726c6134305a78427545/json/tbCycleStationInfo/1/500/');
            const data = await response.json();
            console.log(data);
            setCycleData(data.stationInfo.row);
            console.log('받아오기성공');
        } catch (error) {
            console.error('error_resp', error);
        }
    }

    const sendData = async () => {
        try {
            console.log('보낼 데이터', cycleData);
            const lowercaseData = cycleData.map(item => {
                const lowercaseItem = {};
                for (const key in item) {
                    lowercaseItem[key.toLowerCase()] = item[key];
                }
                return lowercaseItem;
            });
            const resp = await axios.post('http://localhost:4000/pedal/insertData',lowercaseData);
            console.log('전송 완료 데이터', lowercaseData);
            setEntites(lowercaseData);
        } catch (error) {
            console.error('error_send', error);
        }
    }

    // const [cycleData, setCycleData] = useState([]);
    // const [entites,setEntites] = useState(null);

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // //api 데이터 받아오기
    // const fetchData = async () => {
    //     try {
    //         const response = await fetch('http://openapi.seoul.go.kr:8088/6454624c56726c6134305a78427545/json/tbCycleStationInfo/1/500/');
    //         const data = await response.json();
    //         console.log(data);
    //         setCycleData(data.stationInfo.row);
    //         console.log('받아오기성공');
    //         sendData(data.stationInfo.row);
    //         console.log('db전송 성공');
    //     } catch (error) {
    //         console.error('error_resp', error);
    //     }
    // }

    // const sendData = async () => {
    //     try {
    //         console.log('보낼 데이터', cycleData);
    //         const lowercaseData = cycleData.map(item => {
    //             const lowercaseItem = {};
    //             for (const key in item) {
    //                 lowercaseItem[key.toLowerCase()] = item[key];
    //             }
    //             return lowercaseItem;
    //         });
    //         const resp = await axios.post('http://localhost:4000/insertData',lowercaseData);
    //         console.log('전송 완료 데이터', lowercaseData);
    //         setEntites(lowercaseData);
    //     } catch (error) {
    //         console.error('error_send', error);
    //     }
    // }

    return (
        <div>
            <button onClick={sendData}>send</button>
        </div>
    );
};

export default InsertData;