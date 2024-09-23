// AnalyticsCard.js
import React from 'react';
import './AnalyticsCard.css';

const AnalyticsCard = ({ title, value }) => {
    return (
        <div className="analytics-card">
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    );
};

export default AnalyticsCard;
