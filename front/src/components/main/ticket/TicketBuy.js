import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PayCredit from './PayCredit';
import PayKakao from './PayKakao';
import { useParams } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components';
import { GrMapLocation } from "react-icons/gr";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";

    const StyledTickets = styled.div`
        margin-top: 140px;
        display: flex;
        justify-content: center;
        margin-right: 300px;
        caret-color: transparent;

        .card-container-ticket {
            width: 400px;
        }

        .card {
            --bs-card-border-width: none;
        }

        b {
            display: flex;
            justify-content: left;
            font-size: 30px;
        }

        .tot_box {
            display: flex;
        }

        .box1 {
            width: 250px;
            height: 600px;
            background-color: #1675f2;
            border-radius: 20px;
            color: #fff;
            display: flex;
            flex-direction: column; /* 내부 요소 세로 배치 */
            align-items: flex-end; /* 내부 요소 오른쪽 정렬 */
            padding: 20px;
            margin-right: 20px;
        }

        .box2 {
            width: 250px;
            height: 290px;
            border-radius: 20px;
            border: 1px solid #a4a4a4;
            margin-right: 20px;
            margin-bottom: 20px;
            padding: 10px;
        }

        .box2 b {
            align-self: flex-start;
            margin-left: 10px;
        }

        h3 {
            padding-top: 30px;
            font-weight: bold;
        }

        .box3 {
            width: 250px;
            height: 600px;
            border-radius: 20px;
            border: 1px solid #a4a4a4;
            padding: 10px;
        }

        .box3 b {
            align-self: flex-start;
            margin-left: 10px;
        }

        .price {
            display: flex;
            font-size: 14px;
            font-weight: bold;
            margin-top: 110px;
            margin-left: 10px;
            outline: none;
        }

        .box3 h4 {
            font-weight: bold;
            margin-left: 10px;
        }

        .pay {
            position: absolute;
            margin-top: 30px;
        }

        .cards-ticket-credit,
        .cards-ticket-kakao {
            cursor: pointer;
            transition: transform 0.5s ease, box-shadow 0.5s ease;
        }

        .cards-ticket-credit:hover,
        .cards-ticket-kakao:hover {
            transform: translateY(-20px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
            background-color: #1675f2;
            color: #fff;
            border: none;
        }

        .cards-ticket-credit {
            display: flex;
            justify-content: center;
            border: 1px solid #eee;
            border-radius: 10px;
            padding: 8px;
        }

        .cards-ticket-kakao {
            display: flex;
            justify-content: center;
            border: 1px solid #eee;
            border-radius: 10px;
            height: 85px;
        }
    `;



