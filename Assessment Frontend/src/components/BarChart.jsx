import React, { useEffect, useState, useCallback } from 'react';
import Service from '../api/Service';

const BarChart = ({ month }) => {
    const [barData, setBarData] = useState({});
    const [error, setError] = useState(null);

    // Define fetchBarChartData outside of useEffect to avoid missing dependency warning
    const fetchBarChartData = useCallback(async () => {
        try {
            const data = await Service.getBarChart(month);
            setBarData(data);
        } catch (error) {
            console.error("Error fetching bar chart data:", error);
            setError("Failed to load chart data.");
        }
    }, [month]); // Dependency array should include 'month'

    useEffect(() => {
        fetchBarChartData();
    }, [fetchBarChartData]); // Make sure fetchBarChartData is included here

    return (
        <div className="my-4">
            <h3>Bar Chart</h3>
            {error && <p className="text-danger">{error}</p>}
            <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: "300px", borderLeft: "2px solid #000", borderBottom: "2px solid #000", padding: "10px" }}>
                {Object.entries(barData).map(([range, count]) => (
                    <div key={range} style={{ textAlign: "center" }}>
                        <div style={{
                            height: `${Math.min(count * 10, 300)}px`, // Scale bar height and cap max height
                            width: "40px",
                            backgroundColor: "teal",
                        }}></div>
                        <span>{range}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BarChart;
