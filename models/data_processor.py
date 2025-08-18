import pandas as pd
import numpy as np

class DataProcessor:
    def __init__(self, data_path):
        self.data_path = data_path
        
    def load_and_preprocess_data(self):
        # Load the data
        df = pd.read_csv(self.data_path)
        
        # Melt the dataframe to have dates as rows
        date_columns = [col for col in df.columns if col[0].isdigit()]
        df = pd.melt(df, id_vars=['RegionName', 'State', 'Metro', 'CountyName', 'SizeRank'], 
                    value_vars=date_columns, var_name='Date', value_name='Price')
        
        # Convert Date to datetime and extract year/month
        df['Date'] = pd.to_datetime(df['Date'])
        df['Year'] = df['Date'].dt.year
        df['Month'] = df['Date'].dt.month
        
        # Drop rows with missing prices
        df = df.dropna(subset=['Price'])
        
        # Convert Price to float
        df['Price'] = df['Price'].astype(float)
        
        return df
    
    def get_state_statistics(self):
        state_stats = self.df.groupby('State').agg({
            'Price': ['mean', 'median', 'count']
        }).reset_index()
        state_stats.columns = ['State', 'AvgPrice', 'MedianPrice', 'CityCount']
        return state_stats.to_dict('records')
    
    def get_city_data(self, city_name):
        city_data = self.df[self.df['RegionName'] == city_name]
        if city_data.empty:
            return None
        
        # Get latest price
        latest = city_data.sort_values('Date').iloc[-1]
        
        # Calculate growth metrics
        yearly = city_data.groupby('Year')['Price'].mean().reset_index()
        if len(yearly) > 1:
            growth_1yr = (yearly.iloc[-1]['Price'] - yearly.iloc[-2]['Price']) / yearly.iloc[-2]['Price'] * 100
            growth_5yr = (yearly.iloc[-1]['Price'] - yearly.iloc[-5]['Price']) / yearly.iloc[-5]['Price'] * 100 if len(yearly) >= 5 else None
        else:
            growth_1yr = None
            growth_5yr = None
        
        return {
            'city': city_name,
            'state': latest['State'],
            'metro': latest['Metro'],
            'county': latest['CountyName'],
            'current_price': latest['Price'],
            'growth_1yr': growth_1yr,
            'growth_5yr': growth_5yr,
            'size_rank': int(latest['SizeRank'])
        }