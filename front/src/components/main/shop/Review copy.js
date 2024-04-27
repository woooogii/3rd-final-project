// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import moment from 'moment';
// import { useParams } from 'react-router-dom';
// import { MdModeEditOutline } from "react-icons/md";
// import { FaDeleteLeft } from "react-icons/fa6";
// import { Modal, Button } from 'react-bootstrap';
// import '../shop/Review.css';

// const Review = ({ product, loginUser }) => {

// const { pId } = useParams();
//    console.log('product.pId:', pId);

   
//     const [content, setContent] = useState('');
//     const [updateContent, setUpdateContent] = useState(''); //모달에서 수정중인 리뷰
//     const [entities, setEntities] = useState([]);
   
//     //모달 켜고 닫기
//     const [showEdit, setShowEdit] = useState(false);

//     //모달닫기
//     const handleClose = () => setShowEdit(false);
//     //모달 열기
//     const handleShow = () => setShowEdit(true);

   
//     useEffect(() => {
//         if (pId) {
//             fetchData(pId);
//         }
//     }, [pId]);


//     //모든 리뷰 가지고오기
//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://localhost:4000/pedal/reviewAll');
//              // 데이터를 가져오고 배열 형태로 설정
//         setEntities(Array.isArray(response.data) ? response.data : []);
//             console.log("데이터받았니?", response.data);
//         } catch (error) {
//             console.error('데이터 불러오기 에러:', error);
//         }
//     };


//     //새 리뷰 작성
//     const onSubmit = async (e) => {
//         e.preventDefault();

//         const rdate = moment().format('YYYY-MM-DD HH:mm:ss');

//         const data = {
//             pId: pId,
//             rContent: content,
//             rDate: rdate,
//             rStar: null,
//             uId: loginUser.uid,
//         };

//         try {
//             const response = await axios.post('http://localhost:4000/pedal/review', data);
//             console.log('데이터 전달 성공: ', response.data);
//             fetchData(pId);
//             setContent('');
//         } catch (error) {
//             console.error('데이터 전달 에러:', error);
//         }
//     };

        
//         //수정버튼 클릭
//         const handleEditClick = (content) => {
//             setUpdateContent(content);
//             handleShow();
//         }


//     //데이터 수정한걸로 저장
//     const handleSubmitEdit = async () => {
//         const rdate = moment().format('YYYY-MM-DD HH:mm:ss');

//         console.log('rContent: ' , updateContent);
//         console.log('rDate: ' , rdate);
//         console.log('pId: ' , pId);
//         console.log('uId: ' , loginUser.uid);

//         const data = {
//             rContent: updateContent,
//             rDate: rdate,
//             rStar: 4,
//             pId: pId,
//             uId: loginUser.uid,
//         };
    
//         try {
//             const response = await axios.post(`http://localhost:4000/pedal/updateReview/${pId}`,data);
//             console.log('데이터 수정 성공: ', response.data);
//             fetchData(pId);
//             setUpdateContent('');
//         } catch (error) {
//             console.error('데이터 수정 에러:', error);
//         }
//     };

//         //삭제
//         const onDel = async (pId) => {
//             try {
//                 await axios.delete(`http://localhost:4000/pedal/deleteReview/${pId}`);
//                 fetchData(pId);
//             } catch (error) {
//                 console.error('데이터 삭제 에러:', error);
//             }
//         }



//     return (
//         <div>
//             <form onSubmit={onSubmit}>
//                 <div class="layout">
//                     <div class="uname">{loginUser.uname}</div>
//                     <div class="pname">{product.pName} </div>
//                     <textarea class="content" placeholder="리뷰를 달아주세요 :)" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
//                     <button
//                         className="btn"
//                         type="submit"
//                         style={{
//                             width: '80px',
//                             height: '40px',
//                             borderRadius: '20px',
//                             borderTopRightRadius: '0',
//                             borderBottomRightRadius: '20px',
//                             borderTopLeftRadius: '20px',
//                             borderBottomLeftRadius: '20px',
//                             backgroundColor: '#1675F2',
//                         }}
//                     >
//                         등록
//                     </button>
//                 </div>
//             </form>

//             <div>
//                 <ul className="review">
//                     {entities.map((entity, index) => (
//                         <li key={index}>
//                             <hr className="line" style={{ width: '60vw' }} />
//                             <div className="review-item">
//                                 <span>
//                                     {entity.pid} {entity.pname} / {entity.uid} / {entity.rcontent ? entity.rcontent.replace(/\//g, ' ') : ''} / {entity.rdate}
//                                 </span>
//                                 <span className="review-icons">
//                                     <MdModeEditOutline onClick={() => handleEditClick(entity.rcontent)} />
//                                     <FaDeleteLeft onClick={() => onDel(entity.pid)} />
//                                 </span>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             {showEdit && (
//                 <>
//                     <Modal show={showEdit} onHide={handleClose} centered>
//                         <Modal.Body>
//                             <div class="submit_uname">{loginUser.uname}</div>
//                             <div class="submit_pname">{product.pName} </div>
//                             <div style={{ textAlign: 'center' }}>
//                                 <b>리뷰 수정하기</b>
//                                 <hr />
//                                 <textarea class="submit_content" placeholder="리뷰를 다시 입력하세요" value={updateContent} onChange={(e) => setUpdateContent(e.target.value)}></textarea>
//                             </div>
//                             <Button
//                                 variant="primary"
//                                 onClick={() => {
//                                     handleSubmitEdit(); // 수정 버튼
//                                     handleClose(); // 모달 닫기
//                                 }}
//                                 style={{ width: '100px', borderRadius: '15px', marginBottom: '10px', marginLeft: 'auto', marginRight: '10px' }}
//                             >
//                                 수정
//                             </Button>
//                             <Button variant="secondary" onClick={handleClose} style={{ width: '100px', borderRadius: '15px', marginBottom: '10px' }}>
//                                 닫기
//                             </Button>
//                         </Modal.Body>
//                     </Modal>
//                 </>
//             )}

//             <br />
//             <br />
//             <br />
//             <br />
//         </div>
//     );
// };

// export default Review;
