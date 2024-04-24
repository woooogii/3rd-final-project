import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Position from './Position';
import InsertData from '../InsertComponent/InsertData';

const Map = () => {//db에서 데이터 꺼내는 component
    const [entities,setEntites] = useState(null);
    
    useEffect(()=>{
        getData();
    },[]);
    
    const getData=async()=>{
        try {
            const response = await axios.get('http://localhost:4000/pedal/station');
            setEntites(response.data);
        } catch (error) {
            console.log('error_getData',error);
        }
    }
    return (
        <div>
            {/* <InsertData/> */}
            {entities && <Position entities={entities}/>}
        </div>
    );
};

export default Map;