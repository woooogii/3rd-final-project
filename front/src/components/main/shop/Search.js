import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [searchKeyword,setSearchKeyword] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [searchData,setSearchData]= useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    //기능 ing
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/pedal/shop/search');
            setSearchData(response.data);
        } catch (error) {
            console.error('error_fetch', error);
        }
    };


    const searchItems=(value)=>{
        setSearchInput(value);
        if(searchInput!==''){
            const filteredData=searchData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase());
            });
            setFilteredResults(filteredData);
        }else{
            setFilteredResults(searchData);
        }
    }
    return (
        <div>
            <form onSubmit={(evt) => { evt.preventDefault()}}>
                <input type='text' value={searchKeyword} onChange={(evt)=>searchItems(evt.target.value)} placeholder='Search'/>
                <button onClick={fetchData}>검색하기</button> 
            </form>

            {searchInput && 
                searchInput.map(item=>
                <ul key={item.pid}>
                    <li>{item.pname}</li>
                    <li>{item.pprice}</li>
                </ul>
            )}
            
            {/* {searchInput.length>1 ? 
                (filteredResults.map(item=>
                <ul key={item.pid}>
                        <li>{item.pname}</li>
                        <li>{item.pprice}</li>
                    </ul>
                ))
            :
                (searchData.map((item) => 
                    <ul key={item.pid}>
                        <li>{item.pname}</li>
                        <li>{item.pprice}</li>
                    </ul>
                ))
            } */}
        </div>
    );
};

export default Search;