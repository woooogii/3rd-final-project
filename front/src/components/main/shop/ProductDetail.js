import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { PiHeart, PiHeartFill  } from "react-icons/pi";
import { useSelector } from 'react-redux';
import Review from './Review';


const StyledContent = styled.div`

    width: 100%;
    margin-top: 100px;

    h1 {
    font-size: 25px;
    font-weight: bold;
    }

    .image_container {
        display: flex;
        margin-left: 320px;
        overflow: hidden;
    }

    .image_sub,
    .image_main {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .image_sub img {
        max-width: 160px;
        max-height: 140px;
        margin-bottom: 20px;
        margin-right: 20px;
        object-fit: cover;
    }

    .image_main img {
        max-width: 550px;
        max-height: 370px;
        object-fit: cover;
    }

    .product_info {
        padding-left: 100px;
        width: 800px;
    }

    /* .btn_buy {
        width: 150px;
        height: 50px;
        background-color: #273440;
        color: #fff;
        font-size: 17px;
        border: none;
        border-radius: 10px;
        margin-top: 550px;
        margin-top: -400px; 
    } */

    .btn_cart {
    width: 265px;
    height: 50px;
    background-color: #fff;
    border: 1px solid #343a40;
    font-size: 17px;
    border-radius: 10px;
    margin-left: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn_cart:hover {
    background-color: #1675F2;
    color: #fff;
    border: none;
}

    /* .btn_others {
        width: 150px;
        height: 50px;
        background-color: #fff;
        border: 1px solid #343a40;
        font-size: 17px;
    } */

    .btns {
    display: flex;
    justify-content: flex-end;
    padding-right: 400px;
    padding-bottom: 80px;

}

    //상품설명,리뷰,교환반품 밑줄 - 파란색 하이라이트
    .clickElement {
        -webkit-user-select: none;
    }

    .policy {
        margin: 80px;
        border: 1px solid #343a40;
        white-space: pre-line;
        text-align: center;
        padding:100px; 
    }

    .centerLineGroup_1 {
        display: flex;
        margin: auto;
        justify-content:center;

        ul {
            display: flex;
            gap: 40px;
            font-size: 20px;
            list-style: none;
        }

        li::after {
            content: '';
            display: block;
            width: 100%;
            height: 4px;
            margin-top: 10px;
            background: #1675F2;
            transition: all 0.5s;
        }

        .center::after {
            transform: scaleX(0);
        }

        .center:hover::after {
            transform: scaleX(1);
        }

        .centerLine::after {
            transform: scaleX(0);
        }

        .centerLine:hover::after {
            transform: scaleX(1);
        }
    }

    .centerLineGroup_2 {
        display: flex;
        justify-content:center;
    }

    hr {
    width: 51%;
    margin-left: -15px; 
    }

    .tot{
        display: flex;
        justify-content: flex-end;
        padding-right: 370px;
        font-size: 13px;
    }
    
    .tot_amount{
        font-size: 35px;
        font-weight: bold;
        margin-bottom: 100px;
        display: inline-block;
        vertical-align: top;
        margin-top: -25px;
        color: #1675F2;
    }
`;

