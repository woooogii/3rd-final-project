import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Cart from './cart/Cart';
import ProductTest from './cart/ProductTest';
import Home from './home/Home';
import Join from './user/Join';
import Login from './user/Login';
import Navibar from '../nav/Navibar';
import Shop from './shop/Shop';
import MyPageMain from './myPage/MyPageMain';
import Ticket from './ticket/Ticket';
import TicketBuy from './ticket/TicketBuy';
import PayResult from './ticket/PayResult';
import ProductDetail from './shop/ProductDetail';
import Map from './map/Map';
import { Provider } from 'react-redux';
import store from '../nav/store.js';
import MyPageTicketList from './myPage/MyPageTicketList.js';
// import InsertData from './InsertComponent/InsertData.js';



const Main = () => {
    return (
        <div>
        <Provider store={ store }>
            <Router>
                    <Navibar/>
                    <Routes>
                       <Route path="/" Component={Home}/>
                        <Route path="/pedal/home" Component={Home}/>
                        <Route path="/pedal/login" Component={Login}/>
                        <Route path="/pedal/join" Component={Join}/>
                        <Route path="/pedal/cart" Component={Cart}/>
                        <Route path="/pedal/oneitem" Component={ProductTest}/>
                        <Route path="/pedal/shop" Component={Shop}/>
                        <Route path="/pedal/myPage" Component={MyPageMain}/>
                        <Route path="/pedal/ticket" element={<Ticket/>}/>
                        <Route path="/pedal/:ticketType" element={<TicketBuy/>}/>
                        <Route path="/pedal/ticketBuy" Component={TicketBuy}/>
                        <Route path="/pedal/payment" Component={PayResult}/>
                        <Route path="/pedal/station" Component={Map}/>
                        <Route path="/pedal/myTicketList" Component={MyPageTicketList}/>
                        {/* <Route path="/insertData" Component={InsertData}/> */}
                        <Route path="/pedal/productDetail/:pId" element={<ProductDetail/>}/>
                    </Routes>
            </Router>
        </Provider>
        </div>
    );
};

export default Main;
