import React, { useEffect, useState } from 'react';
import Service from '../api/Service';

const Statistics = ({ month }) => {
    const [stats, setStats] = useState({ totalSales: 0, soldItems: 0, unsoldItems: 0 });

    useEffect(() => {
        const fetchStatistics = async () => {
            const data = await Service.getStatistics(month);
            setStats(data);
        };

        fetchStatistics();  // Call fetchStatistics immediately when `month` changes
    }, [month]);  // `month` is the dependency

    return (
        <div className="my-4">
            <h3>Statistics</h3>
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Total Sales</h5>
                            <p className="card-text">${stats.totalSales}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Sold Items</h5>
                            <p className="card-text">{stats.soldItems}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Unsold Items</h5>
                            <p className="card-text">{stats.unsoldItems}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
