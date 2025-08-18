import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from statsmodels.tsa.arima.model import ARIMA
import warnings
warnings.filterwarnings("ignore")

class PricePredictor:
    def __init__(self, df):
        self.df = df
        
    def predict_future_prices(self, city_name, months=12):
        city_data = self.df[self.df['RegionName'] == city_name]
        if city_data.empty or len(city_data) < 24:  # Need at least 2 years of data
            return None
            
        # Prepare time series data
        ts = city_data.set_index('Date')['Price'].sort_index()
        
        # Try ARIMA model
        try:
            model = ARIMA(ts, order=(1,1,1))
            model_fit = model.fit()
            forecast = model_fit.forecast(steps=months)
            
            # Create prediction timeline
            last_date = ts.index[-1]
            future_dates = pd.date_range(
                start=last_date + pd.DateOffset(months=1),
                periods=months,
                freq='MS'
            )
            
            predictions = {
                'dates': future_dates.strftime('%Y-%m').tolist(),
                'prices': forecast.tolist(),
                'model': 'ARIMA'
            }
            
            return predictions
            
        except:
            # Fallback to simple linear regression if ARIMA fails
            X = np.arange(len(ts)).reshape(-1, 1)
            y = ts.values
            model = LinearRegression()
            model.fit(X, y)
            
            future_X = np.arange(len(ts), len(ts)+months).reshape(-1, 1)
            future_prices = model.predict(future_X)
            
            last_date = ts.index[-1]
            future_dates = pd.date_range(
                start=last_date + pd.DateOffset(months=1),
                periods=months,
                freq='MS'
            )
            
            predictions = {
                'dates': future_dates.strftime('%Y-%m').tolist(),
                'prices': future_prices.tolist(),
                'model': 'Linear Regression'
            }
            
            return predictions