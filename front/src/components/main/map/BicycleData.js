import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LocationWithMarker from './LocationWithMarker';
//import InsertData from '../InsertComponent/InsertData';


const BicycleData = () => {
    const [entities,setEntites] = useState(null);
    useEffect(()=>{
        const getData=async()=>{
            try {
                const response = await axios.get('http://localhost:4000/pedal/station');
                setEntites(response.data);
            } catch (error) {
                console.log('error_getData',error);
            }
        }
        getData();
    },[]);

    return (
        <div>
            {/* <InsertData/> */}
            {entities&&<LocationWithMarker entities={entities}/>}
        </div>
    );
};

export default BicycleData;