const TicketBuy = () => {
    const { ticketType } = useParams();
    const [tName, setTname] = useState('');
    const [tCategory, setTCategory] = useState(ticketType === 'dailyTicket' ? '일일권' : '정기권');
    const [tPrice, setTprice] = useState('');
    const [ticketData, setTicketData] = useState([]);
    const [payment, setPayment] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState('');

    useEffect(() => {
        const fetchTicketData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pedal/purchase');
                setTicketData(response.data);
            } catch (error) {
                console.error('데이터를 가져오지 못했습니다:', error);
            }
        };
        fetchTicketData();
    }, []);

    const onChange = (category) => {
        if(category === '일일권' || category === '정기권') {
            setTCategory(category);
            setTprice('');
            setTname('');
        }
    };

    const handleOptionChange = (e) => {
        const selectedOption = e.target.value;
        const selectedTicket = ticketData.find(ticket => ticket.tname === selectedOption);
        if (selectedTicket) {
            setTname(selectedOption);
            setTprice(selectedTicket.tprice);
        } else {
            setTname('');
            setTprice('');
        }
    };

    const handleModule = (e) => {
        const selectedPayment = e.target.value;
        setPayment(selectedPayment);
        setPaymentSuccess(false); // 새로운 결제 시도 시 결제 성공 상태 초기화
    };


    return (
        <StyledTickets>
            <br />
            <div className="tot_box">
                <div>
                    <div className="box1">
                        <GrMapLocation style={{ width: '40px', height: '40px' }} />
                        <h3>자전거 대여</h3>
                        <p style={{ paddingRight: '5px' }}>이용권 구매</p>
                    </div>
                </div>
                <div>
                    <div className="box2">
                        <b>01</b>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                onChange('일일권');
                            }}
                            type="primary"
                            style={{ width: '90px', height: '40px', borderRadius: '10px', marginLeft: '130px', marginTop: '170px' }}
                        >
                            <a href="/pedal/dailyTicket" style={{ textDecoration: 'none' }}>
                                <span style={{ fontSize: '17px' }}>일일권</span>
                            </a>
                        </Button>
                    </div>
                    <div className="box2">
                        <b>02</b>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                onChange('정기권');
                            }}
                            type="primary"
                            style={{ width: '90px', height: '40px', borderRadius: '10px', marginLeft: '130px', marginTop: '170px' }}
                        >
                            <a href="/pedal/dailyTicket" style={{ textDecoration: 'none' }}>
                                <span style={{ fontSize: '16px' }}>정기권</span>
                            </a>
                        </Button>
                    </div>
                </div>
                <div>
                    <div className="box3">
                        <MdOutlinePlaylistAddCheck style={{ width: '50px', height: '50px', marginLeft: '10px', marginTop: '5px' }} />
                        <div style={{ marginLeft: '20px', marginTop: '30px' }}>
                            {tCategory === '일일권' ? (
                                <div>
                                    <select
                                        value={tName}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            handleOptionChange(e);
                                        }}
                                    >
                                        <option value="">=== 일일권 선택 ===</option>
                                        <option value="1시간(일일권)">1시간(일일권)</option>
                                        <option value="2시간(일일권)">2시간(일일권)</option>
                                    </select>

                                    <div className="price">
                                        <span style={{ marginLeft: '10px' }}>
                                            총 금액 ㅣ &nbsp;&nbsp;&nbsp;
                                            <span className="price_amount">{tPrice && <span>{tPrice}</span>}</span>
                                            &nbsp;<span style={{ fontWeight: 'bold' }}>원</span>
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <select
                                        value={tName}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            handleOptionChange(e);
                                        }}
                                    >
                                        <option value="">=== 정기권 선택 ===</option>
                                        <option value="7일권(정기권)">7일권(정기권)</option>
                                        <option value="30일권(정기권)">30일권(정기권)</option>
                                        <option value="180일권(정기권)">180일권(정기권)</option>
                                        <option value="365일권(정기권)">365일권(정기권)</option>
                                    </select>

                                    <div className="price">
                                        <span style={{ marginLeft: '30px' }}>
                                            총 금액 ㅣ &nbsp;&nbsp;&nbsp;
                                            <span className="price_amount" >{tPrice && <span>{tPrice}</span>}</span>
                                            &nbsp;<span style={{ fontWeight: 'bold' }}>원</span>
                                        </span>
                                    </div>
                                </div>
                            )}
                            <br />
                        </div>
                        <div className="pay">
                            <h4>결제</h4>
                            <br />
                            {tCategory && (
                                <div>
                                      <div className="card-container-ticket">
                                      <div className="card text-end" id="credit" style={{ width: '200px', height: '100px', right: '85px', marginTop:'5px'}}>
                                            {payment === '신용/체크카드' && <PayCredit setPaymentSuccess={setPaymentSuccess} tPrice={tPrice} tName={tName} />}
                                                {/* label을 쓰면 이미지 클릭해도 함수를 실행시켜줌 (radio버튼 대신 사용) */}
                                                {/* htmlFor는 id값을 찾아감, input-id가 없으니까 위에 있는 div의 id를 찾아가서 연결되는 원리 */}        
                                                <label htmlFor="credit" onClick={() => handleModule({ target: { value: '신용/체크카드' } })}>
                                                <div className="cards-ticket-credit">
                                                    <img src="/image/visa.png" style={{ width: '70px' }} alt="" />
                                                    <img src="/image/mastercard.png" style={{ width: '70px' }} alt="" />
                                                </div>
                                            </label>
                                            </div>
                                        </div>
                                    <div className="box4">
                                        <div className="card-container-ticket">
                                            <div className="card text-end" id="kakao" style={{ width: '200px', right: '85px', marginTop:'-10px', top: '15px' }}>
                                                {payment === 'kakaopay' && <PayKakao setPaymentSuccess={setPaymentSuccess} tPrice={tPrice} tName={tName} />}
                                                {/* label을 쓰면 이미지 클릭해도 함수를 실행시켜줌 (radio버튼 대신 사용) */}
                                                {/* htmlFor는 id값을 찾아감, input-id가 없으니까 위에 있는 div의 id를 찾아가서 연결되는 원리 */}        
                                                <label htmlFor="kakao" onClick={() => handleModule({ target: { value: 'kakaopay' } })}>
                                                    <div className="cards-ticket-kakao">
                                                        <img src="/image/kakaopay.png" alt="kakaopay" style={{ width: '65px', height: '25px', marginTop:'30px'}} />
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <br />
            <br />
        </StyledTickets>
    );
};

export default TicketBuy;
