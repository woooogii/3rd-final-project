import { Link, useNavigate } from 'react-router-dom';
import Numeral from 'numeral';

import './style/productList.css';
import { IoMdHeartEmpty } from "react-icons/io";

const ProductItem = ({item}) => {
    const navigate = useNavigate('');

    const handleClick = () => {
        const uri = `/pedal/productDetail/${item.pid}`;
        navigate(uri);
    }
    return (
        <li onClick={handleClick}>
            <Link to={`/ProductDetail/${item.pid}`} className='prodt_Link'>
                <div className='prodt_Img'>
                    <img src={item.pimage1} alt='pimage1'/>
                </div>
                <div className='prodt_Info'>
                    <div className='item-cate'>
                        <div className='item-category'>&#91;{item.pcategory}&#93;</div>
                        <div className='item-like'><IoMdHeartEmpty/></div>
                    </div>
                    <strong>{item.pname}</strong>
                    <em>{Numeral(item.pprice).format(0.0)}원</em>
                </div>
            </Link>
        </li> 
    );
};

export default ProductItem;