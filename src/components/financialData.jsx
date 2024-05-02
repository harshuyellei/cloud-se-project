import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import {Chart, Filler} from 'chart.js'

// Register the chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
Chart.register(Filler)

function FinancialChart({ data }) {
  const chartData = {
    labels: Object.keys(data).reverse(),
    datasets: [
      {
        label: 'Close',
        data: Object.values(data).reverse().map(item => item['4. close']),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Stock Closing Prices',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
}

function FinancialData() {
    const [data, setData] = useState({});
    const [symbol, setSymbol] = useState('IBM');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData(); // Fetch data when the component is mounted
    }, []); // Empty dependency array to mimic componentDidMount behavior

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await axios.get(`/api/financial-data?symbol=${symbol}`);
            setData(result.data['Time Series (Daily)']); // Extract the relevant part of the data
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleSymbolChange = (event) => {
        setSymbol(event.target.value.toUpperCase()); // Convert the symbol to upper case
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData(); // Fetch new data when the form is submitted
    };

    // Prepare chart data if available
    const chartComponent = data && Object.keys(data).length > 0 ? <FinancialChart data={data} /> : null;

  // Generate table rows from the data
  const tableRows = data
    ? Object.entries(data).map(([date, dataForDate]) => (
        <tr key={date}>
          <td>{date}</td>
          <td>{dataForDate['1. open']}</td>
          <td>{dataForDate['2. high']}</td>
          <td>{dataForDate['3. low']}</td>
          <td>{dataForDate['4. close']}</td>
          <td>{dataForDate['5. volume']}</td>
        </tr>
      ))
    : null;

    return (
        <div>
            <h1>Financial Data for {symbol}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={symbol} onChange={handleSymbolChange} />
                <button type="submit">Update</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching data: {error}</p>}
            {chartComponent}
            <div style={{ marginTop: '30px', overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          boxShadow: '0 2px 15px rgba(64, 64, 64, 0.7)',
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left', fontWeight: 'bold' }}>
              <th style={{ padding: '12px 15px' }}>Date</th>
              <th style={{ padding: '12px 15px' }}>Open</th>
              <th style={{ padding: '12px 15px' }}>High</th>
              <th style={{ padding: '12px 15px' }}>Low</th>
              <th style={{ padding: '12px 15px' }}>Close</th>
              <th style={{ padding: '12px 15px' }}>Volume</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FinancialData;