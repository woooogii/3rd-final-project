import React, { useState } from 'react';
import faq from './faq'; // FAQ 데이터 파일 임포트
import CategoryList from './PedalFAQCategory';
import QuestionList from './PedalFAQ';
import './FAQ.css'; // CSS 스타일 시트 임포트

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function formatText(text) {

    return text.split('\n').map((item, key) => (
      <React.Fragment key={key}>
        {item}
        <br />
      </React.Fragment>
    ));
  }
  
  const PedalFAQMain = () => {
    const [activeCategory, setActiveCategory] = useState(faq[0].category);
    const [activeQuestion, setActiveQuestion] = useState(null);

    const navigate = useNavigate();

    const chatClick = () => {
      const url = `/pedal/chatroom`;
      navigate(url);

  }
  
    // 선택된 카테고리의 FAQ 데이터를 찾음
    const selectedCategory = faq.find(cat => cat.category === activeCategory);
  
    return (
        <div className="faq-container">
        <div className="category-list">
            {faq.map(cat => (
                <img
                    key={cat.category}
                    src={cat.imagePath} // 이미지 경로 동적으로 사용
                    alt={cat.category}
                    className={`category-item ${activeCategory === cat.category ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.category)}
                    style={{ cursor: 'pointer', width: '150px', height: 'auto', border:'none' }}
                />
            ))}
            <div onClick={chatClick}>
            <img 
            src='/image/MUNEI.png'
            alt='문의읨'
            className='category-item' 
            style={{ cursor: 'pointer', width: '150px', height: 'auto', border:'none' }}
            />
            </div>
        </div>
        <div className="question-list-container">
          <div className="question-list">
            {selectedCategory && selectedCategory.questions.map((qna, index) => (
              <div key={index} className="question-answer-container">
                <div
                  className={`question-item ${activeQuestion === qna.q ? 'active' : ''}`}
                  onClick={() => setActiveQuestion(activeQuestion === qna.q ? null : qna.q)}
                >
                  {qna.q}
                </div>
                {activeQuestion === qna.q && (
                  <div className="answer">{formatText(qna.a)}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  


export default PedalFAQMain;

