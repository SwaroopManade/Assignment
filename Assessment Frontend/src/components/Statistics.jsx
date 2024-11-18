import React, { useEffect, useState } from 'react';
import Service from '../api/Service';

const Statistics = ({ month }) => {
    const [stats, setStats] = useState({
        totalSales: 0,
        soldItems: 0,
        unsoldItems: 0,
    });

    // Fetch statistics when the month changes
    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const data = await Service.getStatistics(month);
                setStats(data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchStatistics();
    }, [month]);

    return (
        <div className="my-4">
            <h3 className="text-center mb-4">Statistics</h3>

            {/* Content container with background, left aligned, and reduced size */}
            <div
                className="table-container"
                style={{
                    backgroundColor: "#FFFF0F",
                    padding: "10px 15px", 
                    borderRadius: "10px",
                    marginLeft: "0",
                    width: "300px", 
                    margin: "0", 
                }}
            >
                <table className="table" style={{ width: "100%", borderCollapse: "collapse", margin: 0 }}>
                    <tbody>
                        <tr>
                            <td style={{ fontWeight: "bold", padding: "5px" }}>Total Sales:</td>
                            <td style={{ padding: "5px" }}>${stats.totalSales}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold", padding: "5px" }}>Sold Items:</td>
                            <td style={{ padding: "5px" }}>{stats.soldItems}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold", padding: "5px" }}>Unsold Items:</td>
                            <td style={{ padding: "5px" }}>{stats.unsoldItems}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Statistics;
