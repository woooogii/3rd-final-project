import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PayCredit = ({ setPaymentSuccess, tPrice, tName}) => {

    const navigate = useNavigate();
    
    const payTime = new Date();

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
        payTime : payTime.toISOString()
        //buyer_email : uEmail,
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
                    merchant_uid: makeMerchantUid(), 
                    name : tName,
                    amount : tPrice,
                    //buyer_email: buyerInfo.email,
                    // buyer_name: buyerInfo.name,
                    // buyer_tel: buyerInfo.tel,
                    // buyer_addr: buyerInfo.address,
                },
                function callback(response) {
                    const { success, error_msg } = response;
                    if (success) {
                        // 결제 성공 시
                        alert('결제 성공!');
                        // 결제 정보를 서버에 전송
                        fetch('http://localhost:4000/api/savePaymentInfo', {
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
                                console.log('결제 정보 저장됨:', data); // 실제 데이터 출력
                                // 서버에서 받은 데이터로 상태 업데이트
                                setBuyerInfo((prevState) => ({
                                    ...prevState,
                                    p_pg: data.p_pg,
                                    p_pay_method: data.p_pay_method,
                                    p_merchant_uid: data.p_merchant_uid,
                                    p_name: data.p_name,
                                    p_amount: data.p_amount,
                                    p_payTime: data.p_payTime,
                                }));
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
