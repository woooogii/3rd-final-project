import React from 'react';

const PedalFAQ = ({ questions, activeQuestion, setActiveQuestion }) => {
  return (
    <div className="question-list">
      {questions.map((question, index) => (
        <div key={index}>
          <button
            className={`question-item ${activeQuestion === question.q ? 'active' : ''}`}
            onClick={() => setActiveQuestion(question.q)}
          >
            {question.q}
          </button>
          {activeQuestion === question.q && <div className="answer">{question.a}</div>}
        </div>
      ))}
    </div>
  );
};

export default PedalFAQ;