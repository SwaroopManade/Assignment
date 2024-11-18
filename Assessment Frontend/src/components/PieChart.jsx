import React, { useEffect, useState, useCallback } from 'react';
import Service from '../api/Service';

const PieChart = ({ month }) => {
    const [pieData, setPieData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [error, setError] = useState(null);

    // Memoize the fetch function to avoid unnecessary re-creations
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
                percentage: ((count / total) * 100).toFixed(2), // Convert to percentage
            }));

            setTotalItems(total);
            setPieData(processedData);
            setError(null); // Clear error if data is successfully fetched
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
            <h3>Category Distribution Pie Chart</h3>
            
            {/* Error Handling */}
            {error && <p className="text-danger text-center">{error}</p>}

            {/* Pie Chart Visualization */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {pieData.length > 0 ? (
                    <div
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
                        }}
                    ></div>
                ) : (
                    <p>No data available to display the pie chart.</p>
                )}
            </div>

            {/* Legends */}
            {pieData.length > 0 && (
                <div className="mt-4">
                    {pieData.map((data, index) => (
                        <div key={data.category} style={{ display: "flex", alignItems: "center" }}>
                            <div
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
    return colors[index % colors.length]; // Cycle through colors
};

export default PieChart;
