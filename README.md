# InvestEasy – Real Estate Investment Analyzer

A full-stack platform that uses rental market data (Zillow dataset) to help investors evaluate property opportunities with predictions, scores, and interactive visualizations.

## ✨ Features
- 📊 **Interactive Dashboard** – Visualize city-level rental price trends  
- 🔮 **Price Predictions** – 12-month forecasts using ARIMA & Linear Regression  
- 💯 **Investment Scores** – Composite score (0-100) with factor breakdown  
- 🏙️ **City Insights** – View current prices, growth rates, and rankings  
- 🌎 **State Reports** – Aggregated state-level statistics  

## 🛠 Tech Stack
**Backend**: Python, Flask, Pandas, NumPy, Scikit-learn, Statsmodels  
**Frontend**: React.js, Chart.js, React Circular Progressbar, CSS Flexbox/Grid  

## 📂 Project Structure
InvestEasy/
├── backend/
│ ├── app.py
│ ├── models/
│ │ ├── data_processor.py
│ │ ├── predictor.py
│ │ └── scoring.py
│ ├── data/
│ ├── requirements.txt
│ └── README.md
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── services/
│ │ ├── App.js
│ │ └── App.css
│ ├── package.json
│ └── README.md
└── README.md
