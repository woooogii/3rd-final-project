import React from 'react';
import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <ul className={styles.footerLinks}>
                <li style={{marginRight: '80px'}}><a href='' style={{textDecoration: 'none', color: '#898989', fontWeight: 'bold'}}>팀원소개</a></li>
                <li style={{marginRight: '80px'}}><a href='' style={{textDecoration: 'none', color: '#898989', fontWeight: 'bold'}}>고객센터</a></li>
                <li style={{marginRight: '80px'}}><a href='' style={{textDecoration: 'none', color: '#898989', fontWeight: 'bold'}}>이용약관</a></li>
                <li style={{marginRight: '80px'}}><a href='' style={{textDecoration: 'none', color: '#898989', fontWeight: 'bold'}}>위치정보약관</a></li>
                <li style={{marginRight: '80px'}}><a href='' style={{textDecoration: 'none', color: '#898989', fontWeight: 'bold'}}>개인정보처리방침</a></li>

                    <li>
                        <a href='' style={{marginRight: '10px'}}><img src='/image/github.png' className={styles.icon} /></a>
                        <a href='http://localhost:8000'><img src='/image/instargram.png' className={styles.icon} /></a>
                    </li>
                </ul>
                <div className={styles.addressInfo}>
                    <span>서울 강남구 테헤란로 124 (삼원타워 4층) Tel : 0507-1401-8061</span>
                </div>
                <div className={styles.copyright}>
                    <span>Copyright © 2024 Pedal-ui Minjok. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
};
export default Footer;