// Chart.js
import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

import './Chart.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Chart = ({ title, type, data }) => {
    const renderChart = () => {
        switch (type) {
            case 'line':
                return <Line data={data} />;
            case 'bar':
                return <Bar data={data} />;
            case 'pie':
                return <Pie data={data} />;
            default:
                return null;
        }
    };

    return (
        <div className="chart">
            <h3>{title}</h3>
            {renderChart()}
        </div>
    );
};

export default Chart;
