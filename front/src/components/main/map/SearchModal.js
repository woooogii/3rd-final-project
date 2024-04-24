import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchModal = ({onCloseModal,handleClick}) => {
    const [keyword,setKeyword] = useState('');
    const [searchResults,setSearchResults] = useState([]);

    useEffect(() => {
        if (keyword.trim()) {
            searchDB();
        }
    }, [keyword]);

    //db데이터 꺼내기
    const searchDB = async () => {
        try {
            const response = await axios.post('http://localhost:4000/pedal/station/search', { keyword: keyword });
            setSearchResults(response.data);
        } catch (error) {
            console.error('search_error', error.response.status, error.response.data);
        }
    };

    return (
        <div className='menu_wrap'>
            <div className="option">
                <div>
                    <form onSubmit={(evt) => { evt.preventDefault()}}>
                        <input type='text' value={keyword} onChange={(evt)=>setKeyword(evt.target.value)} placeholder='검색어를 입력해주세요.'/> 
                        <button onClick={() => searchDB()}>검색하기</button> 
                    </form>
                </div>
            </div>
            <hr/>

            <ul id="placesList">
                {searchResults.length &&
                    searchResults.map((item) => (
                        <li key={item.rent_id_nm}>
                        <span onClick={() =>handleClick(item)}>{item.rent_id_nm}</span>
                        </li>
                    ))
                }
            </ul>
            <button onClick={onCloseModal}>닫기</button>
        </div>
    );
};

export default SearchModal;