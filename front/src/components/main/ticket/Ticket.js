import React from 'react';
import { HiOutlineTicket, HiTicket } from "react-icons/hi2";
import styled from 'styled-components';

const StyledTickets = styled.div`

    margin-top: 250px;

    .card.text-end {
        width: 500px;
        margin: 0 auto;
        border-radius: 10px;
        }

    .card-title {
        text-align: left;
        padding-left: 20px;
    }

    
    b {
        margin-right: 10px;
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

  .btn:hover, .btn:focus {
    box-shadow: 1px 1px 0 #65a675;
    position: relative;
    top: 2px;
  }


`;

const Ticket = () => {
    return (
        <StyledTickets>
            <div className="card text-end">
                <div className="card-body" >
                    <h5 className="card-title"><HiOutlineTicket style={{ width: '100', height: '100' }} /></h5>
                    <p className="card-text"><b>1시간권 / 2시간권</b></p>
                    <a href="/pedal/ticketBuy" className="btn" style={{backgroundColor:'green', fontSize:'17px'}}>일일권</a>
                </div>
            </div>

            <br/>

            <div className="card text-end">
                <div className="card-body" style={{backgroundColor:'#f8f9fa'}}>
                    <h5 className="card-title"><HiTicket style={{ width: '100', height: '100' }} /></h5>
                    <p className="card-text"><b>7일권 / 30일권 / 180일권 / 365일권</b></p>
                    <a href="/pedal/ticketBuy" className="btn" style={{backgroundColor:'green', fontSize:'17px'}}>정기권</a>
                </div>
            </div>
        </StyledTickets>
    );
};

export default Ticket;