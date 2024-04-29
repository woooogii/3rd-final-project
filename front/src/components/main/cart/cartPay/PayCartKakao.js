import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';

import '../cart.css'


const PayCartKakao = ({setPaymentSuccess, totalPrice, productName, cartItems, itemQuantities}) => {

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
        pg: 'kakaopay.TC0ONETIME',
        pay_method: 'card',
        merchant_uid: makeMerchantUid(), 
        name: '',
        amount: '',
        uid: '',
        uname: '',
        pay_time: ''
    });

    useEffect(() => {
        if (productName && totalPrice && loginUser) {
            setBuyerInfo({
                ...buyerInfo,
                name: productName,
                amount: String(totalPrice),
                uid: loginUser.uid,
                uname: loginUser.uname,
                pay_time: moment().format('YYYY-MM-DD HH:mm:ss')
            });
        }
    }, [productName, totalPrice, loginUser]);


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
                    name: productName,
                    amount: totalPrice,
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
                              
                                //order리스트에 추가해서 내가 구매한 물품내역 볼 수 있게 함
                                    fetch('http://localhost:4000/pedal/saveMyOrder',{
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            oId:buyerInfo.merchant_uid,
                                            user:buyerInfo.uid,
                                            oBuyDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                                            products: cartItems.map(item => item.pid),
                                            amounts: itemQuantities
                                            
                                        }),
                                    })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        console.log('결제 정보 저장됨:', data);

                                        
                                        
                                    })
                              
                           
                                //         setBuyerInfo((prevState) => ({
                                //             ...prevState,
                                //             mt_merchant_uid: data.mt_merchant_uid,
                                //             mt_name: data.mt_name,
                                //             mt_amount: data.mt_amount,
                                //             mtPayTime: moment().format('YYYY-MM-DD HH:mm:ss'), 
                                //             uid: loginUser.uid,
                                //             uname: loginUser.uname,
                                //         }));
                                //     })
                                    // .catch((error) => {
                                    //     console.error('결제 정보 저장 중 오류 발생:', error);
                                    // });
                            })
                            .catch((error) => {
                                console.error('결제 정보 저장 중 오류 발생:', error);
                            });
                            
                            setPaymentSuccess(true);
                            navigate('/pedal/cartPayment', { state: { buyerInfo: buyerInfo } });
                            
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
        <div className="pay-buy-button">
        <button onClick={requestPay}>구매하기</button>
        </div>
    );
};

export default PayCartKakao;