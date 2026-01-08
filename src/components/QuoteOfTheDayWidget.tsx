"use client";

import React from 'react';

const QuoteOfTheDayWidget: React.FC = () => {
  return (
    <div className="w-full flex justify-center p-4 bg-card rounded-lg shadow-md overflow-hidden">
      <a target="_blank" href="https://kwize.com/quote-of-the-day/" rel="nofollow">
        <img 
          id="img-preview" 
          style={{ width: '100%', maxWidth: '400px', minHeight: '185px' }} 
          src="https://kwize.com/pics/Quote-of-the-Day-1-0-0-0.jpg" 
          alt="Quote of the Day"
          className="rounded-lg"
        />
      </a>
    </div>
  );
};

export default QuoteOfTheDayWidget;