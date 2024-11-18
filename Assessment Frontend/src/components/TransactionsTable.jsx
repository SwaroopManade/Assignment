import React, { useEffect, useState, useCallback } from 'react';
import Service from '../api/Service';

const TransactionsTable = ({ month }) => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    // Memoize fetchTransactions to avoid re-creating it on every render
    const fetchTransactions = useCallback(async () => {
        const data = await Service.getTransactions({ month, page, search });
        setTransactions(data.transactions);
    }, [month, page, search]);  // Dependencies

    useEffect(() => {
        fetchTransactions();  // Call the memoized function
    }, [fetchTransactions]);  // useEffect will now call fetchTransactions only when it changes

    return (
        <div className="my-4">
            <h3>Transactions</h3>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((t) => (
                        <tr key={t.id}>
                            <td>{t.title}</td>
                            <td>{t.description}</td>
                            <td>${t.price}</td>
                            <td>{t.sold ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-primary"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                >
                    Previous
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionsTable;
