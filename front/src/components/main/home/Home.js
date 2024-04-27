import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import MainButton from '../myPage/MainButton'
import { InfoBox, Container,} from './styles';
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { RiSingleQuotesL,RiSingleQuotesR } from "react-icons/ri";


const Home = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [showSlideEffect, setShowSlideEffect] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 400) {
                setShowSlideEffect(true); // 스크롤 위치가 400보다 크면 슬라이드 효과 활성화
            } else {
                setShowSlideEffect(false); // 아니면 비활성화
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            setShowSlideEffect(false); // 페이지를 벗어날 때 슬라이드 상태 초기화
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <Container>
            {/* <Modal show={modalIsOpen} onHide={closeModal}  style={{ width: '100%', height:'100%', maxWidth: '1000px' }} >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                <img src='/image/popup.png' alt='' style={{ maxWidth: '100%', height: 'auto' }}/>
                </Modal.Body>
            </Modal> */}
            <hr className="line" style={{ width: '80vw', marginLeft: '220px' }} />
            <br />
            <br />
            <div className="main1">
                <img src="/image/main022.png" alt="" style={{ width: '100vw' }} />
            </div>

            <InfoBox>
                <div>
                    <ul>
                        <li>
                            <a href="http://localhost:3000/pedal/station">
                                <FaLocationDot style={{ fontSize: '25px', marginBottom: '5px' }} />
                                &nbsp; 대 여 방 법
                            </a>
                        </li>
                        <span style={{ color: '#fff' }}>ㅣ</span>
                        <li>
                            <a href="http://localhost:3000/pedal/station">
                                <FaLocationDot style={{ fontSize: '25px', marginBottom: '5px' }} />
                                &nbsp; 대 여 소
                            </a>
                        </li>
                        <span style={{ color: '#fff' }}>ㅣ</span>
                        <li>
                            <a href="http://localhost:3000/pedal/ticket">
                                <FaLocationDot style={{ fontSize: '25px', marginBottom: '5px' }} />
                                &nbsp; 이 용 권 안 내
                            </a>
                        </li>
                    </ul>
                </div>
            </InfoBox>

<div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col">
    <div class="card">
      <img src="/image/kakaopay.png" class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="..." class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="..." class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
      </div>
    </div>
  </div>
</div>

            <div className="one">
                <div className="one_class">
                    <img src="/image/main08.png" alt="" />
                    <div className="one_text">
                        <hr />
                        <h2>언제, 어디서나, 자유롭고 편리하게</h2>
                        <h5>
                            <b>자전거를 이용해</b> 목적지로 이동할 수 있는
                            <br />
                            <br />
                            녹색대중교통수단 <b>자전거 무인 대여제</b>입니다.
                        </h5>
                    </div>
                    <div className="one_btn">
                        <button
                            type="button"
                            class="btn btn-primary"
                            onClick={() => navigate('/pedal/station')}
                            style={{ borderRadius: '15px', fontSize: '20px', paddingLeft: '20px', paddingRight: '20px' }}
                        >
                            구경하기
                        </button>
                    </div>
                </div>
            </div>

            <div className="three">
                <div className="three_class">
                    <img src="/image2/main7.jpg" alt="" />
                    <div className="three_text">
                        <h1>
                            <RiSingleQuotesL />
                            <span>세상과 소통하는 우리</span>
                            <RiSingleQuotesR />
                            <hr />
                            {/* <div className={`slider-container ${showSlideEffect ? 'show-slide' : ''}`}>
                                <img
                                    src="/image/bicycle.jpg"
                                    alt=""
                                    className="sliding-image"
                                    style={{ left: showSlideEffect ? '50%' : '100%', width:'300px' }} // 슬라이드 효과 발동 시 중앙으로 이동
                                />
                            </div> */}
                        </h1>
                        <h5>지금, 서울시에서 만나보세요</h5>
                    </div>
                </div>
            </div>

            <div className="two">
                <div class="mix_photo1">
                    <img src="/image2/main3.jpg" alt="" />
                    <img src="/image2/main6.jpg" alt="" />
                </div>
                <div class="mix_photo2">
                    <img src="/image2/main5.jpeg" alt="" />
                    <img src="/image2/main4.jpg" alt="" />
                </div>
            </div>

            {/* <div class="grid">
                <div class="three-one">
                    <img src="/image2/main3.jpg" alt="" />
                </div>
                <div class="three-four">
                    <img src="/image2/main6.jpg" alt="" />
                </div>
                <div class="three-two">
                    <img src="/image2/main5.jpeg" alt="" />
                </div>
                <div class="three-three">
                    <img src="/image2/main4.jpg" alt="" />
                </div>
            </div> */}

            <div class="grid">
                <div className="five-one">
                    <img src="/image2/main8.jpg" alt="" />
                </div>
                <div className="five-two">
                    <img src="/image2/main9.jpg" alt="" />
                </div>
                <div className="five-three">
                    <img src="/image2/main10.jpg" alt="" />
                </div>
                <div className="five-four">
                    <img src="/image2/main11.jpg" alt="" />
                </div>
            </div>
            <div className="six">
                <img src="/image2/main12.jpg" alt="" />
            </div>

            <MainButton />
        </Container>
    );
};

export default Home;
