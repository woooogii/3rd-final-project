import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';


const Kakao = styled.div`

    position: absolute;
    margin-top: -490px;
    margin-left: 240px;

    .box_kakao {
        width: 250px;
        height: 600px;
        border-radius: 20px;
        border: 1px solid #a4a4a4;
        padding: 10px;
    }

    .box_kakao b {
        align-self: flex-start;
        margin-left: 10px;
    }

    .price_kakao {
        margin-top: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30vh;
    }

    .price_amount_kakao {
        font-size: 35px;
        font-weight: bold;
        display: inline-block;
        vertical-align: top;
        margin-top: -25px;
        color: #1675f2;
    }
`;

const PayCredit = ({ setPaymentSuccess, tPrice, tName}) => {

    let loginUser = useSelector((state)=>{ return state.loginUser })

    const navigate = useNavigate();

    let lastTimestamp = 0;
    let orderNum = 0;
    
    function makeMerchantUid() {
        const currentTimestamp = new Date().getTime();
    
        // 현재 시간이 이전 시간과 동일한 경우 orderNum을 증가시키고, 아니면 orderNum을 초기화합니다.
        if (currentTimestamp === lastTimestamp) {
            orderNum++;
        } else {
            orderNum = 0;
            lastTimestamp = currentTimestamp;
        }
    
        const merchantUid = currentTimestamp + '_' + orderNum;
        return merchantUid;
    }
    
    const [buyerInfo, setBuyerInfo] = useState({
        pg : 'kakaopay.TC0ONETIME',
        pay_method : 'card',
        merchant_uid: makeMerchantUid(), 
        name : tName,
        amount : String(tPrice),
        uid : loginUser.uid,
        uname: loginUser.uname,
        pay_time: moment().format('YYYY-MM-DD HH:mm:ss')
    });

    useEffect(() => {
        // 외부 스크립트 로드를 위한 스크립트 태그 생성
        const script = document.createElement('script');
        script.src = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js';
        script.async = true;

        // 스크립트가 로드된 후 실행될 콜백 함수 등록
        script.onload = () => {
            // 외부 스크립트가 로드된 후에 실행할 코드 작성
            var IMP = window.IMP;
            if (IMP) {
                IMP.init('imp86461615');
            } else {
                console.error('IMP 객체를 찾을 수 없습니다.');
            }
        };

        // 스크립트 로드 시작
        document.body.appendChild(script);

        // 컴포넌트 언마운트 시 스크립트 제거
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    function requestPay() {
        setPaymentSuccess(false); // 결제 시도 전에 초기화

        var IMP = window.IMP;
        if (IMP) {

            IMP.request_pay(
                {
                    pg: 'kakaopay.TC0ONETIME',
                    pay_method: 'card',
                    merchant_uid: buyerInfo.merchant_uid,
                    name: tName,
                    amount: tPrice,
                    buyer_email: loginUser.uid,
                    buyer_name: loginUser.uname,
                    //m_redirect_url : 'http://localhost:3000/pedal/payment'
                },
             
             
                function callback(response) {
                    const { success, error_msg } = response;
                    
                    if (success) {
                        // 결제 성공 시
                        alert('결제 성공!');
                        // 결제 정보를 서버에 전송
                        fetch('http://localhost:4000/pedal/savePaymentInfo', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                ...buyerInfo,
                                pay_time: moment().format('YYYY-MM-DD HH:mm:ss') // 현재 시간으로 설정
                            }),
                        })
                    
                    
                            .then((response) => response.json()) // JSON 형식으로 파싱
                            .then((data) => {
                                console.log('결제 정보 저장됨:', data); // 실제 데이터 출력
                                // 서버에서 받은 데이터로 상태 업데이트
                                setBuyerInfo({
                                    ...data,
                                    pay_time: moment().format('YYYY-MM-DD HH:mm:ss')
                                });

                                //MyTicket(나의티켓구매내역)으로 보냄
                                fetch('http://localhost:4000/pedal/saveMyTicketList', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    //DB 필드명과 동일해야함
                                    body: JSON.stringify({
                                        mtMerchantUid:buyerInfo.merchant_uid,
                                        mtName: tName,
                                        mtAmount: tPrice,
                                        mtPayTime: moment().format('YYYY-MM-DD HH:mm:ss'), 
                                        uid: loginUser.uid,
                                        uname: loginUser.uname,
                                    }),
                                })
                                    .then((response) => response.json()) // JSON 형식으로 파싱
                                    .then((data) => {
                                        console.log('결제 정보 저장됨:', data);

                                        setBuyerInfo((prevState) => ({
                                            ...prevState,
                                            mt_merchant_uid: data.mt_merchant_uid,
                                            mt_name: data.mt_name,
                                            mt_amount: data.mt_amount,
                                            mtPayTime: moment().format('YYYY-MM-DD HH:mm:ss'), 
                                            uid: loginUser.uid,
                                            uname: loginUser.uname,
                                        }));
                                    })
                                    .catch((error) => {
                                        console.error('결제 정보 저장 중 오류 발생:', error);
                                    });
                            })
                            .catch((error) => {
                                console.error('결제 정보 저장 중 오류 발생:', error);
                            });
                            
                            setPaymentSuccess(true);
                            navigate('/pedal/payment', { state: { buyerInfo: buyerInfo } });
                    } else {
                        // 결제 실패 시
                        alert(`결제 실패: ${error_msg}`);
                    }
                }
            );
        } else {
            console.error('IMP 객체를 찾을 수 없습니다.');
        }
    }
    

    return (
        <Kakao>
            <div className="box_kakao">
                <div className="price_kakao">
                    총 금액 ㅣ &nbsp;&nbsp;
                    <span className="price_amount_kakao">{tPrice && <span>{tPrice}</span>}</span>
                    &nbsp;<span style={{ fontWeight: 'bold' }}>원</span>
                </div>
                <Button className='btn_kakao' type="primary" onClick={requestPay} style={{ backgroundColor: '#1675f2', marginTop:'-50px', marginRight:'15px' }}>결제하기</Button>
            </div>
        </Kakao>
    ); 
};

export default PayCredit;
