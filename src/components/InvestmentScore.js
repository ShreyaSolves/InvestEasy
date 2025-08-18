import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const InvestmentScore = ({ score }) => {
  if (!score) return null;

  const getScoreColor = (value) => {
    if (value >= 80) return '#4CAF50';
    if (value >= 60) return '#8BC34A';
    if (value >= 40) return '#FFC107';
    if (value >= 20) return '#FF9800';
    return '#F44336';
  };

  return (
    <div className="card investment-score">
      <h2>Investment Potential</h2>
      <div className="score-container">
        <div className="main-score">
          <CircularProgressbar
            value={score.investment_score}
            text={`${score.investment_score}`}
            styles={buildStyles({
              pathColor: getScoreColor(score.investment_score),
              textColor: '#333',
              trailColor: '#eee'
            })}
          />
          <p>Composite Score</p>
        </div>
        <div className="factor-scores">
          <div className="factor">
            <span>Price</span>
            <div className="factor-bar">
              <div 
                className="factor-fill" 
                style={{
                  width: `${score.price_score}%`,
                  backgroundColor: getScoreColor(score.price_score)
                }}
              ></div>
              <span>{score.price_score}%</span>
            </div>
          </div>
          <div className="factor">
            <span>Growth</span>
            <div className="factor-bar">
              <div 
                className="factor-fill" 
                style={{
                  width: `${score.growth_score}%`,
                  backgroundColor: getScoreColor(score.growth_score)
                }}
              ></div>
              <span>{score.growth_score}%</span>
            </div>
          </div>
          <div className="factor">
            <span>Stability</span>
            <div className="factor-bar">
              <div 
                className="factor-fill" 
                style={{
                  width: `${score.volatility_score}%`,
                  backgroundColor: getScoreColor(score.volatility_score)
                }}
              ></div>
              <span>{score.volatility_score}%</span>
            </div>
          </div>
          <div className="factor">
            <span>Market Size</span>
            <div className="factor-bar">
              <div 
                className="factor-fill" 
                style={{
                  width: `${score.market_size_score}%`,
                  backgroundColor: getScoreColor(score.market_size_score)
                }}
              ></div>
              <span>{score.market_size_score}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentScore;