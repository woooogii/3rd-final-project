import axios from 'axios';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const Review = ({ product, loginUser }) => {

    const { pId } = useParams();
   console.log('product.pId:', pId);

    const [content, setContent] = useState('');
    const [entities, setEntities] = useState([]);

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
                <div>{loginUser.uname}</div>
                <div>{product.pName} </div>
                리뷰: <textarea placeholder='리뷰를 달아주세요 :)' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <button type='submit'>전송</button>
            </form>

            <div>
                <ul>
                    {entities.map((entity) => (
                        <li key={entity.pid}>
                         {entity.pid} {entity.pname} / {entity.uid} / {entity.rcontent ? entity.rcontent.replace(/\//g, ' ') : ''} / {entity.rdate}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default Review;
