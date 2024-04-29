import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import './style/productList.css';

const Paging = ({page, count, setPage}) => {

    const handlePageChange = (page) => {
      setPage(page);
    };

    // const limit = 4; // posts가 보일 최대한의 갯수
    // const offset = (page-1)*limit; // 시작점과 끝점을 구하는 offset
    // let firstNum = currPage - (currPage % 5) + 1
    // let lastNum = currPage - (currPage % 5) + 5
    const [pageSize,setPageSize] = useState(4);//한 페이지에 몇개
    const [totalCount,setTotalCount] = useState(10);
    //const [currentPage, setCurrentPage] = useState(page);

    return (
        <>
            <Pagination
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={450}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={handlePageChange}
            />
        </>
    );
};

export default Paging;