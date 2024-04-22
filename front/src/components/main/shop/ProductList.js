import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import axios from 'axios';
import styled from 'styled-components';
import Masonry from 'react-masonry-css';

const ImageContainer = styled.div`
.my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    margin-left: -30px; /* gutter size offset */
    width: auto;
  }
  .my-masonry-grid_column {
    padding-left: 30px; /* gutter size */
    background-clip: padding-box;
  }
  
  /* Style your items */
  .my-masonry-grid_column > div {
    background: grey;
    margin-bottom: 30px;
  }
`

const ProductList = () => {
    const [entities,setEntities] = useState(null);

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await axios.get('http://localhost:4000/pedal/product/list');
                console.log('꺼내온 데이터',response.data);
                setEntities(response.data);
            } catch (error) {
                console.error('error_fetch',error);   
            }
        }
        fetchData();
    },[]);
    return (
        <ImageContainer>
            <Masonry 
            breakpointCols={4} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
            {
                entities && entities.map(item=>(
                        <ProductItem key={item.pid} item={item}/>
                ))
            }
            </Masonry>
        </ImageContainer>
    );
};
export default ProductList;