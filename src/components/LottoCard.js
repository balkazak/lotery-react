import React, { useState } from 'react';
import './LottoCard.css';

const LottoCard = ({ numbers }) => {
  const [cardNumbers, setCardNumbers] = useState(numbers || generateInitialCard());

  function generateInitialCard() {
    const card = Array(3).fill().map(() => Array(9).fill(0));
    
    for (let row = 0; row < 3; row++) {
      let numbersInRow = 0;
      
      while (numbersInRow < 5) {
        const col = Math.floor(Math.random() * 9);
        
        if (card[row][col] !== 0) continue;
        
        const min = col * 10 + (col === 0 ? 1 : 0);
        const max = col * 10 + (col === 8 ? 90 : 9);
        const number = Math.floor(Math.random() * (max - min + 1)) + min;
        
        const isNumberUsed = card.some(r => r.includes(number));
        if (!isNumberUsed) {
          card[row][col] = number;
          numbersInRow++;
        }
      }
    }
    
    return card;
  }

  const regenerateCard = () => {
    setCardNumbers(generateInitialCard());
  };

  return (
    <div className="lotto-card-container">
      <div className="lotto-card">
        {cardNumbers.map((row, rowIndex) => (
          <div key={rowIndex} className="card-row">
            {row.map((number, colIndex) => (
              <div key={colIndex} className="card-cell">
                {number !== 0 ? number : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={regenerateCard} className="regenerate-button">
        Создать новый билет
      </button>
    </div>
  );
};

export default LottoCard; 