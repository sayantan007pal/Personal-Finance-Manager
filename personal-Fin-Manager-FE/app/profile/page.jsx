"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";
import React from "react";


export default function ProfilePage(){

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const router = useRouter();
    const logout = async () => {
        try {
            const response = await api.get(`/api/users/logout`);
            toast.success("Logout successful!");
            router.push("/login");
        } catch (err) {
            console.log("Logout failed", err.message);
            toast.error("Logout failed");
        }
    }

    return (
        <div className="container">
            <h1>Profile Page</h1>
            <hr />
            <button
                onClick={logout}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
                Logout
            </button>

            <h1>Expense Tracker</h1>
            <div className="section">
                <h2>Income</h2>
                <div className="input-group">
                    <label htmlFor="income-description">Description</label>
                    <input type="text" id="income-description" placeholder="e.g. Salary" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" />
                </div>
                <div className="input-group">
                    <label htmlFor="income-amount">Amount (₦)</label>
                    <input type="number" id="income-amount" placeholder="e.g. 100000" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" />
                </div>
                <div className="button-group">
                    <button onClick={() => addIncome()}>Add Income</button>
                </div>
            </div>
            <div className="section">
                <h2>Expenses</h2>
                <div className="input-group">
                    <label htmlFor="expense-description">Description</label>
                    <input type="text" id="expense-description" placeholder="e.g. Rent" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" />
                </div>
                <div className="input-group">
                    <label htmlFor="expense-category">Category</label>
                    <select id="expense-category" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                        <option value="Housing">Housing</option>
                        <option value="Food">Food</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="expense-amount">Amount (₦)</label>
                    <input type="number" id="expense-amount" placeholder="e.g. 50000" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" />
                </div>
                <div className="button-group">
                    <button onClick={() => addExpense()}>Add Expense</button>
                </div>
            </div>
            <div className="table-container">
                <h2>Transaction History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Amount (₦)</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="transaction-history">
                        {/* Transactions will appear here */}
                    </tbody>
                </table>
            </div>
            <div className="summary">
                <h2>Budget Summary</h2>
                <p>Total Income: ₦<span id="total-income">0</span></p>
                <p>Total Expenses: ₦<span id="total-expenses">0</span></p>
                <p>Balance: ₦<span id="balance">0</span></p>
            </div>
            <div className="clear-button-group">
                <button onClick={() => clearAll()}>Clear All</button>
            </div>
        </div>
    );
}

