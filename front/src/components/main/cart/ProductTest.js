import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductTest = () => {

    /*
    const [pid, setPid] = useState('');
    const [pcategory,setPcate] = useState('');
    const [pdescription,setPdesc] = useState('');
    const [pname, setPname] = useState('');
    const [poriginalfilename, setOFN] = useState('');
    const [pprice,setPrice] = useState(0);
    const [psavefilename,setSFN] = useState('');

     useEffect(()=>{
        fetchData();
    },[])

    */

    const [oneData,setData] = useState({})

   
    const fetchData = async () => {
      
        try {
            const id = 100; //리스트에서 클릭한 상품id라 치고 
            const response = await axios.get(`http://localhost:4000/pedal/oneitem?pid=${id}`)
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    
    }   

    const cart = async () => {


            const id = 100; //리스트에서 클릭한 id라 치고
            const user = "rud101"; //현재 접속중인 유저라 치고
            const amount = 1;
           
            const addCartData = {
                user:user,
                product:id,
                camount:amount
            }

            try {
                const request = await axios.post('http://localhost:4000/pedal/cart', addCartData)
                
            } catch (error) {
                console.log(error);
            }
 
    }


    

    return (
        <div>
            <button onClick={fetchData}>리스트에서 눌렀다 치고</button><br/>
           
            품명: {oneData && oneData.pname}<br/>
            가격: {oneData && oneData.pprice}<br/>
            상세 설명: {oneData && oneData.pdescription}<br/>
            
            <button onClick={cart}>장바구니</button> <br/>
            <a href='http://localhost:3000/pedal/cart'>장바구니보기</a>
        </div>
    );
};

export default ProductTest;