import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { PiHeart, PiHeartFill  } from "react-icons/pi";
import { useSelector } from 'react-redux';
import Review from './Review';
import Numeral from 'numeral';
import { Avatar, Badge, Space } from 'antd';

const StyledContent = styled.div`

    width: 100%;
    margin-top: 100px;

    h1 {
    font-size: 25px;
    font-weight: bold;
    }

    .image_container {
        display: flex;
        margin-left: 300px;
        margin-left: 300px;
        overflow: hidden;
        caret-color: transparent;   /* 커서 깜빡임 없애기 */
        caret-color: transparent;   /* 커서 깜빡임 없애기 */
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
        width: 550px;
        height: 370px;
        object-fit: cover; /* 부모에게 맞추거나, 비율유지하면서 잘라내기도 함 */
        width: 550px;
        height: 370px;
        object-fit: cover; /* 부모에게 맞추거나, 비율유지하면서 잘라내기도 함 */
    }

    .product_info {
        padding-left: 100px;
        width: 800px;
    }

    .btns {
    display: flex;
    justify-content: flex-end;
    padding-right: 500px;
    margin-bottom: 20px;
    position: relative;
    top: -70px;
    left: 50px;
}
    .btns {
    display: flex;
    justify-content: flex-end;
    padding-right: 500px;
    margin-bottom: 20px;
    position: relative;
    top: -70px;
    left: 50px;
}

    .btn_cart {
    width: 260px;
    width: 260px;
    height: 50px;
    background-color: #fff;
    border: 1px solid #343a40;
    font-size: 17px;
    border-radius: 10px;
    margin-left: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    }
    }

    .btn_cart:hover {
    .btn_cart:hover {
    background-color: #1675F2;
    color: #fff;
    border: none;
}

    //상품설명,리뷰,교환반품 밑줄 - 파란색 하이라이트
    .clickElement {
        -webkit-user-select: none;
        font-size: 14px;
        cursor: pointer;
        font-size: 14px;
        cursor: pointer;
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
        margin-top: 200px;
        margin-bottom: 50px;

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


    .tot{
        display: flex;
        justify-content: flex-end;
        padding-right: 390px;
        padding-right: 390px;
        font-size: 13px;
    }
    
    .tot_amount{
        font-size: 35px;
        font-weight: bold;
        margin-bottom: -200px;
        margin-bottom: -200px;
        margin-top: -25px;
        color: #1675F2;
    }

    .line_productDetail{
        width: 47%;
        margin-left: -10px; 
    }

    .line_productDetail{
        width: 47%;
        margin-left: -10px; 
    }
`;

