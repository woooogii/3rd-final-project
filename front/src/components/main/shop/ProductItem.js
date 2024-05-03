import { Link, useNavigate } from 'react-router-dom';
import './style/productList.css';
import Numeral from 'numeral';

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
                    <p className='prodt_cate'>{item.pcategory}</p>
                    <strong>{item.pname}</strong>
                    <em>{Numeral(item.pprice).format(0.0)}원</em>
                </div>
            </Link>
        </li> 
    );
};

export default ProductItem;