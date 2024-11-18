import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

const App = () => {
    const [month, setMonth] = useState("3"); 

    return (
        <div className="container-fluid" style={{ backgroundColor: "#f4f6f9", minHeight: "100vh", padding: "30px" }}>
            {/* Header Section */}
            <div className="text-center my-4">
                <h1 style={{ fontSize: "2.5rem", fontWeight: "600", color: "#333" }}>Transactions Dashboard</h1>
            </div>

            {/* Month Selector */}
            <div className="mb-4">
                <label htmlFor="monthSelect" className="form-label" style={{ fontSize: "1.2rem", fontWeight: "500" }}>Select Month:</label>
                <select
                    id="monthSelect"
                    className="form-select"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    style={{ fontSize: "1rem", padding: "0.75rem" }}
                >
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
            </div>

            {/* Statistics Section */}
            <div className="row mb-4">
                <div className="col-12 col-md-4">
                    <Statistics month={month} />
                </div>
            </div>

            {/* Layout for Charts and Table */}
            <div className="row">
                <div className="col-12 col-md-6 mb-4">
                    <TransactionsTable month={month} />
                </div>
                <div className="col-12 col-md-6 mb-4">
                    <BarChart month={month} />
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <PieChart month={month} />
                </div>
            </div>
        </div>
    );
};

export default App;
