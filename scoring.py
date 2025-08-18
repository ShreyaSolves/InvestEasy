import numpy as np

class InvestmentScorer:
    def __init__(self, df):
        self.df = df
        
    def calculate_investment_score(self, city_name):
        city_data = self.df[self.df['RegionName'] == city_name]
        if city_data.empty:
            return None
            
        # Get latest price
        latest_price = city_data.sort_values('Date')['Price'].iloc[-1]
        
        # Calculate growth rates
        yearly = city_data.groupby('Year')['Price'].mean().reset_index()
        if len(yearly) < 2:
            return None
            
        growth_1yr = (yearly.iloc[-1]['Price'] - yearly.iloc[-2]['Price']) / yearly.iloc[-2]['Price']
        growth_5yr = (yearly.iloc[-1]['Price'] - yearly.iloc[-5]['Price']) / yearly.iloc[-5]['Price'] if len(yearly) >= 5 else growth_1yr
        
        # Calculate volatility (standard deviation of monthly returns)
        city_data = city_data.sort_values('Date')
        returns = city_data['Price'].pct_change().dropna()
        volatility = returns.std()
        
        # Size rank (lower is better)
        size_rank = city_data['SizeRank'].iloc[-1]
        
        # Normalize metrics
        max_price = self.df['Price'].max()
        price_score = 1 - (latest_price / max_price)  # Lower prices are better for investment
        
        growth_score = (growth_1yr + growth_5yr) / 2  # Average growth
        
        # Inverse volatility (lower volatility is better)
        max_volatility = returns.std() * 3  # Assuming 3 sigma covers most cases
        volatility_score = 1 - (volatility / max_volatility)
        
        rank_score = 1 - (size_rank / self.df['SizeRank'].max())
        
        # Weighted composite score (adjust weights as needed)
        composite_score = (
            0.3 * price_score +
            0.4 * growth_score +
            0.2 * volatility_score +
            0.1 * rank_score
        )
        
        # Convert to percentage (0-100 scale)
        investment_score = min(max(composite_score * 100, 0), 100)
        
        return {
            'city': city_name,
            'investment_score': round(investment_score, 1),
            'price_score': round(price_score * 100, 1),
            'growth_score': round(growth_score * 100, 1),
            'volatility_score': round(volatility_score * 100, 1),
            'market_size_score': round(rank_score * 100, 1),
            'current_price': round(latest_price, 2),
            'annual_growth_rate': round(growth_1yr * 100, 1),
            'five_year_growth_rate': round(growth_5yr * 100, 1) if len(yearly) >= 5 else None
        }