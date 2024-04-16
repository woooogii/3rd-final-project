import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PayCredit from './PayCredit';
import PayKakao from './PayKakao';

const TicketBuy = () => {
    const [tName, setTname] = useState('');
    const [tCategory, setTCategory] = useState('일일권');
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

    return (
        <div>
            <h2>이용권 구매</h2>
            <div>
                <button onClick={() => onChange('일일권')}>일일권</button>
                <button onClick={() => onChange('정기권')}>정기권</button>
            </div>
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
            </div>
            <h4>결제</h4>
            {tCategory && (
                <>
                    <input type="radio" name="payment" value="신용/체크카드" onChange={handleModule} />신용/체크카드
                    <input type="radio" name="payment" value="kakaopay" onChange={handleModule} />
                    <img src='/image/kakaopay.png' alt='kakaopay' style={{ width: '50px', height: 'auto', position: 'relative', top: '2px' }} />
                    <br /><br />
                    {payment === '신용/체크카드' && <PayCredit setPaymentSuccess={setPaymentSuccess} tPrice={tPrice} tName={tName}/>}
                    {payment === 'kakaopay' && <PayKakao setPaymentSuccess={setPaymentSuccess} tPrice={tPrice} tName={tName}/>}
                </>
            )}
        </div>
    );
};

export default TicketBuy;