const ProductDetail = () => {

    const navigate = useNavigate();
    const { pId } = useParams();//상품 ID
    const [quantity, setQuantity] = useState(1); //구매수량
    const [reviewCount, setReviewCount] = useState(0);//리뷰 총 수
    const [product, setProduct] = useState({ //상품 상태 저장
    const { pId } = useParams();//상품 ID
    const [quantity, setQuantity] = useState(1); //구매수량
    const [reviewCount, setReviewCount] = useState(0);//리뷰 총 수
    const [product, setProduct] = useState({ //상품 상태 저장
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

    //pId가 변경될 때마다 실행되어야함 -> 의존성배열 [pId] 필요
    //pId가 변경될 때마다 실행되어야함 -> 의존성배열 [pId] 필요
    useEffect(() => {
        fetchProductById(pId);
        console.log(' Id가져오고있냐~~~:',pId);
        window.scrollTo(0, 0);
        window.scrollTo(0, 0);
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

    //---------------------------------------------------------------------------------------

    
    useEffect(() => {
        //리뷰 count
        const reviewIncrement = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pedal/reviewCount');
                console.log("reviewCount",reviewCount);
                console.log('count체크:', response.data);
                setReviewCount(response.data);
            } catch (error) {
                console.error('리뷰 수를 불러오는 중 오류 발생:', error);
                return null;
            }
        };
        reviewIncrement();

    }, []);
  
    
        //리뷰 count
        // const reviewIncrement = () => {

        //     setReviewCount(prevCount => prevCount + 1); 
        // };
        
    
    
    //---------------------------------------------------------------------------------------
    // 상품설명,리뷰,교환환불 메뉴바
    const [selectMenu,setSelectMenu] = useState('productInfo'); //기본값 = 상품설명
    //---------------------------------------------------------------------------------------

    
    useEffect(() => {
        //리뷰 count
        const reviewIncrement = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pedal/reviewCount');
                console.log("reviewCount",reviewCount);
                console.log('count체크:', response.data);
                setReviewCount(response.data);
            } catch (error) {
                console.error('리뷰 수를 불러오는 중 오류 발생:', error);
                return null;
            }
        };
        reviewIncrement();

    }, []);
  
    
        //리뷰 count
        // const reviewIncrement = () => {

        //     setReviewCount(prevCount => prevCount + 1); 
        // };
        
    
    
    //---------------------------------------------------------------------------------------
    // 상품설명,리뷰,교환환불 메뉴바
    const [selectMenu,setSelectMenu] = useState('productInfo'); //기본값 = 상품설명
    const [selectPick,setSelectPick] = useState(false); //기본값 = 상품설명

    const showProductInfo = () => {
        setSelectMenu('productInfo');
        setSelectMenu('productInfo');
    }

    const showReview = () => {
        setSelectMenu('review');
        setSelectMenu('review');
    }

    const showPolicy = () => {
        setSelectMenu('policy');
        setSelectMenu('policy');
    }

    const clickPick = () => {
        setSelectPick(!selectPick)
    }

    //---------------------------------------------------------------------------------------
    // 이미지 change
    const [showImage,setShowImage] = useState('/image/MY23TCRAdvancedPro0Disc-AR_ColorACarbon_Messier(3).jpg');


    //마우스올렸을 때 해당 이미지 보여주기
    const changeImage = (image) => {
        setShowImage(image);
    }

    //마우스 떼면 기본 이미지로 돌아가기
    const removeImage = () => {
        setShowImage('/image/MY23TCRAdvancedPro0Disc-AR_ColorACarbon_Messier(3).jpg');
    }



    const [show, setShow] = useState(true);

    return (
        <StyledContent>
            <div className="image_container">
                <div className="sub_images">
                    <ul className="image_sub">
                        <li>
                            <img
                                src="/image/MY23TCRAdvancedPro0Disc-AR_ColorACarbon_Messier_D-1-1(1).jpg"
                                alt=""
                                onMouseOver={() => changeImage('/image/MY23TCRAdvancedPro0Disc-AR_ColorACarbon_Messier_D-1-1(1).jpg')}
                                onMouseOut={removeImage}
                            />
                        </li>
                        <li>
                            <img
                                src="/image/MY23TCRAdvancedPro0Disc-AR_ColorACarbon_Messier_D-1-2(1).jpg"
                                alt=""
                                onMouseOver={() => changeImage('/image/MY23TCRAdvancedPro0Disc-AR_ColorACarbon_Messier_D-1-2(1).jpg')}
                                onMouseOut={removeImage}
                            />
                        </li>
                        <li>
                            <img
                                src="/image/MY23TCRAdvancedPro0Disc-AR_ColorACarbon_Messier_D-1-216(1).jpg"
                                alt=""
                                onMouseOver={() => changeImage('/image/MY23TCRAdvancedPro0Disc-AR_ColorACarbon_Messier_D-1-216(1).jpg')}
                                onMouseOut={removeImage}
                            />
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="image_main">
                        <li>
                            <img src={showImage} alt="" />
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
                                <a href="/pedal/home" style={{ textDecoration: 'none' }}>
                                    Home
                                </a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {product.pcategory}
                            </li>
                        </ol>
                    </nav>
                    <h1>{product.pname}</h1>
                    <br />
                    <p style={{ fontSize: '14px' }}>
                        가격 <span style={{ marginLeft: '220px' }}>&nbsp;{Numeral(product.pprice).format(0.0)}&nbsp;원</span>
                    </p>
                    <hr className="line_productDetail" />
                    <p className="clickElement">
                        수량 &nbsp;
                        <FiMinus style={{ marginLeft: '180px' }} onClick={decrement} />
            <div className="image_container">
                <div className="sub_images">
                    <ul className="image_sub">
                        <li>
                            <img
                                src="/image/MY23TCRAdvancedPro0Disc-AR_ColorACarbon_Messier_D-1-1(1).jpg"
                                alt=""
                                onMouseOver={() => changeImage('/image/MY23TCRAdvancedPro0Disc-AR_ColorACarbon_Messier_D-1-1(1).jpg')}
                                onMouseOut={removeImage}
                            />
                        </li>
                        <li>
                            <img
                                src="/image/MY23TCRAdvancedPro0Disc-AR_ColorACarbon_Messier_D-1-2(1).jpg"
                                alt=""
                                onMouseOver={() => changeImage('/image/MY23TCRAdvancedPro0Disc-AR_ColorACarbon_Messier_D-1-2(1).jpg')}
                                onMouseOut={removeImage}
                            />
                        </li>
                        <li>
                            <img
                                src="/image/MY23TCRAdvancedPro0Disc-AR_ColorACarbon_Messier_D-1-216(1).jpg"
                                alt=""
                                onMouseOver={() => changeImage('/image/MY23TCRAdvancedPro0Disc-AR_ColorACarbon_Messier_D-1-216(1).jpg')}
                                onMouseOut={removeImage}
                            />
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="image_main">
                        <li>
                            <img src={showImage} alt="" />
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
                                <a href="/pedal/home" style={{ textDecoration: 'none' }}>
                                    Home
                                </a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {product.pcategory}
                            </li>
                        </ol>
                    </nav>
                    <h1>{product.pname}</h1>
                    <br />
                    <p style={{ fontSize: '14px' }}>
                        가격 <span style={{ marginLeft: '220px' }}>&nbsp;{Numeral(product.pprice).format(0.0)}&nbsp;원</span>
                    </p>
                    <hr className="line_productDetail" />
                    <p className="clickElement">
                        수량 &nbsp;
                        <FiMinus style={{ marginLeft: '180px' }} onClick={decrement} />
                        &nbsp;
                        <input type="text" value={quantity} readOnly style={{ textAlign: 'center', marginTop: '-10px', width: '50px', borderColor: '#0000' }} />
                        <input type="text" value={quantity} readOnly style={{ textAlign: 'center', marginTop: '-10px', width: '50px', borderColor: '#0000' }} />
                        &nbsp;
                        <IoIosAdd onClick={increment} />
                    </p>
                    <hr className="line_productDetail" />
                    <hr className="line_productDetail" />
                    <br />
                    <div className="tot">
                        총 상품금액 &nbsp;&nbsp;
                        <span className="tot_amount">{Numeral(product.pprice * quantity).format(0.0)}</span>
                        &nbsp;<p style={{ fontWeight: 'bold', marginTop: '5px' }}>원</p>
                    <div className="tot">
                        총 상품금액 &nbsp;&nbsp;
                        <span className="tot_amount">{Numeral(product.pprice * quantity).format(0.0)}</span>
                        &nbsp;<p style={{ fontWeight: 'bold', marginTop: '5px' }}>원</p>
                    </div>
                </div>
            </div>

            <div className="btns">
                <div className="btns_group">
            <div className="btns">
                <div className="btns_group">
                    <div>
                        <button type="button" className="btn_cart" onClick={clickPick} style={{ width: '60px', backgroundColor: '#ffd131' }}>
                            {/* selectPick 상태에 따라 아이콘을 변경 */}
                            {selectPick ? <PiHeartFill value={selectPick} style={{ fontSize: '23px' }} /> : <PiHeart style={{ fontSize: '23px' }} />}
                        </button>
                        <button type="button" className="btn_cart" onClick={onCart}>
                            &nbsp;장바구니&nbsp;
                        </button>
                    </div>
                </div>
            </div>

            {/* 
            <div className="image_container"> </div> */}
            {/* 
            <div className="image_container"> </div> */}

            <div className="centerLineGroup_1">
                <ul>
                    <li className="centerLine" onClick={showProductInfo}>
                        상품 설명
                    </li>

                    {/* 리뷰숫자 */}
                    <li className="centerLine" onClick={showReview}>
                        <Space size="large">
                            <Badge count={reviewCount} overflowCount={10} style={{backgroundColor:'#1675F2'}}>
                                <span style={{ fontSize: '20px', marginRight: '20px'}}>리뷰</span>
                            </Badge>
                        </Space>
                    </li>

                    <li className="centerLine" onClick={showPolicy}>
                        교환/반품
                    </li>
                </ul>
            </div>

            <div className="centerLineGroup_2">
                {selectMenu === 'productInfo' && (
                {selectMenu === 'productInfo' && (
                    <>
                        {/* <p>설명: {product.pdescription}</p> */}
                        <p>
                            <img src="/image/20240419_180244.png" alt="[ 상세설명 ]" />
                            <img src="/image/20240419_180244.png" alt="[ 상세설명 ]" />
                        </p>
                    </>
                )}

                {selectMenu === 'review' && (
                {selectMenu === 'review' && (
                    <>
                        <Review product={product} loginUser={loginUser} reviewCount={reviewCount} setReviewCount={setReviewCount} />
                    </>
                )}

                {selectMenu === 'policy' && (
                {selectMenu === 'policy' && (
                    <>
                        <p className="policy">
                            <img src="/image/refund.jpg" alt="" />
                            <img src="/image/refund.jpg" alt="" />
                        </p>
                    </>
                )}
            </div>
        </StyledContent>
    );
};

export default ProductDetail;
