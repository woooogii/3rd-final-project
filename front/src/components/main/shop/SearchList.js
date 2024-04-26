import { useEffect, useRef, useState } from 'react';
import ProductItem from './ProductItem';
import './style/productList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ShopHead from './ShopHead';

const SearchList = () => {
    const [getData,setGetData]= useState([]);//db데이터
    const [filteredResults, setFilteredResults] = useState([]);//검색결과

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get('searchValue');//검색어

    const startHereRef = useRef(null);

    useEffect(() => {
        // 렌더링 후 startHere 요소로 스크롤 이동
        if (startHereRef.current) {
            startHereRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    },[]);

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

    useEffect(() => {
        if (searchValue) { // 검색어가 있는 경우에만 필터링 수행
            const filteredData = getData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase());
            });
            setFilteredResults(filteredData);
        } else {
            setFilteredResults([]); // 검색어가 없는 경우 필터링된 결과 초기화
        }
    }, [searchValue, getData]);

    //select 순서 정렬
    const [sortOrder, setSortOrder] = useState("noFilter");
    
    const sortData = (data, order) => {
        if (!data) return [];
        const selectData = [...data];
        if (order === "newProduct") {
            return selectData.sort((a, b) => new Date(b.pregdate) - new Date(a.pregdate));
        } else if (order === "highPrice") {
            return selectData.sort((a, b) => b.pprice - a.pprice);
        } else if (order === "lowPrice") {
            return selectData.sort((a, b) => a.pprice - b.pprice);
        } else {
            return selectData;
        }
    };
    const handleChangeSelect=(e)=>{
        const selectedValue = e.target.value;
        setSortOrder(selectedValue);
    }

    const sortedData = sortData(filteredResults, sortOrder);

    return (
        <>
        <div ref={startHereRef}>
            {/* <ShopHeader id="#custom-shopHead"/> */}
            <ShopHead id="head"/>
            </div>
        <div className='main'>
            <div className='product'>
                {filteredResults.length>0 && 
                <h2>'{searchValue}'에 대한 검색 결과</h2>}
                <select onChange={handleChangeSelect}>
                            <option value={'noFilter'}>정렬방법</option>
                            <option value={"newProduct"}>신상품순</option>
                            <option value={"highPrice"}>높은가격순</option>
                            <option value={"lowPrice"}>낮은가격순</option>
                    </select>
                    <ul>
                        {sortedData && sortedData.map(item =>
                            <ProductItem key={item.pid} item={item}/>
                        )}
                    </ul>
            </div>
        </div>
        </>
    );
};

export default SearchList;