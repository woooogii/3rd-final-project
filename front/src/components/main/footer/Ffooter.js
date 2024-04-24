import React from 'react';
import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer>
            <div className={styles.information}>
                <br/>
                <ul className={styles.aaa}>
                    <li><a href=''> 팀원소개</a></li>
                    <li><a href=''>고객센터</a></li>
                    <li><a href=''>이용약관</a></li>
                    <li><a href=''>위치정보약관</a></li>
                    <li><a href=''>개인정보처리방침</a></li>
                </ul>
                <ul className={styles.bbb}>
                    <li>
                        <a href="https://github.com/ryunoah/final-project-pedal" target="_blank" rel="noopener noreferrer">
                            <img src="/image/github.png" alt='깃허브'/>
                        </a>
                    </li>
                </ul>
                <div className={styles.information}>
                    <p>
                        <br/><br/>
                        <span>서울 강남구 테헤란로 124 (삼원타워 4층)</span><br/>
                        <span>Tel : 0507-1401-8061</span>
                        <p className={styles.copyright}>
                            Copyright © 2024 Paedal Eui Minjok. All rights reserved.
                        </p>
                        <br/>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;