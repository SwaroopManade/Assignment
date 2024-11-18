import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

const App = () => {
    const [month, setMonth] = useState("3"); // Default to March

    return (
        <div className="container">
            <h1 className="text-center my-4">Transactions Dashboard</h1>

            {/* Month Selector */}
            <div className="mb-3">
                <label htmlFor="monthSelect" className="form-label">Select Month:</label>
                <select
                    id="monthSelect"
                    className="form-select"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
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
            <Statistics month={month} />

            {/* Transactions Table Section */}
            <TransactionsTable month={month} />

            {/* Bar Chart Section */}
            <BarChart month={month} />

            {/* Pie Chart Section */}
            <PieChart month={month} />
        </div>
    );
};

export default App;
