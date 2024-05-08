import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { PiHeart, PiHeartFill  } from "react-icons/pi";
import { useSelector } from 'react-redux';
import Review from './Review';
import Numeral from 'numeral';
import { Avatar, Badge, Space } from 'antd';
import ShopHead from './ShopHead';
import {StyledContent} from './style/ProductDetailCss'

const ProductDetail = () => {

    const navigate = useNavigate();
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

       //ShopHead - 상태기억
   const startHereRef = useRef(null);
   useEffect(() => {
       // 렌더링 후 startHere 요소로 스크롤 이동
       if (startHereRef.current) {
           startHereRef.current.scrollIntoView({ behavior: 'smooth' });
       }
   },[]);


    //pId가 변경될 때마다 실행되어야함 -> 의존성배열 [pId] 필요
    useEffect(() => {
        fetchProductById(pId);
        console.log(' Id가져오고있냐~~~:',pId);
        window.scrollTo(0, 0);
    }, [pId]);

    //이미지 로딩됐을 때 기본 image1으로 보여주기
    useEffect(() => {
        setShowImage(product.pimage1);
    }, [product]);

    //---------------------------------------------------------------------------------------
    
    useEffect(() => {
        //리뷰 count
        const reviewIncrement = async () => {
            try {
                const reviewResponse = await axios.get(`http://localhost:4000/pedal/reviewCount/${pId}`);
                console.log('리뷰 수:', reviewResponse.data);
                setReviewCount(reviewResponse.data);
            } catch (error) {
                console.error('리뷰 수를 불러오는 중 오류 발생:', error);
                return null;
            }
        };
        reviewIncrement();
    
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
    // 상품설명,리뷰,교환환불 메뉴바
    const [selectMenu,setSelectMenu] = useState('productInfo'); //기본값 = 상품설명
    const [selectPick,setSelectPick] = useState(false); //기본값 = 상품설명

    const showProductInfo = () => {
        setSelectMenu('productInfo');
    }

    const showReview = () => {
        setSelectMenu('review');
    }

    const showPolicy = () => {
        setSelectMenu('policy');
    }

    const clickPick = () => {
        setSelectPick(!selectPick)
    }

    //---------------------------------------------------------------------------------------
    // 이미지 change
    const [showImage,setShowImage] = useState(product.pimage1);

    //마우스올렸을 때 해당 이미지 보여주기
    const changeImage = (image) => {
        setShowImage(image);
    }

    //마우스 떼면 기본 이미지로 돌아가기
    const removeImage = () => {
        setShowImage(product.pimage1);
    }
    

    return (
        <>
        <div ref={startHereRef}>
            <ShopHead id="head"/>
        </div>
        
        <StyledContent>
            <div className="image_container">
                <div className="sub_images">
                    <ul className="image_sub">
                        <li>
                            <img
                                src={product.pimage2}
                                alt=""
                                onMouseOver={() => changeImage(product.pimage2)}
                                onMouseOut={removeImage}
                            />
                        </li>
                        <li>
                            <img
                                src={product.pimage3}
                                alt=""
                                onMouseOver={() => changeImage(product.pimage3)}
                                onMouseOut={removeImage}
                            />
                        </li>
                        <li>
                            <img
                                src={product.pimage4}
                                alt=""
                                onMouseOver={() => changeImage(product.pimage4)}
                                onMouseOut={removeImage}
                            />
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="image_main">
                        <li>
                         <img src={showImage} alt="" loading="eager" />  
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
                        &nbsp;
                        <IoIosAdd onClick={increment} />
                    </p>
                    <hr className="line_productDetail" />
                    <br />
                    <div className="tot">
                        총 상품금액 &nbsp;&nbsp;
                        <span className="tot_amount">{Numeral(product.pprice * quantity).format(0.0)}</span>
                        &nbsp;<p style={{ fontWeight: 'bold', marginTop: '5px' }}>원</p>
                    </div>
                </div>
            </div>

            <div className="btns">
                <div className="btns_group">
                    <div>
                        <button type="button" className="btn_pick" onClick={clickPick} style={{ width: '60px', backgroundColor: '#ffd131' }}>
                            {/* selectPick 상태에 따라 아이콘을 변경 */}
                            {selectPick ? <PiHeartFill value={selectPick} style={{ fontSize: '23px' }} /> : <PiHeart style={{ fontSize: '23px' }} />}
                        </button>

                        <div data-tooltip="담겼습니다" className="button" onClick={onCart} >
                            <div className="button-wrapper">
                                <div className="text">장바구니</div>
                                <span className="icon">
                                <svg viewBox="0 0 16 16" className="bi bi-cart2" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                                </svg>
                                </span>
                            </div>
                        </div>
                        
                        {/* <button type="button" className="btn_cart" onClick={onCart}>
                            &nbsp;장바구니&nbsp;
                        </button> */}
                    </div>
                </div>
            </div>

            {/* 
            <div className="image_container"> </div> */}


            {/* 메뉴바 */}
            <div className="body">
            <div className="tabs">
                <input defaultChecked defaultValue="HTML" name="fav_language" id="html" type="radio" className="input" />
                <label htmlFor="html" className="label" onClick={showProductInfo}><b>상품 설명</b></label>
                <input defaultValue="CSS" name="fav_language" id="css" type="radio" className="input"  onClick={showReview} />
                <label htmlFor="css" className="label">
                    <Space size="large">
                        <Badge count={reviewCount} showZero={true} overflowCount={10} style={{ backgroundColor:'#1675F2' }}>
                            <span style={{ fontSize: '17px', marginRight: '5px' }}><b>리뷰</b></span>
                        </Badge>
                    </Space>
                </label>
                <input defaultValue="JavaScript" name="fav_language" id="javascript" type="radio" className="input"  onClick={showPolicy} />
                <label htmlFor="javascript" className="label"><b>교환/반품</b></label>
            </div>
            </div>


            <div className="centerLineGroup">
                {selectMenu === 'productInfo' && (
                    <>
                        <p>
                            <img src={product.pimage5} alt="" />
                        </p>
                        
                    </>
                )}

                {selectMenu === 'review' && (
                    <>
                        <Review product={product} loginUser={loginUser} reviewCount={reviewCount} setReviewCount={setReviewCount} />
                    </>
                )}

                {selectMenu === 'policy' && (
                    <>
                        <p className="policy">
                            <img src="/image/refund.jpg" alt="" />
                        </p>
                    </>
                )}
            </div>
        </StyledContent>
        </>
    );
};

export default ProductDetail;
