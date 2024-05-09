import React from 'react';
import { HiOutlineTicket, HiTicket } from "react-icons/hi2";
import styled from 'styled-components';
import { Button } from "antd";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const StyledTickets = styled.div`

    margin-top: 180px;
    margin-bottom: 200px;

    .card-text-ticket{
        padding-left: 30px;
    }

  .redirectLogin {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 45vh; 
        color: #585858;
    }

    .redirectLogin hr {
        width: 60vw;
        border: 1px solid #A4A4A4;
    }


`;

const Ticket = () => {


    const loginUser = useSelector((state) => state.loginUser);
    console.log(loginUser);
    
    const navigate = useNavigate();

    const redirectLogin = () => {
        navigate('/pedal/login');
    };


    return (
        
        <StyledTickets>

        {loginUser.uid ? 

                (
                    <>
                        <div className="card text-end">
                            <div className="card-body" >
                                <h5 className="card-title">
                                    <HiOutlineTicket style={{ width: '100', height: '100' }} />
                                </h5>
                                <p className="card-text-ticket">
                                    <b>1시간권 / 2시간권</b>
                                </p>
                                <Button type="primary" style={{ width: '100px', height: '40px', marginRight: '8px', borderRadius: '12px' }}>
                                    <a href="/pedal/dailyTicket" style={{ textDecoration: 'none' }}>
                                        <span style={{ fontSize: '16px' }}>일일권</span>
                                    </a>
                                </Button>
                            </div>
                        </div>

                        <br />

                        <div className="card text-end">
                            <div className="card-body" style={{ backgroundColor: '#f8f9fa' }}>
                                <h5 className="card-title">
                                    <HiTicket style={{ width: '100', height: '100' }} />
                                </h5>
                                <p className="card-text-ticket">
                                    <b>7일권 / 30일권 / 180일권 / 365일권</b>
                                </p>
                                <Button type="primary" style={{ width: '100px', height: '40px', marginRight: '8px', borderRadius: '12px' }}>
                                    <a href="/pedal/seasonTicket" style={{ textDecoration: 'none' }}>
                                        <span style={{ fontSize: '16px' }}>정기권</span>
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='redirectLogin'>
                        <p style={{fontSize:'19px'}}>로그인이 필요합니다.</p>
                        <hr style={{width:'20vw'}}/><br/>
                        <Button type="primary" onClick={redirectLogin} style={{ width: '110px', height: '40px', fontSize: '18px', paddingBottom:'25px' }}>Login</Button>
                    </div>

                )}
        </StyledTickets>
    );
};

export default Ticket;