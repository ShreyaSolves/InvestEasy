import React from 'react';

const CityStats = ({ data }) => {
  return (
    <div className="card city-stats">
      <h2>{data.city}, {data.state}</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <h3>Current Price</h3>
          <p>${data.current_price.toLocaleString()}</p>
        </div>
        <div className="stat-item">
          <h3>1-Year Growth</h3>
          <p className={data.growth_1yr >= 0 ? 'positive' : 'negative'}>
            {data.growth_1yr !== null ? `${data.growth_1yr.toFixed(1)}%` : 'N/A'}
          </p>
        </div>
        <div className="stat-item">
          <h3>5-Year Growth</h3>
          <p className={data.growth_5yr >= 0 ? 'positive' : 'negative'}>
            {data.growth_5yr !== null ? `${data.growth_5yr.toFixed(1)}%` : 'N/A'}
          </p>
        </div>
        <div className="stat-item">
          <h3>Metro Area</h3>
          <p>{data.metro}</p>
        </div>
        <div className="stat-item">
          <h3>County</h3>
          <p>{data.county}</p>
        </div>
        <div className="stat-item">
          <h3>Market Size Rank</h3>
          <p>#{data.size_rank}</p>
        </div>
      </div>
    </div>
  );
};

export default CityStats;