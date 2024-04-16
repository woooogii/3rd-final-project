import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { PiHeart, PiHeartFill  } from "react-icons/pi";


const StyledContent = styled.div`
    align-items: center;
    width: 100%;
        justify-content:center;

    .image_container {
        display: flex;
        margin-top: 200px;
        margin-left: 150px;
        overflow: hidden;
        border: 1px solid #fff;
    }

    .image_sub,
    .image_main {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .image_sub img {
        max-width: 180px;
        max-height: 130px;
        margin-bottom: 10px;
        margin-right: 10px;
        object-fit: cover;
    }

    .image_main img {
        max-width: 580px;
        max-height: 395px;
        object-fit: cover;
    }

    .product_info {
        padding-left: 20px;
    }

    .btn_buy {
        width: 180px;
        height: 50px;
        background-color: #273440;
        color: #fff;
        font-size: 18px;
        border: none;
        border-radius: 10px;
        margin-top: 550px;
        margin-top: -400px; 
    }

    .btn_cart {
        width: 180px;
        height: 50px;
        background-color: #fff;
        border: 1px solid #343a40;
        font-size: 18px;
        border-radius: 10px;
        margin-left: 10px;
        margin-top: 550px;
        margin-top: -400px;
    }

    .btn_others {
        width: 180px;
        height: 50px;
        background-color: #fff;
        border: 1px solid #343a40;
        font-size: 18px;
    }

    /*텍스트 or 요소를 선택했을 때 나타나는 파란색 하이라이트 - 비활성화*/
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
            background: #000;
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
        margin: auto;
        justify-content:center;
    }
`;

const ProductDetail = () => {

    const navigate = useNavigate();

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

    const [count,setCount] = useState(1)

    const productId = '1';

    useEffect(() => {
        fetchProductById(productId);
        console.log(' Id가져오고있냐~~~:', productId);
    }, [productId]);

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

    const onCart = () => {
        navigate('/pedal/myCart');
    };

    const onBuy = () => {
        navigate('/pedal/myBuy');
    };

    const increment = (e) => {
        e.preventDefault();
        setCount(count + 1);
    }

    const decrement = (e) => {
        e.preventDefault();
        if(count<=1){
            alert('❗최소주문수량 : 1개 이상 ');
        }else{
            setCount(count - 1);
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
                            <a href="#">Home</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {product.pcategory}
                        </li>
                    </ol>
                </nav>
                <h1>{product.pname}</h1>
                <br />
                <p>
                    가격 :<span style={{ marginLeft: '220px', placeItems: 'right' }}>&nbsp;{product.pprice}&nbsp;원</span>
                </p>
                <br />
                <p className="clickElement">
                    수량 :&nbsp;
                    <FiMinus style={{ marginLeft: '200px' }} onClick={decrement} />
                    &nbsp;
                    <input type="text" value={count} readOnly style={{ textAlign: 'center', width: '50px', borderColor: '#0000' }} />
                    &nbsp;
                    <IoIosAdd onClick={increment} />
                </p>
            </div>

            <br />
            <br />

            <div>
                <button type="button" className="btn_buy" onClick={onBuy}>
                    &nbsp;바로 구매&nbsp;
                </button>
                <button type="button" className="btn_cart" onClick={onCart}>
                    &nbsp;장바구니&nbsp;
                </button>
                <button
                    type="button"
                    className="btn_cart"
                    onClick={clickPick}
                    style={{ width: '70px', backgroundColor: '#F2CE16' }}
                >
                    {/* selectPick 상태에 따라 아이콘을 변경합니다. */}
                    {selectPick ? <PiHeartFill value={selectPick} style={{ fontSize: '23px' }} /> : <PiHeart style={{ fontSize: '23px' }} />}
                </button>
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
                        <p>리뷰칸입니다~~~✨</p>
                    </>
                )}

                {selectBox === 'policy' && (
                    <>
                        <p className="policy">
                            <b>반품/교환 안내</b>
                            <br />
                            <br /> 다음의 반품 교환 사유가 발생했을 경우 고객센터로 전화하시어 반품 교환사유를 말씀하시고 관련절차 등을 안내 받으시기 바랍니다.
                            <br />
                            <br />
                            반품 교환상품이 당사로 입고 된 이후에 환불 또는 교환처리가 됨을 양지해 주시기 바랍니다.
                            <br />
                            <br /> - 상품의 하자 또는 상품 페이지상에서 제공된 상품정보와 상이할 경우에 의한 반품 <br />
                            <br />
                            (상품 수령후 3개월 이내에 해 주시면 되고, 반품 배송비는 당사에서 부담합니다.)
                            <br />
                            <br /> - 고객님의 단순변심에 의한 반품 <br />
                            <br />
                            (반품요청은 상품 수령 후 7일 이내에 해 주셔야 하며, 이때 반품 배송비는 고객님께서 부담하셔야 합니다)
                            <br />
                            <br /> [반품/교환이 불가능한 경우] <br />
                            <br />- 반품/교환 요청기간이 경과한 경우. - 상품을 구매하신 고객께서 상품의 구성품을 잃어버리거나 파손한 경우.
                            <br />
                            <br /> - 포장 또는 제품을 훼손하여 상품가치가 현저히 상실된 경우. <br />- 상품을 구매하신 고객께서 이미 상품을 사용한 경우. <br />
                            <br />
                            [반품/교환시 주의사항] 이상유무 점검이 끝나기 전까지는 포장박스를 버리지 마십시오. <br />
                            <br />
                            반품시에는 택배로 회수해야 하기 때문에 기존 자전거 포장 박스가 필요합니다.
                            <br />
                            <br /> 이후 저희가 택배기사분을 보내 드리면 전달해 주시면 됩니다.
                            <br />
                            <br /> 반품 교환 진행 순서
                            <br />
                            <br /> 1. 제품 문의하기에 신청 (사진을 첨부해주시면 쉽게 판별)
                            <br />
                            <br /> 2. 교환건 판별 및 교환재고 확인 <br />
                            <br />
                            3. 택배 발송 <br />
                            <br />
                            4. 나무자전거에서 상태확인후 고객님께 새제품 발송 소요기간은 넉넉히 7일정도로 여유롭게 기다리시면 좋은 제품을 다시 받아 보실수 있습니다.
                        </p>
                    </>
                )}
            </div>

        </StyledContent>
    );
};

export default ProductDetail;
