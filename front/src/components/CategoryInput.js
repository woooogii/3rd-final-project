import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CategoryInput = () => {
    const [tName,setTName] = useState('');
    const [tCategory,setTCate] = useState('');
    const [tPrice,setTPrice] = useState(0);
   

    const [datas, setDatas] = useState([]);

    
    useEffect(()=>{
        fetchData();
    },[])
  
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/pedal/ticket')
            setDatas(response.data)
            
            console.log(response.data)
        } catch (error) {
            console.log(error)
            
        }
    }

    const onSubmit = async (e) => {
    e.preventDefault();
    console.log('데이터', { tName, tCategory, tPrice });

    const ticketData = {
        tname: tName,
        tcategory: tCategory,
        tprice: parseInt(tPrice)
    };

    try {
        const response = await axios.post('http://localhost:4000/pedal/ticket', ticketData);
        console.log('응답 데이터:', response.data); // 응답 데이터 확인
        fetchData(); // 데이터 다시 가져오기
    } catch (error) {
        console.log(error);
    }
};

    return (
        <div>
                <form onSubmit={onSubmit}>
                티켓명:<input type='text' value={tName} onChange={(e)=>setTName(e.target.value)}/><br/>
                카테고리:<input type='text' value={tCategory} onChange={(e)=>setTCate(e.target.value)}/><br/>
                가격: <input type='number' value={tPrice} onChange={(e)=>setTPrice(e.target.value)}/><br/>
                <button type='submit'>전송</button>
            </form>

            <br/><br/>
            <h2>DB에 있는거</h2>

        <ul>
        {
            datas.map((item) => (
                <li key={item.tid}>
                    표:{item.tname} / 분류: {item.tcategory} / 가격: {item.tprice}
                </li>
            ))
        }
        </ul>

        </div>
    );
};

export default CategoryInput;