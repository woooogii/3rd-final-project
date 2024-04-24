import React, { useRef, useState } from 'react';
import axios from 'axios';

const AddProduct = ({ addProduct }) => {
    const [form, setForm] = useState({
        pName: '',
        pCategory: '',
        pPrice: '',
        pDescription: ''
    });
    const { pName, pCategory, pPrice, pDescription } = form;
    const [images, setImages] = useState(null); 
    const nameRef = useRef();

    const proInfoInput = (evt) => {
        const { value, name } = evt.target;
        setForm({ ...form, [name]: value });
    };
    const insertProduct = async (evt) => {
        evt.preventDefault();
        try {
            const data = new FormData();
            data.append("pname", pName);
            data.append("pcategory", pCategory);
            data.append("pprice", pPrice);
            data.append("pdescription", pDescription);

            for (let i = 0; i < images.length; i++) {
                data.append("files", images[i]);
            }
        
            const response = await axios.post('http://localhost:4000/pedal/shop/created', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log('전송데이터: ', form);
            console.log('전송파일: ', images);
            console.log('전송 성공:', response.data);

        } catch (error) {
            console.error('전송 에러:', error);
        }
        setForm({
            pName: '',
            pCategory: '',
            pPrice: '',
            pSaveFileName: '',
            pDescription: ''
        });
        nameRef.current.focus();
    };


    return (
        <div>
            <form onSubmit={insertProduct}>
                <p>이름: <input value={pName || ''} name='pName' onChange={proInfoInput} ref={nameRef} /></p>
                <p>카테고리: <input value={pCategory || ''} name='pCategory' onChange={proInfoInput} /></p>
                <p>가격: <input value={pPrice || ''} name='pPrice' onChange={proInfoInput} /></p>
                <p>상세 이미지:
                <input type='file' multiple onChange={(evt)=>{setImages(evt.target.files)}}/>
                </p>
                <p>상세설명: <input value={pDescription || ''} name='pDescription' onChange={proInfoInput} /></p>
                <button type='submit'>insert</button>
            </form>
        </div>
    );
};

export default AddProduct;
