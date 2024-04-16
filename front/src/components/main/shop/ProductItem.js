import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductItem = ({item}) => {
    

    return (
        <li>
            <p>item.상품명: {item.pname}</p>
            <p>item.카테고리: {item.pcategory}</p>
            <p>item.가격: {item.pprice}</p>
            <p>item.이미지: 
                <img src={item.pid} alt="image from spring"/></p>
            <p>item.상세설명: {item.pdescription}</p>
        </li>
    );
};

export default ProductItem;