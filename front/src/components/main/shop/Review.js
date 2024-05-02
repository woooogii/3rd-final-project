import axios from 'axios';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { Modal, Button } from 'react-bootstrap';
import '../shop/Review.css';
import { Avatar, Flex, Rate, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { VscClose } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../shop/Huigidongdong.css'


const Review = ({ product, reviewCount, setReviewCount}) => {
    
    console.log('product.pId:', product.pid);
    
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [entities, setEntities] = useState([]);
    const [reviewCountData, setReviewCountData] = useState([]); // 새로운 상태 변수 추가

    const loginUser = useSelector((state) => state.loginUser);

    //삭제
    const  [products, setProducts] = useState([]);
    const [showRegister, setShowRegister] = useState(false);

    //별점
    const desc = ['1', '2', '3', '4', '5'];
    const [value, setValue] = useState(null);

    const handleStar = (value) => {
        setValue(value);
    }

    //후기등록 - 모달 닫기
    const handleClose = () => setShowRegister(false);

     //후기등록 - 모달 열기
    const handleShow = () => {
        setShowRegister(true)
        setValue(null);
    }

    //로그인유도
    const redirectLogin = () => {
        alert('로그인이 되어있지않습니다.')
        navigate('/pedal/login'); // 로그인 페이지로 이동합니다.
    };


    //삭제
    const onDel = async (rId) => {
        try {
            await axios.delete(`http://localhost:4000/pedal/deleteReview/${rId}`);
            setEntities(entities.filter(entity => entity.rid !== rId));
            setReviewCount(reviewCount - 1); // 리뷰 수 감소
        } catch (error) {
            console.error('리뷰 삭제 중 오류 발생:', error);
        }
    }

    useEffect(() => {
        if (product.pid) {
            fetchData(product.pid);
            fetchReviewCount(product.pid); //리뷰 수 가져오기
        }
    }, [product.pid]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/pedal/review/${product.pid}`);
             // 받아온 데이터를 콘솔에 출력하여 확인
        console.log("받은데이터",response.data);
        
            // 가져온 데이터를 배열로 설정
            const sortEntities = Array.isArray(response.data) ? response.data : [];

            // rId를 기준으로 내림차순으로 정렬
            sortEntities.sort((a, b) => b.rId - a.rId);
            console.log('Sorted Entities:', sortEntities);
            // 정렬된 데이터를 상태에 저장
            setEntities(sortEntities);

            console.log("데이터받았니?", response.data);
        } catch (error) {
            console.error('데이터 불러오기 에러:', error);
        }
    };

     // 리뷰 수 가져오는 함수
     const fetchReviewCount = async (pId) => {
        try {
            const response = await axios.get(`http://localhost:4000/pedal/reviewCount/${pId}`);
            console.log('리뷰 수:', response.data);
            
            // 새로운 상태 변수에 데이터 저장
            setReviewCountData(Array.isArray(response.data) ? response.data : []);
            
            setReviewCount(response.data);
        } catch (error) {
            console.error('리뷰 수를 불러오는 중 오류 발생:', error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const rdate = moment().format('YYYY-MM-DD HH:mm:ss');

        const data = {
            pid: product.pid,
            rcontent: content,
            rdate: rdate,
            rstar: value,
            uid: loginUser.uid,
            uname: loginUser.uname
        };

        try {
            const response = await axios.post('http://localhost:4000/pedal/review', data);
            console.log('데이터 전달 성공: ', response.data);
            fetchData(product.pid);
            setContent('');
            
            // 데이터 보내고나서 리뷰 수 업데이트된걸 받아줘야지 새로고침해도 저장됨
            setReviewCount(reviewCount + 1);

        } catch (error) {
            console.error('데이터 전달 에러:', error);
        }
    };

    return (
        <div>
            <div>
                <Modal show={showRegister} onHide={handleClose} centered>
                    <Modal.Body className="modal-body">
                        {/* 아래버튼 onSubmit 이벤트가 호출된 후에 모달 창 닫기 */}
                        <form>
                            <div class="review_register_title">리뷰 등록</div>
                            <div class="review_register_pname">{product.pname} </div>

                            {/* 별점 */}
                            <Flex gap="middle" vertical class="stars1">
                                <Rate tooltips={value ? desc[value] : []} onChange={handleStar} value={value} />
                            </Flex>

                            <textarea class="content" placeholder="리뷰를 입력하세요" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                        </form>
                    </Modal.Body>
                    <div className="btns_review_footer">
                        <button
                            id="btn"
                            class="btn btn-outline-primary btn-review"
                            onClick={handleClose}
                            style={{ borderRadius: '20px', fontSize: '18px', paddingLeft: '40px', paddingRight: '40px', marginLeft: '160px' }}
                        >
                            취소
                        </button>
                        <button
                            id="btn"
                            class="btn btn-primary btn-review"
                            onClick={(e) => {
                                onSubmit(e);
                                handleClose();
                            }}
                            style={{ borderRadius: '20px', fontSize: '18px', paddingLeft: '40px', paddingRight: '40px' }}
                        >
                            저장
                        </button>
                    </div>
                </Modal>
            </div>

            <div>
                <hr className="line_review" />
                <br />
                
                    <div className="review_box_center" style={{paddingtop:'60px'}}>
                        <div className="review_box" >
                            <span className="review_text">
                                후기를 올려주세요.
                                <br />내 후기가 다른 사람에게 도움이 됩니다.
                            </span>

                            <div className="button-container">
                                <button className="expand-button">
                                    →<span className="button-text"> 희기 동동하기</span>
                                </button>
                            </div>
                            <button className="learn-more" onClick={loginUser && loginUser.uid ? handleShow : redirectLogin}>
                            <span className="circle" aria-hidden="true">
                                <span className="icon arrow"  />
                            </span>
                            <span className="button-text"> 후기 등록하기 </span>
                            </button>
                        </div>
                    </div>
            </div>

            <div>
   <br/>
            {/* 역순으로 */}
                <ul className="review">
                   {entities
                            .slice()
                            .reverse() 
                            .map((entity, index) => (
                                <li key={index}>        
                                    <hr class="line"/>
                                    <div className="review-item">
                                        <span>
                                            <div>
                                                <div>
                                                    <div className="loginUser">
                                                        <Space direction="vertical" size={16}>
                                                            <Space wrap size={16}>
                                                                <Avatar icon={<UserOutlined />} />
                                                            </Space>
                                                        </Space>
                                                        <b>{entity.uname}</b>({entity.uid})
                                                    </div>

                                                    <div className="user_review">
                                                        <Rate value={parseInt(entity.rstar)} disabled={true} />
                                                        {'ㅣ'} {entity.rdate}
                                                    </div>
                                                </div>
                                                <div className="user_review_rcontent">{entity.rcontent ? entity.rcontent.replace(/\//g, ' ') : ''}</div>
                                            </div>

                                            <div className="user_review_pname">{product.pname}</div>
                                        </span>
                                        <span className="review-icons">
                                            <VscClose onClick={() => onDel(entity.rid)} style={{ color: '#ced4da', fontSize: '25px' }} />
                                        </span>
                                    </div>
                                </li>
                            )
                        )}
                </ul>
            </div>

            <br />
            <br />
            <br />
            <br />
        </div>
    );
};

export default Review;
