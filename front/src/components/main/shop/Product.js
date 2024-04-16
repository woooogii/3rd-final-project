import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom'

const Product = () => {
    const [data,setData] = useState([]);
    const no = useRef(data.length+1);

    const addProduct=(form)=>{
        form.pId = no.current++;
        setData([...data,form]);
    }

    return (
        <div>
             <Link to={"/pedal/productDetail/1"}><img src='https://mybicycle.co.kr/web/product/medium/202404/8fe71de5be196ad4dc0e142cc22d7d3f.jpg'/>
             <p>자전거 제목입니다~~~~~~</p>
             <p>15,000</p></Link>
        </div>
    );
};

export default Product;