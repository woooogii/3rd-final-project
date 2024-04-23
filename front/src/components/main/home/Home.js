import MainButton from '../myPage/MainButton';
import React from 'react';
import './home.css'

const Home = () => {
    
    return (
       
        <div>
            <hr/>
             <div class="one">
                <img src="/image2/main1.jpg" alt="" />
            </div>
            <hr/>
            <div class="grid">
                <div class="three-one">
                    <img src="/image2/main3.jpg" alt="" />
                </div>
                <div class="three-four">
                    <img src="/image2/main6.jpg" alt="" />
                </div>
                <div class="three-two">
                    <img src="/image2/main5.jpeg" alt="" />
                </div>
                <div class="three-three">
                    <img src="/image2/main4.jpg" alt="" />
                </div>
            </div>
            <div className="four">
                <img src="/image2/main7.jpg" alt="" />
            </div>
            <div class="grid">
                <div className="five-one">
                    <img src="/image2/main8.jpg" alt="" />
                </div>
                <div className="five-two">
                    <img src="/image2/main9.jpg" alt="" />
                </div>
                <div className="five-three">
                    <img src="/image2/main10.jpg" alt="" />
                </div>
                <div className="five-four">
                    <img src="/image2/main11.jpg" alt="" />
                </div>
            </div>
            <div className="six">
                <img src="/image2/main12.jpg" alt="" />
            </div>

            <MainButton/>
        </div>
    );
};

export default Home;
