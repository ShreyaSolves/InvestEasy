from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from models.data_processor import DataProcessor
from models.predictor import PricePredictor
from models.scoring import InvestmentScorer
import os

app = Flask(__name__)
CORS(app)

# Load and preprocess data
data_path = os.path.join('data', 'City_MedianRentalPrice_1Bedroom.csv')
data_processor = DataProcessor(data_path)
df = data_processor.load_and_preprocess_data()

# Initialize models
predictor = PricePredictor(df)
scorer = InvestmentScorer(df)

@app.route('/api/cities', methods=['GET'])
def get_cities():
    cities = df['RegionName'].unique().tolist()
    return jsonify({'cities': cities})

@app.route('/api/state_stats', methods=['GET'])
def get_state_stats():
    state_stats = data_processor.get_state_statistics()
    return jsonify(state_stats)

@app.route('/api/city_data/<city>', methods=['GET'])
def get_city_data(city):
    city_data = data_processor.get_city_data(city)
    if city_data is None:
        return jsonify({'error': 'City not found'}), 404
    return jsonify(city_data)

@app.route('/api/predict/<city>', methods=['GET'])
def predict(city):
    predictions = predictor.predict_future_prices(city)
    if predictions is None:
        return jsonify({'error': 'City not found or insufficient data'}), 404
    return jsonify(predictions)

@app.route('/api/score/<city>', methods=['GET'])
def score(city):
    score_data = scorer.calculate_investment_score(city)
    if score_data is None:
        return jsonify({'error': 'City not found or insufficient data'}), 404
    return jsonify(score_data)

if __name__ == '__main__':
    app.run(debug=True)