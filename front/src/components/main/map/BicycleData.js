import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LocationWithMarker from './LocationWithMarker';


const BicycleData = () => {
    const [entities, setEntities] = useState(null);
    const [cycleData, setCycleData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://openapi.seoul.go.kr:8088/6454624c56726c6134305a78427545/json/tbCycleStationInfo/1/500/');
            const data = await response.json();
            console.log('fetchData', data);
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
            const resp = await axios.post('http://localhost:4000/pedal/insertData', lowercaseData);
            console.log('전송 완료 데이터', lowercaseData);
            getData();
        } catch (error) {
            console.error('error_send', error);
        }
    }

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/pedal/station');
            setEntities(response.data);
        } catch (error) {
            console.log('error_getData', error);
        }
    }

    useEffect(() => {
        fetchData();
        getData();
    }, []);

    useEffect(() => {
        if (cycleData.length > 0 && (!entities || entities.length === 0)) {
            sendData();
        }
    }, [cycleData]);

    return (
        <div>
            {/* <InsertData/> */}
            {entities && <LocationWithMarker entities={entities} />}
        </div>
    );
};

export default BicycleData;
