import React, { useEffect, useState, useCallback } from 'react';
import Service from '../api/Service';

const BarChart = ({ month }) => {
    const [barData, setBarData] = useState({});
    const [error, setError] = useState(null);

    const fetchBarChartData = useCallback(async () => {
        try {
            const data = await Service.getBarChart(month);
            setBarData(data);
        } catch (error) {
            console.error("Error fetching bar chart data:", error);
            setError("Failed to load chart data.");
        }
    }, [month]);

    useEffect(() => {
        fetchBarChartData();
    }, [fetchBarChartData]);

    
    const yAxisScale = [0, 1, 2, 3, 4, 5]; 

    
    const barScalingFactor = 30;  
    const containerHeight = 300; 

    return (
        <div className="my-4">
            <h3 className="text-center mb-4">Bar Chart</h3>
            {error && <p className="text-danger text-center">{error}</p>}
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "8px",  
                    height: `${containerHeight}px`,  // Fixed container height
                    borderLeft: "2px solid #333", 
                    borderBottom: "2px solid #333", 
                    padding: "10px",
                    position: "relative",
                    overflow: "hidden", 
                    marginLeft: "40px", 
                }}
            >
                {/* Y-Axis Labels */}
                <div
                    style={{
                        position: "absolute",
                        left: "-40px",  
                        top: "0",
                        bottom: "0",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "#333",
                        fontSize: "12px",
                    }}
                >
                    {yAxisScale.map((value, idx) => (
                        <span key={idx} style={{ margin: "5px 0" }}>
                            {value}
                        </span>
                    ))}
                </div>

                {/* Bars */}
                {Object.entries(barData).map(([range, count]) => {
                    
                    const barHeight = count * barScalingFactor;
                    const barWidth = Math.max(40, 60);  

                    return (
                        <div key={range} style={{ textAlign: "center" }}>
                            <div
                                style={{
                                    height: `${barHeight}px`, 
                                    width: `${barWidth}px`,  
                                    backgroundColor: "#008080",  
                                    borderRadius: "4px 4px 0 0",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = "scale(1.1)";
                                    e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = "scale(1)";
                                    e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                                }}
                            />
                            <span style={{ marginTop: "8px", display: "block", fontSize: "12px", color: "#333" }}>
                                {range}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BarChart;
