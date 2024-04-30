import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import MainButton from '../myPage/MainButton';
import { InfoBox, Container } from './styles';
import { FaLocationDot } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import {  RiSingleQuotesL, RiSingleQuotesR } from 'react-icons/ri';
import { BsDashLg } from 'react-icons/bs';

const Home = () => {
    const navigate = useNavigate();
    const [currentSection, setCurrentSection] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;

            const newSection = Math.floor(scrollPosition / windowHeight);
            setCurrentSection(newSection);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <Container>
            <main className="scroll-container">
                <section className={currentSection === 0 ? 'is-visible' : ''}>
                    {/* <Modal show={modalIsOpen} onHide={closeModal}  style={{ width: '100%', height:'100%', maxWidth: '1000px' }} >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                <img src='/image/popup.png' alt='' style={{ maxWidth: '100%', height: 'auto' }}/>
                </Modal.Body>
            </Modal> */}
                    <hr className="line1"/>
                    <br />
                    <br />
                    <div className="main1">
                        <img src="/image/main022.png" alt="" style={{ width: '100vw' }} />
                        <div className='mainButton'>
                            이용권
                            <MainButton/>
                        </div>
                    </div>

                    <InfoBox>
                        <div>
                            <ul>
                                <li>
                                    <a href="http://localhost:3000/pedal/station">
                                        <FaLocationDot style={{ fontSize: '23px', marginBottom: '5px' }} />
                                        &nbsp; 대 여 방 법
                                      </a>
                                </li>
                                <span style={{ color: '#fff' }}>ㅣ</span>
                                <li>
                                    <a href="http://localhost:3000/pedal/station">
                                        <FaLocationDot style={{ fontSize: '23px', marginBottom: '5px' }} />
                                        &nbsp; 대 여 소
                                    </a>
                                </li>
                                <span style={{ color: '#fff' }}>ㅣ</span>
                                <li>
                                    <a href="http://localhost:3000/pedal/ticket">
                                        <FaLocationDot style={{ fontSize: '23px', marginBottom: '5px' }} />
                                        &nbsp; 이 용 권 안 내
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </InfoBox>
                </section>
                <section className={currentSection === 1 ? 'is-visible' : ''}>
                    <div id="pedal">
                        <div>
                            <BsDashLg />
                        </div>
                        <span>PEDAL</span>
                    </div>
                    <div class="row row-cols-1 row-cols-md-3 g-4">
                        <div class="col">
                            <div class="card">
                                <img src="/image/bicycle01.png" class="card-img-top" alt="..." style={{ width: '230px', paddingBottom: '30px' }} />
                                <div class="card-body">
                                    <h5 class="card-title">공영자전거</h5>
                                    <hr />
                                    <p class="card-text">
                                        공영자전거는 누구나 편리하게
                                        <br /> 이용할 수 있습니다.
                                        <br />
                                        홈페이지나 앱을 통해 이용가능하도록
                                        <br /> 설계되었으며, 내구성이 강한 소재를
                                        <br /> 적용하여 안전과 편의성을
                                        <br /> 최대한 반영하였습니다.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="col">
                            <div class="card">
                                <img src="/image/bicycle02.png" class="card-img-top" alt="..." style={{ width: '105px', paddingBottom: '30px' }} />
                                <div class="card-body">
                                    <h5 class="card-title">위치기반 서비스</h5>
                                    <hr />
                                    <p class="card-text">
                                        서비스 구역 내에서만 사용자가
                                        <br /> 자전거를 빌리고 반납할 수 있습니다. <br />
                                        서비스 이용 중에 서비스 구역을
                                        <br />
                                        벗어나면 위치기반 시스템에서 <br />
                                        위치를 찾을 수 없으므로 자전거를
                                        <br /> 반납할 수 없습니다.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="col">
                            <div class="card">
                                <img src="/image/bicycle03.png" class="card-img-top" alt="..." style={{ width: '145px', paddingBottom: '30px' }} />
                                <div class="card-body">
                                    <h5 class="card-title">스마트락</h5>
                                    <hr />
                                    <p class="card-text">
                                        스마트락은 자전거의 뒷바퀴에
                                        <br /> 부착하는 잠금장치이며 스마트폰 및<br /> 서비스 서버와의 통신을 통하여
                                        <br /> 승인된 사용자인 경우 위 부분에 있는
                                        <br /> QR코드로 스마트폰을 이용한 <br />
                                        대여기능을 지원합니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={currentSection === 2 ? 'is-visible' : ''}>
                    <div className="two">
                        <div className="two_class">
                            <img src="/image/scenery06.png" alt="" />
                            <div className="two_text1">
                                <hr />
                                <h2>자전거와 함께 하는 즐거운 일상,</h2>
                                <h5>건강한 도시의 삶을 경험할 수 있습니다.</h5>
                            </div>
                            <div className="two_btn1">
                                <button
                                    type="button"
                                    class="btn btn-primary"
                                    onClick={() => navigate('/pedal/ticket')}
                                    style={{ borderRadius: '15px', fontSize: '18px', paddingLeft: '20px', paddingRight: '20px' }}
                                >
                                    이용권 안내
                                </button>
                            </div>
                            <div className="two_btn2">
                                <button type="button" class="btn btn-primary" onClick={() => navigate('/pedal/shop')} style={{ borderRadius: '15px', fontSize: '18px' }}>
                                    쇼핑몰 구경
                                </button>
                            </div>
                            <div className="two_text2">
                                <hr />
                                <h2>
                                    <span style={{ paddingLeft: '210px' }}>또 하나의 기쁨을</span>
                                    <br />
                                    페달의민족과 함께 즐겨보세요!
                                </h2>
                                <h5 style={{ paddingLeft: '350px' }}>구경하고가세요</h5>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={currentSection === 3 ? 'is-visible' : ''}>
                    <div className="three">
                        <div className="three_class">
                            <img src="/image2/main7.jpg" alt="" />
                            <div className="three_text">
                                <h1>
                                    <RiSingleQuotesL style={{ marginBottom: '40px' }} />
                                    &nbsp;세상과 소통하는 우리&nbsp;
                                    <RiSingleQuotesR style={{ marginBottom: '40px' }} />
                                </h1>
                                {/* <h1>
                            <RiDoubleQuotesL style={{ marginBottom: '40px' }} />
                            &nbsp;&nbsp;세상과 소통하는 우리&nbsp;&nbsp;
                            <RiDoubleQuotesR style={{ marginBottom: '40px' }} />
                        </h1> */}
                                <hr />
                                <h5>지금, 서울시에서 만나보세요</h5>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={currentSection === 4 ? 'is-visible' : ''}>
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
                                    style={{ borderRadius: '15px', fontSize: '18px', paddingLeft: '20px', paddingRight: '20px' }}
                                >
                                    구경하기
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={currentSection === 5 ? 'is-visible' : ''}>
                    <div className="four">
                        <div className="four_class">
                            <div className="four_btn2">
                                <button
                                    type="button"
                                    class="btn btn-primary"
                                    onClick={() => navigate('/pedal/shop')}
                                    style={{ borderRadius: '15px', fontSize: '18px', backgroundColor: '#facc2e', border: 'none', paddingLeft: '15px', paddingRight: '15px' }}
                                >
                                    쇼핑몰 구경
                                </button>
                            </div>
                            <img src="/image/bicycle03.jpeg" alt="" />
                            <div className="four_text2">
                                <hr />
                                <h2>
                                    <span style={{ paddingLeft: '210px' }}>또 하나의 기쁨을</span>
                                    <br />
                                    페달의민족과 함께 즐겨보세요!
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </Container>
    );
};

export default Home;
