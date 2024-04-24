import axios from 'axios';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { MdModeEditOutline } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";
import { Modal, Button } from 'react-bootstrap';
import '../shop/Review.css';

const Review = ({ product, loginUser }) => {

const { pId } = useParams();
   console.log('product.pId:', pId);

    const [content, setContent] = useState('');
    const [entities, setEntities] = useState([]);
   
    //수정, 삭제
    const [isEdit, setIsEdit] = useState(false);
    const  [products, setProducts] = useState([]);
    const [showEdit, setShowEdit] = useState(false);

    const onEdit = () => {
        setIsEdit(true);
    }

    const handleClose = () => setShowEdit(false);
    const handleShow = () => setShowEdit(true);

    const onDel = (pId) => {
        setProducts(products.filter(product => product.pId!==pId))
    }

    useEffect(() => {
        if (pId) {
            fetchData(pId);
        }
    }, [pId]);

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
            pid: pId,
            rcontent: content,
            rdate: rdate,
            rstar: null,
            uid: loginUser.uid,
        };

        try {
            const response = await axios.post('http://localhost:4000/pedal/review', data);
            console.log('데이터 전달 성공: ', response.data);
            fetchData(pId);
            setContent('');
        } catch (error) {
            console.error('데이터 전달 에러:', error);
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div class='layout'>
                <div class="uname">{loginUser.uname}</div>
                <div class="pname">{product.pName} </div>
                <textarea class="content" placeholder="리뷰를 달아주세요 :)" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <button className='btn' type="submit" style={{ width:'80px', height:'40px', borderRadius: '20px', borderTopRightRadius:'0', borderBottomRightRadius: '20px', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px', backgroundColor:'#1675F2'}}>등록</button>
                </div>
            </form>

            <div>
                <ul className="review">
                    {entities.map((entity) => (
                        <li key={entity.pid}>
                            <hr class='line' style={{width:'60vw'}}/>
                            <div className="review-item">
                                <span>
                                    {entity.pid} {entity.pname} / {entity.uid} / {entity.rcontent ? entity.rcontent.replace(/\//g, ' ') : ''} / {entity.rdate}
                                </span>
                                <span className="review-icons">
                                    <MdModeEditOutline onClick={handleShow} />
                                    <FaDeleteLeft onClick={() => onDel(pId)} />
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {showEdit && (
                <>
                    <Modal show={showEdit} onHide={handleClose} centered>
                        <Modal.Body>
                            <form onSubmit={onSubmit}>
                                <div class="uname">{loginUser.uname}</div>
                                <div class="pname">{product.pName} </div>
                                리뷰: <textarea class="content" placeholder="리뷰를 다시 입력하세요" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                                <button type="submit">등록</button>
                            </form>
                        </Modal.Body>
                        <Button variant="primary" onClick={handleClose} style={{ width: '100px', borderRadius: '15px', marginBottom: '10px', marginLeft: 'auto', marginRight: '10px' }}>
                            저장
                        </Button>
                    </Modal>
                </>
            )}

            <br />
            <br />
            <br />
            <br />
        </div>
    );
};

export default Review;
