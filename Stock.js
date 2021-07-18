import React from 'react';
import Plot from 'react-plotly.js';

class Stock extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			stockChartXValues: [],
			stockChartYValues: [],
			stockChartLowValues: [],
			stockChartHighValues: [],
			stockChartAveragePrice: [],
			stockChartAdjustedPrice: []
		}
	}
	getAverage(grades) {
		var sum = 0;
		for (var i = 0; i < grades.length; i++) {
			sum += parseInt(grades[i], 10);
		}
		var avg = sum / grades.length;
		return avg;
	}


	componentDidMount(){
		this.fetchStock();
	}

	fetchStock() {
		const pointerToThis = this;
		console.log(pointerToThis);
     const APIKEY = " "; //Enter your API key


		let API_Call = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=RELIANCE.BSE&outputsize=compact&apikey=APIKEY';
		let stockChartXValuesFunction = [];
		let stockChartYValuesFunction = [];
		let stockChartHighData = [];
		let stockChartLowData = [];
		let stockChartAdjusted = [];

		fetch(API_Call)
			.then(
				function (response) {
					return response.json();
				}
				)
			.then(
				function (data) {
					console.log(data);

					for (var key in data['Time Series (Daily)']) {
						stockChartXValuesFunction.push(key);
						stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
						stockChartHighData.push(data['Time Series (Daily)'][key]['2. high']);
						stockChartLowData.push(data['Time Series (Daily)'][key]['3. low']);
						stockChartAdjusted.push(data['Time Series (Daily)'][key]['6. adjusted close']);
					}
					//console.log(stockChartXValuesFunction);
					pointerToThis.setState({
						stockChartXValues: stockChartXValuesFunction,
						stockChartYValues: stockChartYValuesFunction,
						stockChartLowValues: stockChartLowData,
						stockChartHighValues: stockChartHighData,
						stockChartAdjustedPrice: stockChartAdjusted


					});


				}

		)



	}

	render() {
		return (
			<div>
				<h1> Stock Market </h1>

				<p> Average Sell Price: {this.getAverage(this.state.stockChartHighValues)} </p>
				<p> Average Buy Price: {this.getAverage(this.state.stockChartLowValues)}</p>




				<Plot
					data={[
						{
							x: this.state.stockChartXValues,
							y: this.state.stockChartYValues,
							type: 'scatter',
							mode: 'lines+markers',
							marker: { color: 'red' },
						},

					]}
					layout={{ width: 720, height: 440, title: 'Reliance NSE Stocks Graph' }}
				/>
			</div>
			)
	}
}
export default Stock;