const ProductDetail = () => {

    const navigate = useNavigate();
    const { pId } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState({
        pId: '',
        pCategory: '',
        pName: '',
        pPrice: '',
        pImage1: '',
        pImage2: '',
        pImage3: '',
        pImage4: '',
        pDescription: '',
    });

    useEffect(() => {
        fetchProductById(pId);
        console.log(' Id가져오고있냐~~~:',pId);
    }, [pId]);

    const fetchProductById = async (pId) => {
        try {
            const response = await axios.get(`http://localhost:4000/pedal/productDetail/${pId}`);
            console.log(' 응답했니?~~~:', response);
            const productData = response.data;
            console.log(' 데이터~~~:', productData);
            setProduct(productData);
        } catch (error) {
            console.error('데이터를 가져오지 못했습니다:', error);
        }
    };

    //로그인 여부에 따른 장바구니
    const loginUser = useSelector((state) => state.loginUser);

    const onCart = async () => {
        if (loginUser.uid === null) {
            alert("로그인 후에 이용 가능합니다.");
            navigate('/pedal/login');
        } else {
            try {
                console.log("넘기는 uid:" + loginUser.uid);
                console.log("넘기는 pId:" + pId);
                console.log("넘기는 quantity:" + quantity);
                const response = await axios.post('http://localhost:4000/pedal/addToCart', {
                    uid: loginUser.uid,
                    pid: pId,
                    quantity: quantity 
                });
                console.log('장바구니 추가 응답:', response);
                if (response.status === 200) {
                    alert("장바구니에 담겼습니다.");
                    navigate('/pedal/cart');
                } else {
                    alert("장바구니에 제품을 추가하는 데 문제가 발생했습니다.");
                }
            } catch (error) {
                console.error('장바구니 추가 오류:', error);
                alert("장바구니에 제품을 추가하는 데 문제가 발생했습니다.");
            }
        }
    };

    /*
    const onBuy = () => {
        navigate('/pedal/myBuy');
    };
    */

    const increment = (e) => {
        e.preventDefault();
        setQuantity(quantity + 1);
    }

    const decrement = (e) => {
        e.preventDefault();
        if(quantity<=1){
            alert('❗최소주문수량 : 1개 이상 ');
        }else{
            setQuantity(quantity - 1);
        }
    }




    const [selectBox,setSelectBox] = useState('productInfo'); //기본값 = 상품설명
    const [selectPick,setSelectPick] = useState(false); //기본값 = 상품설명

    const showProductInfo = () => {
        setSelectBox('productInfo');
    }

    const showReview = () => {
        setSelectBox('review');
    }

    const showPolicy = () => {
        setSelectBox('policy');
    }

    const clickPick = () => {
        setSelectPick(!selectPick)
    }

    return (
        <StyledContent>

<div className="image_container">
    <div className="sub_images">
        <ul className="image_sub">
            <li>
                <img src="/image/02.jpg" alt="" />
            </li>
            <li>
                <img src="/image/03.jpg" alt="" />
            </li>
            <li>
                <img src="/image/04.jpg" alt="" />
            </li>
        </ul>
    </div>
    <div >
        <ul className="image_main">
            <li>
                <img src="/image/01.jpg" alt="" />
            </li>
        </ul>
    </div>
    <div className="product_info">
                <nav
                    style={{
                        '--bs-breadcrumb-divider':
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E\")",
                    }}
                    aria-label="breadcrumb"
                >
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="/pedal/home" style={{textDecoration:'none'}}>Home</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {product.pcategory}
                        </li>
                    </ol>
                </nav>
                <h1>{product.pname}</h1>
                <br />
                <p style={{fontSize:'14px'}}>
                    가격 <span style={{ marginLeft: '220px', placeItems: 'right'}}>&nbsp;{product.pprice}&nbsp;원</span>
                </p>
                <hr/>
                <br />
                    <p className="clickElement" style={{fontSize:'14px'}}>
                    수량 &nbsp;
                        <FiMinus style={{ marginLeft: '200px' }} onClick={decrement} />
                        &nbsp;
                        <input type="text" value={quantity} readOnly style={{ textAlign: 'center', width: '50px', borderColor: '#0000' }} />
                        &nbsp;
                        <IoIosAdd onClick={increment} />
                    </p>
                    <hr />
                    <br />
                    <div className='tot'>
                        총 상품금액&nbsp;&nbsp;&nbsp;
                        <span className='tot_amount'>
                        {(product.pprice)*quantity}
                        </span>
                        &nbsp;<p style={{fontWeight:'bold'}}>원</p>
                    </div>
                </div>
            </div>



            <div className='btns'>
                <div className='btns_group'>
                    <div>
                        <button
                            type="button"
                            className="btn_cart"
                            onClick={clickPick}
                            style={{ width: '60px', backgroundColor: '#F2CE16' }}
                        >
                            {/* selectPick 상태에 따라 아이콘을 변경 */}
                            {selectPick ? <PiHeartFill value={selectPick} style={{ fontSize: '23px' }} /> : <PiHeart style={{ fontSize: '23px' }} />}
                        </button>
                        <button type="button" className="btn_cart" onClick={onCart}>
                            &nbsp;장바구니&nbsp;
                        </button>
                    </div>
                </div>
            </div>

            <br />
            <br />
            <br />


            <div className="image_container">
              
            </div>

           
            <br />
            <br />
            <br />

            <div className="centerLineGroup_1">
                <ul>
                    <li className="centerLine" onClick={showProductInfo}>
                        상품 설명
                    </li>
                    <li className="centerLine" onClick={showReview}>
                        리뷰(50+)
                    </li>
                    <li className="centerLine" onClick={showPolicy}>
                        교환/반품
                    </li>
                </ul>
            </div>

            <div className="centerLineGroup_2">
                {selectBox === 'productInfo' && (
                    <>
                        {/* <p>설명: {product.pdescription}</p> */}
                        <p>
                            <img src="/image/05.jpg" alt="[ 상세설명 ]" />
                        </p>
                    </>
                )}

                {selectBox === 'review' && (
                    <>
                        <Review product={product} loginUser={loginUser}/>
                    </>
                )}

                {selectBox === 'policy' && (
                    <>
                        <p className="policy">
                            <img src='/image/refund.jpg' alt=''/>
                        </p>
                    </>
                )}
            </div>

        </StyledContent>
    );
};

export default ProductDetail;
