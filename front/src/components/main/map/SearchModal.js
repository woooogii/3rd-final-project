import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoCloseSharp } from "react-icons/io5";
import { CgSearch } from "react-icons/cg";
import './style/search.css';

const SearchModal = ({onCloseModal, handleClick}) => {
    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // db 데이터 가져오기
    const searchDB = async (data) => {
        try {
            const response = await axios.post('http://localhost:4000/pedal/station/search', { keyword: data });
            setSearchResults(response.data);
        } catch (error) {
            console.error('search_error', error.response.status, error.response.data);
        }
    };

    // 검색어 입력 시 실행되는 함수
    const searchData = (data) => {
        if (data.trim()) {
            searchDB(data);
        } else {
            setSearchResults([]); // 입력값이 없을 때 검색 결과 초기화
        }
    };

    // 검색어 변경 시 검색 결과 초기화
    useEffect(() => {
        setSearchResults([]);
    }, [keyword]);

    return (
        <div className='search-container'>
            <div className='search-warp'>
                <div className='search-close' onClick={onCloseModal}><IoCloseSharp/></div>
                    <div className='search-box'>
                        <form onSubmit={(evt) => { evt.preventDefault(); searchData(keyword);}}>
                            <div className='box-search'>
                                <div>
                                    <input type='text' value={keyword} onChange={(evt)=>setKeyword(evt.target.value)} placeholder='대여소 명 또는 번호를 입력하세요.'/> 
                                </div>
                                <div><CgSearch className='search-icon' onClick={() => searchData(keyword)}/></div>
                            </div>
                        </form>
                    </div>
                    <div className='search-value'>
                        <ul>
                            {searchResults.length > 1 ?
                                (searchResults.map((item) => (
                                    <li key={item.rent_id_nm} className='value-item'>
                                        <div className='circle'></div>
                                        <div onClick={() => handleClick(item)}>{item.rent_id_nm}</div>
                                    </li>
                                ))) :
                                (<div></div>)
                            }
                        </ul>
                    </div>
                </div>
        </div>
    );
};

export default SearchModal;
