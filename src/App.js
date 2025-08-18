import React, { useState, useEffect } from 'react';
import './App.css';
import CitySelector from './components/CitySelector';
import CityStats from './components/CityStats';
import InvestmentScore from './components/InvestmentScore';
import PricePrediction from './components/PricePrediction';
import GrowthChart from './components/GrowthChart';
import StateStats from './components/StateStats';
import { getCities, getCityData, getPredictions, getScore } from './services/api';

function App() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      const data = await getCities();
      setCities(data.cities);
    };
    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      setLoading(true);
      const fetchData = async () => {
        const [data, pred, scr] = await Promise.all([
          getCityData(selectedCity),
          getPredictions(selectedCity),
          getScore(selectedCity)
        ]);
        setCityData(data);
        setPredictions(pred);
        setScore(scr);
        setLoading(false);
      };
      fetchData();
    }
  }, [selectedCity]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Real Estate Investment Analyzer</h1>
      </header>
      <main>
        <CitySelector 
          cities={cities} 
          selectedCity={selectedCity} 
          onSelect={setSelectedCity} 
        />
        
        {loading && <div className="loading">Loading data...</div>}
        
        {cityData && !loading && (
          <>
            <div className="dashboard-row">
              <CityStats data={cityData} />
              <InvestmentScore score={score} />
            </div>
            
            <div className="dashboard-row">
              <PricePrediction predictions={predictions} />
              <GrowthChart city={selectedCity} />
            </div>
          </>
        )}
        
        <StateStats />
      </main>
    </div>
  );
}

export default App;