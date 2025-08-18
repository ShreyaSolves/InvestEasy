const API_BASE = 'http://localhost:5000/api';

export const getCities = async () => {
  const response = await fetch(`${API_BASE}/cities`);
  return await response.json();
};

export const getStateStats = async () => {
  const response = await fetch(`${API_BASE}/state_stats`);
  return await response.json();
};

export const getCityData = async (city) => {
  const response = await fetch(`${API_BASE}/city_data/${encodeURIComponent(city)}`);
  return await response.json();
};

export const getPredictions = async (city) => {
  const response = await fetch(`${API_BASE}/predict/${encodeURIComponent(city)}`);
  return await response.json();
};

export const getScore = async (city) => {
  const response = await fetch(`${API_BASE}/score/${encodeURIComponent(city)}`);
  return await response.json();
};