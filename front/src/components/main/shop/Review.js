import axios from 'axios';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { Modal, Button } from 'react-bootstrap';
import '../shop/Review.css';
import { Avatar, Flex, Rate, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { VscClose } from 'react-icons/vsc';
import { useSelector } from 'react-redux';


const Review = ({ product, reviewCount, setReviewCount}) => {
    
    console.log('product.pId:', product.pid);
    
    const [content, setContent] = useState('');
    const [entities, setEntities] = useState([]);
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
     

    //삭제
    const onDel = (pId) => {
        setProducts(products.filter(product => product.pId!==pId))
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
             // 데이터를 가져오고 배열 형태로 설정
        setEntities(Array.isArray(response.data) ? response.data : []);
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
                <br/>
                <div className="review_box_center">
                    <div className="review_box">
                        <span className="review_text">
                            후기를 올려주세요.
                            <br />내 후기가 다른 사람에게 도움이 됩니다.
                        </span>
                        <Button
                            className="btn-review"
                            style={{
                                width: '170px',
                                marginLeft: '20px',
                                marginBottom: '5px',
                                borderRadius: '35px',
                                borderTopRightRadius: '20px',
                                borderBottomRightRadius: '20px',
                                borderBottomLeftRadius: '20px',
                                borderTopLeftRadius: '0px',
                                backgroundColor: '#1675F2',
                                caretColor: 'transparent',
                            }}
                            onClick={handleShow}
                        >
                            + 후기 등록하기
                        </Button>
                    </div>
                </div>
            </div>

            {/* <div class="layout">
                    <div class="uname">{loginUser.uname}</div>
                    <div class="pname">{product.pName} </div>
                </div> */}

            <div>
                <ul className="review">
                    {entities.map((entity) => (
                        <li key={entity.pid}>
                            <hr class="line" style={{ width: '50vw' }} />
                            <div className="review-item">
                                <span>


                                    <div>
                                        <div>

                                            <div className='loginUser'>
                                                <Space direction="vertical" size={16}>
                                                    <Space wrap size={16}>
                                                        <Avatar icon={<UserOutlined />} />
                                                    </Space>
                                                </Space>
                                                <b>{entity.uname}</b>({entity.uid})
                                            </div>

                                           <div className='user_review'>
                                           <Rate value={parseInt(entity.rstar)} disabled={true} />
                                                    {'ㅣ'} {entity.rdate}
                                            </div>
                                           
                                            
                                        </div>
                                        <div className='user_review_rcontent'>
                                        {entity.rcontent ? entity.rcontent.replace(/\//g, ' ') : ''}
                                        </div>
                                    </div>
                                    
                                  
                                   <div className='user_review_pname'>{product.pname}</div>
                                </span>
                                <span className="review-icons">
                                    <VscClose  onClick={() =>onDel(entity.pid)} style={{color:'#ced4da', fontSize: '25px'}}/>
                                </span>
                            </div>
                        </li>
                    ))}
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
