import styled from 'styled-components';

export const Container = styled.div`

    .card {
        width: 100%;
        margin: 100px;
    }

    .card img {
        width: 100px;
        height: 50px;
    }

    .line {
        border: 1.5px solid #bdbdbd;
    }

    .one img {
        width: 100%;
    }

    .one_class {
        position: relative;

        h2 {
            color: #1675f2;
            font-size: 35px;
            font-weight: bold;
        }

        h5 {
            margin-top: 30px;
        }
    }

    .one_text {
        position: absolute;
        color: #bdbdbd;
        font-size: 18px;
        font-weight: bold;
        top: 300px;
        left: 150px;

        hr {
            position: absolute;
            border: 10px solid #1675f2;
            width: 570px;
            margin-left: -10px;
            top: 10px;
        }
    }

    .one_btn {
        position: absolute;
        top: 490px;
        left: 130px;
    }

    .three {
        margin-top: 200px;
        display: flex;
        justify-content: center;

        img {
            width: 53vw;
            margin-bottom: 150px;
        }
    }

    .three_class {
        position: relative;

        h1 {
            color: #333;
            font-size: 40px;
            margin-top: -90px;
            width: 55vw;
        }

        h5 {
            margin-top: 30px;
        }
    }

    .three_text {
        position: absolute;
        color: #bdbdbd;
        font-size: 18px;
        font-weight: bold;
        top: -55px;
        text-align: center; /* 세로 방향 가운데 정렬을 위한 text-align */

        span {
            color: #333;
            font-size: 35px;
            font-weight: bold;
        }

        hr {
            position: absolute;
            border: 10px solid #ffda5e;
            width: 350px;
            margin-left: 355px;
            top: -70px;
        }
    }

    .slider-container {
        position: relative;
        overflow: hidden;
        width: 100vw; /* 전체 화면 너비 */
        height: 100vh; /* 전체 화면 높이 */
    }

    .sliding-image {
        position: absolute;
        top: 50%;
        left: 100%; /* 초기 위치를 오른쪽 끝으로 설정 */
        transform: translate(-100%, -50%); /* 초기 위치 이동 */
        transition: transform 0.2s ease; /* 슬라이드 효과를 위한 트랜지션 속성 */
    }

    /* .grid > div {
        padding: 0;
    }

    .grid > div::before {
        content: "";
        display: block;
    }

    .grid {
        display: inline-grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
    }
     */

    /* 
    .two,
    .four,
    .six,
    .three {
        margin-top: 100px;
        height: 700px;
        width: 900px;
        display: grid;
        gap: 0;
        position: relative;
    } */

    /* .two > img,
    .three > img,
    .four > img,
    .five > img,
    .six > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
    }

    .one > img{
        width: 70%;
    }  */
`;

export const InfoBox = styled.div`
    height: 100px;
    background-color: #1675F2;
    display: flex;
    justify-content: center; 
    align-items: center; 

    ul {
        display: flex;
        justify-content: space-between;
        width: 1200px;
        font-size: 23px;
        margin-bottom: 5px;
    }

    li {
        flex: 1; //자식 요소 간의 공간을 동일하게 배분
        text-align: center;
        font-weight: bold;

        a{
            text-decoration: none;
            color: #fff;
        }
    }
`;
