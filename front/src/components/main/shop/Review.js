import axios from 'axios';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { MdModeEditOutline } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";
import { Modal, Button } from 'react-bootstrap';
import '../shop/Review.css';
import { Flex, Rate } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IoPersonCircleOutline } from "react-icons/io5";

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const Review = ({ product, loginUser,reviewCount,setReviewCount}) => {
    
//const { pId } = useParams();
   console.log('product.pId:', product.pid);

    const [content, setContent] = useState('');
    const [entities, setEntities] = useState([]);
   
    //수정, 삭제
    //const [isEdit, setIsEdit] = useState(false);
    const  [products, setProducts] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [value, setValue] = useState(3);

    // const onEdit = () => {
    //     setIsEdit(true);
    // }

    const handleClose = () => setShowEdit(false);
    const handleShow = () => setShowEdit(true);

    const onDel = (pId) => {
        setProducts(products.filter(product => product.pId!==pId))
    }

    useEffect(() => {
        if (product.pid) {
            fetchData(product.pid);
        }
    }, [product.pid]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/pedal/reviewAll');
             // 데이터를 가져오고 배열 형태로 설정
        setEntities(Array.isArray(response.data) ? response.data : []);
            console.log("데이터받았니?", response.data);
        } catch (error) {
            console.error('데이터 불러오기 에러:', error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const rdate = moment().format('YYYY-MM-DD HH:mm:ss');

        const data = {
            pid: product.pid,
            rcontent: content,
            rdate: rdate,
            rstar: null,
            uid: loginUser.uid,
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

    const navigate = useNavigate();

    return (
        <div>
            <form onSubmit={onSubmit}>
                <hr className='line_review'/>
                <div className='review_box_center'>
                    <div className='review_box'>
                        <span className='review_text'>후기를 올려주세요.<br/>내 후기가 다른 사람에게 도움이 됩니다.</span>
                        <button
                            className="btn-review"
                            type="submit"
                            style={{
                                width: '170px',
                                marginLeft:'20px',
                                marginBottom:'5px',
                                borderRadius: '35px',
                                borderTopRightRadius: '20px',
                                borderBottomRightRadius: '20px',
                                borderBottomLeftRadius: '20px',
                                borderTopLeftRadius: '0px',
                                backgroundColor: '#1675F2',
                                caretColor: 'transparent'
                            }}
                            onClick={handleShow}
                        >
                            + 후기 등록하기
                        </button>
                    </div>
                </div>
                    <hr/>

                <div class="layout">
                    <div class="uname">{loginUser.uname}</div>
                    <div class="pname">{product.pName} </div>
                    <textarea class="content" placeholder="리뷰를 달아주세요 :)" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
            </form>

            <div>
                <ul className="review">
                    {entities.map((entity) => (
                        <li key={entity.pid}>
                            <hr class="line" style={{ width: '60vw' }} />
                            <div className="review-item">
                                <span>
                                    {entity.pid} {entity.pname} / {entity.uid} / {entity.rcontent ? entity.rcontent.replace(/\//g, ' ') : ''} / {entity.rdate}
                                </span>
                                <span className="review-icons">
                                    <FaDeleteLeft onClick={() => onDel(entity.pid)} />
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

       
                <>
                    <Modal show={showEdit} onHide={handleClose} centered>
                        <Modal.Body>
                            <form onSubmit={onSubmit}>
                                <div>리뷰 수정</div>
                                <div class="pname">{product.pname} </div>
                                
                                {/* 별점 */}
                                <Flex gap="middle" vertical>
                                    <Rate tooltips={value ? desc : []} onChange={setValue} value={value} />
                                    {/* 툴팁이 화면에 표시되지 않도록 비어있는 배열([])을 넘겨줍니다. */}
                                    {value ? null : <span>{desc[value - 1]}</span>}
                                    {/* value 값이 있을 때는 null을 반환하여 툴팁이 화면에 표시되지 않도록 하고, 값이 없는 경우에는 desc 배열에서 값을 가져와 보여줍니다. */}
                                </Flex>
                                
                                <textarea class="content" placeholder="리뷰를 입력하세요" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                            </form>
                        </Modal.Body>
                        <div>
                            <button type="button-reReview" id="btn" class="btn btn-outline-primary" onClick={navigate(`/pedal/productDetail/${product.pid}`)}
                             style={{ borderRadius: '20px', fontSize: '16px' }}>
                                &nbsp;&nbsp; 취소 &nbsp;&nbsp;
                            </button>
                            <button type="button-reReview" id="btn" class="btn btn-primary" onClick={navigate(`/pedal/productDetail/${product.pid}`)} style={{ borderRadius: '20px', fontSize: '16px' }}>
                                &nbsp;저장&nbsp;
                            </button>
                        </div>
                    </Modal>
                </>

            <br />
            <br />
            <br />
            <br />
        </div>
    );
};

export default Review;
