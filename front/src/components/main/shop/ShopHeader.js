import React from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../../styles/nav/nav.css'


const ShopHeader = () => {

    const navigate = useNavigate();


    return (
        <div style={{
            background: 'blue'
        }}>
            <Navbar expand="lg" className="bg-body-tertiary" id="custom-shopHead">
            <Container>
                <Navbar.Brand href="/pedal/home">SHOP</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link onClick={()=>{navigate('/pedal/shop/bicycle')}} id="custom-menu">자전거🚴</Nav.Link>
                    <Nav.Link onClick={()=>{navigate('/pedal/shop/equipments')}} id="custom-menu">안전용품🎫</Nav.Link>
                    <Nav.Link onClick={()=>{navigate('/pedal/shop/aaa')}} id="custom-menu">기타등등🛍️</Nav.Link>
                    <Nav.Link>지금 Link로 다른 경로 보내기 말고, 버튼에 따라 디비 불러오는거만 다르게</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
    );
};

export default ShopHeader;