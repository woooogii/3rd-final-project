import { Link, useNavigate } from 'react-router-dom';
import './style/productList.css';

const ProductItem = ({item}) => {
    console.log(item);

    const navigate = useNavigate('');

    const handleClick = () => {
        const uri = `/pedal/productDetail/${item.pid}`;
        navigate(uri);
    }
    return (
        
        <li onClick={handleClick}>
            
            <Link to={`/ProductDetail/${item.pid}`}>
            <img src={item.pimage1} alt='pimage1'/>
            <img src={item.pimage2} alt='pimage2'/>
            <img src={item.pimage3} alt='pimage3'/>
            <img src={item.pimage4}alt='pimage4'/>
            </Link>
                <h3>{item.pname}</h3>
                <p>{item.pprice}원</p>
                <p>간단한 설명입니다.</p>
        </li>
    );
};

export default ProductItem;