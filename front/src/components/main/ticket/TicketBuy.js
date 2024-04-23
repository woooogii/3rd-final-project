import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PayCredit from './PayCredit';
import PayKakao from './PayKakao';
import { useParams } from 'react-router-dom';
import { HiOutlineTicket, HiTicket } from 'react-icons/hi2';
import { Button } from 'antd';
import styled from 'styled-components';

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
        setTCategory(category);
        setTprice('');
        setTname('');
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

    const StyledTickets = styled.div`
        margin-top: 100px;
        margin-left: 320px;

        .card-container {
            display: flex;
            width: 400px;
            gap: 15px;
        }

        .card-body {
            flex: 1 1 auto;
            padding: initial;
            padding: 10px;
            color: var(--bs-card-color);
        }
        .card.text-end {
            width: 200px;
            border-radius: 10px;
            display: flex;
            margin: 0 auto;
        }

        .card-title {
            text-align: left;
            padding-left: 20px;
        }

        b {
            display: flex;
            justify-content: left;
            font-size: 30px;
        }

        .btn {
            margin-bottom: 10px;
            margin-right: 10px;
            border: none;
            border-radius: 10px;
            width: 100px;
            height: 40px;
            background-color: #eee;
            outline: none;
            box-shadow: 1px 8px 0 #fff;
            transition: box-shadow 0.3s;
            color: #eee;
        }

        .btn:hover,
        .btn:focus {
            box-shadow: 1px 1px 0 #65a675;
            position: relative;
            top: 2px;
        }

        .redirectLogin {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 50vh; /* 화면 전체를 차지하도록 설정 */
        }

        .redirectLogin hr {
            width: 60vw;
            border: 1px solid #a4a4a4;
        }
    `;





    return (
        <StyledTickets>
            
            <h3>- 이용권 구매</h3>
            <br/>
            <div className="card-container">
                <div className="card text-end">
                    <div className="card-body">
                        <h5 className="card-title"></h5>
                        <p className="card-text">
                            <b>01</b>
                        </p>
                        <Button onClick={() => onChange('일일권')} type="primary" style={{ width: '80px', height: '35px', borderRadius: '10px' }}>
                            <a href="/pedal/dailyTicket" style={{ textDecoration: 'none' }}>
                                <span style={{ fontSize: '16px' }}>일일권</span>
                            </a>
                        </Button>
                    </div>
                </div>
            
                <div className="card text-end">
                    <div className="card-body">
                        <h5 className="card-title"></h5>
                        <p className="card-text">
                            <b>02</b>
                        </p>
                        <Button onClick={() => onChange('정기권')} type="primary" style={{ width: '90px', height: '40px', borderRadius: '12px' }}>
                            <a href="/pedal/dailyTicket" style={{ textDecoration: 'none' }}>
                                <span style={{ fontSize: '16px' }}>정기권</span>
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
            <br/> <br/>
            
            {/* <div>
                <button onClick={() => onChange('일일권')}>일일권</button>
                <button onClick={() => onChange('정기권')}>정기권</button>
            </div> */}
            <div>
                {tCategory === '일일권' ? (
                    <div>
                        <select value={tName} onChange={handleOptionChange}>
                            <option value="">=== 일일권 선택 ===</option>
                            <option value="1시간(일일권)">1시간(일일권)</option>
                            <option value="2시간(일일권)">2시간(일일권)</option>
                        </select>
                        {tPrice && <p>가격: {tPrice}</p>}
                    </div>
                ) : (
                    <div>
                        <select value={tName} onChange={handleOptionChange}>
                            <option value="">=== 정기권 선택 ===</option>
                            <option value="7일권(정기권)">7일권(정기권)</option>
                            <option value="30일권(정기권)">30일권(정기권)</option>
                            <option value="180일권(정기권)">180일권(정기권)</option>
                            <option value="365일권(정기권)">365일권(정기권)</option>
                        </select>
                        {tPrice && <p>가격: {tPrice}</p>}
                    </div>
                )}
            <br/>
            </div>
            <h4>결제</h4>
            {tCategory && (
                <>
                    <input type="radio" name="payment" value="신용/체크카드" onChange={handleModule} />
                    신용/체크카드
                    <input type="radio" name="payment" value="kakaopay" onChange={handleModule} />
                    <img src="/image/kakaopay.png" alt="kakaopay" style={{ width: '50px', height: 'auto', position: 'relative', top: '2px' }} />
                    <br />
                    <br />
                    {payment === '신용/체크카드' && <PayCredit setPaymentSuccess={setPaymentSuccess} tPrice={tPrice} tName={tName} />}
                    {payment === 'kakaopay' && <PayKakao setPaymentSuccess={setPaymentSuccess} tPrice={tPrice} tName={tName} />}
                </>
            )}
        </StyledTickets>
    );
};

export default TicketBuy;
