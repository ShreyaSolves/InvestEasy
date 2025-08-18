import React, { useState, useEffect } from 'react';
import { getStateStats } from '../services/api';

const StateStats = () => {
  const [stateStats, setStateStats] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStateStats();
      setStateStats(data);
    };
    fetchData();
  }, []);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`card state-stats ${expanded ? 'expanded' : ''}`}>
      <div className="stats-header" onClick={toggleExpand}>
        <h2>State Statistics</h2>
        <span className="toggle-icon">{expanded ? '−' : '+'}</span>
      </div>
      
      {expanded && (
        <div className="stats-content">
          <table>
            <thead>
              <tr>
                <th>State</th>
                <th>Avg Price</th>
                <th>Median Price</th>
                <th>Cities</th>
              </tr>
            </thead>
            <tbody>
              {stateStats.map(state => (
                <tr key={state.State}>
                  <td>{state.State}</td>
                  <td>${state.AvgPrice.toFixed(2)}</td>
                  <td>${state.MedianPrice.toFixed(2)}</td>
                  <td>{state.CityCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StateStats;