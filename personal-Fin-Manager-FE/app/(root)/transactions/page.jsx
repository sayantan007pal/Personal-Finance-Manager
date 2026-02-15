"use client";
import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

const VALID_TYPES = ["DEBIT", "CREDIT"];
const VALID_CATEGORIES = ["FOOD", "TRANSPORTATION", "BILLS", "ENTERTAINMENT", "SALARY", "RENT", "GROCERIES", "SHOPPING", "HEALTH", "EDUCATION", "OTHER"];
const CURRENCY = ["USD", "INR", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "HKD", "NZD", "SEK", "NOK", "DKK", "BRL", "MXN", "ZAR", "TRY", "RUB", "SGD", "AED"]
export default function TransactionsPage() {
    const [form, setForm] = useState({
        amount: "",
        type: "",
        category: "",
        description: "",
        date: "",
    });
    const [transactions, setTransactions] = useState([]);
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchTransactions = async () => {
        try {
            const res = await api.get("/api/transactions");
            setTransactions(res.data.data);
        } catch (err) {
            console.log("Failed to fetch transactions", err.message);
        }
    };

    const fetchAccount = async () => {
        try {
            const res = await api.get("/api/accounts");
            setAccount(res.data.data);
        } catch (err) {
            console.log("Failed to fetch account", err.message);
        }
    };

    useEffect(() => {
        fetchTransactions();
        fetchAccount();
    }, []);

    const onSubmit = async () => {
        if (!form.amount || !form.type || !form.category || !form.description || !form.date) {
            toast.error("Please fill all fields");
            return;
        }
        if (!account?._id) {
            toast.error("No account found. Please create an account first.");
            return;
        }
        try {
            setLoading(true);
            await api.post("/api/transactions", {
                amount: parseFloat(form.amount),
                type: form.type,
                category: form.category,
                description: form.description,
                date: form.date,
                accountId: account._id,
            });
            toast.success("Transaction added!");
            setForm({ amount: "", type: "", category: "", description: "", date: "" });
            fetchTransactions();
        } catch (err) {
            console.log("Failed to add transaction", err.message);
            toast.error(err.response?.data?.message || "Failed to add transaction");
        } finally {
            setLoading(false);
        }
    };

    const getAmount = (t) => parseFloat(t.amount?.$numberDecimal || t.amount || 0);


    return (
        <div>
            <h1>Transactions</h1>
            <hr />

            {/* Add Transaction Form */}
            <h2>Add Transaction</h2>

            <div>
                <label htmlFor="amount">Amount</label>
                <br />
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    type="number"
                    id="amount"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    placeholder="Enter amount"
                />
            </div>

            <div>
                <label htmlFor="type">Type</label>
                <br />
                <select
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    id="type"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                    <option value="">-- Select Type --</option>
                    {VALID_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="category">Category</label>
                <br />
                <select
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    id="category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                    <option value="">-- Select Category --</option>
                    {VALID_CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="description">Description</label>
                <br />
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    type="text"
                    id="description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Enter description"
                />
            </div>

            <div>
                <label htmlFor="date">Date</label>
                <br />
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    type="date"
                    id="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
            </div>

            <div>
                <button
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    onClick={onSubmit}
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Transaction"}
                </button>
            </div>

            <hr />

            {/* Transactions List */}
            <h2>All Transactions</h2>
            {transactions.length === 0 ? (
                <p>No transactions yet.</p>
            ) : (
                <table border="1" cellPadding="8" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((t) => (
                            <tr key={t._id}>
                                <td>{new Date(t.date).toLocaleDateString()}</td>
                                <td>{t.description}</td>
                                <td>{t.category}</td>
                                <td>{t.type}</td>
                                <td style={{ color: t.type === "CREDIT" ? "green" : "red" }}>
                                    {t.type === "CREDIT" ? "+" : "-"} {account?.currency} {getAmount(t).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
