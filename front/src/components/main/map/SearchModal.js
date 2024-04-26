import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoCloseSharp } from "react-icons/io5";
import { CgSearch } from "react-icons/cg";

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
        <div className='search-container'>
            <div className='search-warp'>
                <div className='search-close' onClick={onCloseModal}><IoCloseSharp/></div>
                <div className='search-box'>
                    <form onSubmit={(evt) => { evt.preventDefault()}}>
                        <fieldset className='field-set'>
                            <legend className='legend-set'></legend>
                            <div className='box-search'>
                                <input type='text' value={keyword} onChange={(evt)=>setKeyword(evt.target.value)} placeholder='검색어를 입력해주세요.'/> 
                                <CgSearch className='search-icon' onClick={() => searchDB()}/>
                            </div>
                        </fieldset>
                    </form>
                    <ul className='search-value'>
                        {searchResults.length >1 ?
                            (searchResults.map((item) => (
                                <li key={item.rent_id_nm} className='value-item'>
                                <span onClick={() =>handleClick(item)}>{item.rent_id_nm}</span>
                                </li>
                            ))):(
                                <span></span>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;