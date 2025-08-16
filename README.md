# InvestEasy Analytics

## Project Description
Python app for investors to predict house prices using Kaggle data, with scikit-learn and Tableau. Inspired by Zillow & Airbnb for market insights & dynamic pricing.

## Overview
- **Goal**: Predict home prices to guide real estate investments across markets.
- **Tools**: Python (pandas, scikit-learn, matplotlib), Tableau, Excel.
- **Dataset**: Kaggle House Prices: Advanced Regression Techniques (~1460 rows, 81 columns).
- **Inspiration**:
  - **Zillow Zestimate**: Regression models for home valuations.
  - **Airbnb Smart Pricing**: Dynamic pricing for market trends.
- **Target Audience**: Real estate investors, agents, tech professionals.

## Repository Structure
- `notebooks/`: Jupyter notebooks for analysis.
  - `exploration.ipynb`: Initial visualizations (e.g., `SalePrice` vs. `GrLivArea`).
  - `model.ipynb`: Regression model (to be added).
- `data/`: Datasets.
  - `train.csv`: Kaggle House Prices dataset.
- `excel/`: Excel files.
  - `house_prices_explored.xlsx`: Pivot tables (to be added).
- `tableau/`: Tableau dashboards (to be added).
- `docs/`: Documentation.

## Getting Started
1. Clone: `git clone https://github.com/your-username/InvestEasy-Analytics.git`
2. Install: `pip install pandas scikit-learn matplotlib`
3. Run `notebooks/exploration.ipynb` in Jupyter.

## Progress
- Added Kaggle dataset (`train.csv`).
- Explored `SalePrice` vs. `GrLivArea`, monthly trends.

## Next Steps
- Clean data (e.g., `LotFrontage`).
- Train Linear Regression or XGBoost model.
- Build Tableau dashboard.

## Future Vision
- Web app for real-time predictions.
- Rental yield and neighborhood analytics.
