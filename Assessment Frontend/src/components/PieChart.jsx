import React, { useEffect, useState, useCallback } from 'react';
import Service from '../api/Service';

const PieChart = ({ month }) => {
    const [pieData, setPieData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [error, setError] = useState(null);

    const fetchPieChartData = useCallback(async () => {
        try {
            const data = await Service.getPieChart(month);
            if (!data || Object.keys(data).length === 0) {
                setError("No data available for the selected month.");
                return;
            }

            const total = Object.values(data).reduce((sum, count) => sum + count, 0);

            const processedData = Object.entries(data).map(([category, count]) => ({
                category,
                percentage: ((count / total) * 100).toFixed(2), 
            }));

            setTotalItems(total);
            setPieData(processedData);
            setError(null); 
        } catch (error) {
            console.error("Error fetching pie chart data:", error);
            setError("Error fetching data. Please try again later.");
        }
    }, [month]);

    useEffect(() => {
        fetchPieChartData();
    }, [fetchPieChartData]);

    return (
        <div className="my-4">
            <h3 className="text-center mb-4">Category Distribution Pie Chart</h3>

            {/* Error Handling */}
            {error && <p className="text-danger text-center">{error}</p>}

            {/* Pie Chart Visualization */}
            <div className="pie-chart-container" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {pieData.length > 0 ? (
                    <div
                        className="pie-chart"
                        style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "50%",
                            background: `conic-gradient(
                                ${pieData
                                    .map(
                                        (data, index) =>
                                            `${getColor(index)} 0 ${data.percentage}%`
                                    )
                                    .join(", ")}
                            )`,
                            position: "relative",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.3s ease-in-out",
                        }}
                        onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                        aria-label={`Pie chart representing categories for month ${month}`}
                    ></div>
                ) : (
                    <p className="text-center">No data available to display the pie chart.</p>
                )}
            </div>

            {/* Legends */}
            {pieData.length > 0 && (
                <div className="legend-container mt-4">
                    {pieData.map((data, index) => (
                        <div key={data.category} className="legend-item" style={{ display: "flex", alignItems: "center" }}>
                            <div
                                className="legend-color-box"
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    backgroundColor: getColor(index),
                                    marginRight: "10px",
                                }}
                            ></div>
                            <span>{data.category}: {data.percentage}%</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Total Items */}
            <p className="mt-2 text-center">Total Items: {totalItems}</p>
        </div>
    );
};

// Helper function to assign colors
const getColor = (index) => {
    const colors = ["#FF5733", "#33FF57", "#5733FF", "#FFD700", "#FF33A6"];
    return colors[index % colors.length]; 
};

export default PieChart;
