import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function FinancialChart({ data }) {
    const chartData = {
        labels: Object.keys(data).reverse(), // Dates
        datasets: [{
            label: 'Close',
            data: Object.values(data).reverse().map(item => item['4. close']),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    return <Line data={chartData} />;
}
