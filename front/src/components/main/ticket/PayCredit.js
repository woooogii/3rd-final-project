import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';

const PayCredit = ({ setPaymentSuccess, tPrice, tName}) => {

    let loginUser = useSelector((state)=>{ return state.loginUser })

    const payTime = moment().format('YYYY-MM-DD HH:mm:ss');

    const navigate = useNavigate();
    
    //주문번호 증가
    let orderNum = 0;

    function makeMerchantUid() {

        orderNum++;
        const merchantUid = new Date().getTime() + '_' + orderNum;
        return merchantUid;
    }

    const [buyerInfo, setBuyerInfo] = useState({
        pg : 'html5_inicis',
        pay_method : 'card',
        merchant_uid: makeMerchantUid(), 
        name : tName,
        amount : tPrice,
        uid : loginUser.uid,
        uname: loginUser.uname,
        pay_time : payTime,
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
                    pg : 'html5_inicis',
                    pay_method : 'card',
                    merchant_uid: buyerInfo.merchant_uid, 
                    name : tName,
                    amount : tPrice,
                    buyer_email : loginUser.uid,
                    buyer_name: loginUser.uname,
                    //m_redirect_url : 'http://localhost:3000/pedal/payment'
                },
                function callback(response) {
                    
                    const { success, error_msg } = response;
                    

                    if (success) {
                        alert('결제 성공!');

                        // 결제 정보를 payment(결제내역)에 전송
                        fetch('http://localhost:4000/pedal/savePaymentInfo', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                ...buyerInfo,
                            }),
                        })
                            .then((response) => response.json()) // JSON 형식으로 파싱
                            .then((data) => {

                                console.log('결제 정보 저장됨:', data);   

                                // 실제 데이터로 업데이트해야지 클라이언트가 결제하고 난뒤에도 서버랑 일관성있게 데이터가 동일함 
                                setBuyerInfo((prevState) => ({
                                    ...prevState,
                                    p_pg: data.p_pg,
                                    p_pay_method: data.p_pay_method,
                                    p_merchant_uid: data.p_merchant_uid,
                                    p_name: data.p_name,
                                    p_amount: data.p_amount,
                                    p_payTime: data.p_payTime,
                                    uid : loginUser.uid,
                                    uname: loginUser.uname,
                                }));


                                //MyTicket(나의티켓구매내역)으로 보냄
                                fetch('http://localhost:4000/pedal/saveMyTicketList', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        mtMerchantUid: buyerInfo.merchant_uid,
                                        mtName: tName,
                                        mtAmount: tPrice,
                                        mtPayTime: payTime,
                                        uid: loginUser.uid,
                                        uname: loginUser.uname,
                                    }),
                                })
                                    .then((response) => response.json()) // JSON 형식으로 파싱
                                    .then((data) => {
                                        console.log('결제 정보 저장됨:', data);

                                        // 실제 데이터로 업데이트해야지 클라이언트가 결제하고 난뒤에도 서버랑 일관성있게 데이터가 동일함

                                        //DB 필드명과 동일해야함
                                        setBuyerInfo((prevState) => ({
                                            ...prevState,
                                            mt_merchant_uid: data.mt_merchant_uid,
                                            mt_name: data.mt_name,
                                            mt_amount: data.mt_amount,
                                            mt_pay_time: data.mt_pay_time,
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
        <div>
            <button onClick={requestPay}>신용카드 결제하기</button>
        </div>
    );
};

export default PayCredit;
