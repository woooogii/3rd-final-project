import React from 'react';

const PedalFAQCategory = ({ categories, activeCategory, setActiveCategory, setActiveQuestion }) => {
  return (
    <div className="category-list">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`category-item ${activeCategory === category.category ? 'active' : ''}`}
          onClick={() => {
            setActiveCategory(category.category);
            setActiveQuestion(null); // Reset active question when changing category
          }}
        >
          {category.category}
        </button>
      ))}
    </div>
  );
};

export default PedalFAQCategory;