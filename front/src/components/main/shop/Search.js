import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchList from './SearchList';
import Shop from './Shop';

const Search = () => {
    const [getData,setGetData]= useState([]);
    const [searchValue,setSearchValue] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {
    const fetchData = async () => {//전체 데이터 가져오기
        try {
            const response = await axios.get('http://localhost:4000/pedal/shop/search');
            setGetData(response.data);
        } catch (error) {
            console.error('error_fetch', error);
        }
    };
    fetchData();
    }, []);

    const searchItems = (e) => {//가져온 전체 데이터 검색어에 맞게 필터링하기
        const filteredData=getData.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase());
        });
        setFilteredResults(filteredData);
    }
    useEffect(() => {// 검색어가 변경될 때마다 필터링된 결과 초기화
        setFilteredResults([]);
    }, [searchValue]);

    return (
        <div>
            <form onSubmit={(evt) => { evt.preventDefault()}}>
                <input type='text' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder='Search'/>
                <button onClick={()=>searchItems()}>검색</button>
            </form>
            {filteredResults.length > 0 && 
                <SearchList filteredResults={filteredResults} searchValue={searchValue}/>}
        </div>
    );
};

export default Search;