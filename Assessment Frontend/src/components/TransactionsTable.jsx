import React, { useEffect, useState, useCallback } from 'react';
import Service from '../api/Service';

const TransactionsTable = ({ month }) => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [selectedMonth, setSelectedMonth] = useState(month);

   
    const fetchTransactions = useCallback(async () => {
        const data = await Service.getTransactions({ month: selectedMonth, page, search });
        setTransactions(data.transactions);
    }, [selectedMonth, page, search]); 
    useEffect(() => {
        fetchTransactions();  
    }, [fetchTransactions]);  

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    return (
        <div className="my-4">
            <h3 className="text-center mb-4">Transactions</h3>

            {/* Month Dropdown */}
            <div className="mb-3">
                <select
                    className="form-select"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    style={{
                        backgroundColor: "#F0E2B6",
                        borderRadius: "8px", 
                        padding: "10px",
                    }}
                >
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    {/* Add more months as needed */}
                </select>
            </div>

            {/* Search Input */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Transactions Table */}
            <table className="table table-striped" style={{
                backgroundColor: "#F4E1C1",
                borderRadius: "10px",
                border: "2px solid #ddd",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", 
            }}>
                <thead style={{
                    backgroundColor: "#F0E2B6",
                    color: "#333",
                    borderBottom: "2px solid #ddd", 
                }}>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((t) => (
                        <tr key={t.id} style={{ borderBottom: "1px solid #ddd" }}>
                            <td>{t.title}</td>
                            <td>{t.description}</td>
                            <td>${t.price}</td>
                            <td>{t.sold ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Buttons */}
            <div className="d-flex justify-content-between mt-4">
                <button
                    className={`btn btn-primary ${page === 1 ? "disabled" : ""}`}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    style={{
                        backgroundColor: page === 1 ? "#c1c1c1" : "#007bff", 
                        borderRadius: "8px",
                    }}
                >
                    Previous
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => setPage((prev) => prev + 1)}
                    style={{
                        backgroundColor: "#007bff",
                        borderRadius: "8px",
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionsTable;
