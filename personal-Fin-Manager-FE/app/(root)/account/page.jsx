"use client";
import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

const ACCOUNT_TYPE = ["SAVINGS", "CURRENT", "CREDIT_CARD", "LOAN", "OTHER"]
const CURRENCY = ["USD", "INR", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "HKD", "NZD", "SEK", "NOK", "DKK", "BRL", "MXN", "ZAR", "TRY", "RUB", "SGD", "AED"]

  export default function AccountPage() {
    const [form, setForm] = useState({
        accountType: "",
        accountName: "",
        accountNumber: "",
        bankName: "",
        currency: "",
        balance: "",
    });

    const [loading, setLoading] = useState(false);
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const payload = {
                name: form.accountName,
                accountName: form.accountName,
                accountType: form.accountType,
                accountNumberLastFour: form.accountNumber.slice(-4),
                bankName: form.bankName,
                currency: form.currency,
                balance: form.balance,
                linkedAt: new Date().toISOString(),
            };
            await api.post("/api/accounts", payload);
            toast.success("Account added successfully");
            setForm({ accountType: "", accountName: "", accountNumber: "", bankName: "", currency: "", balance: "" });
        } catch (err) {
            console.log("Failed to add account", err.message);
            toast.error(err.response?.data?.message || "Failed to add account");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <h1>Account</h1>
            <hr />
            <form onSubmit={onSubmit}>
                <label htmlFor="accountType">Account Type</label>
                <br />
                <select
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    id="accountType"
                    value={form.accountType}
                    onChange={(e) => setForm({ ...form, accountType: e.target.value })}
                >
                    <option value="">-- Select Account Type --</option>
                    {ACCOUNT_TYPE.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                <br />
                <label htmlFor="accountName">Account Name</label>
                <br />
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    type="text"
                    id="accountName"
                    value={form.accountName}
                    onChange={(e) => setForm({ ...form, accountName: e.target.value })}
                    placeholder="Enter account name"
                />
                <br />
                <label htmlFor="accountNumber">Account Number</label>
                <br />
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    type="text"
                    id="accountNumber"
                    value={form.accountNumber}
                    onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
                    placeholder="Enter account number"
                />
                <br />
                <label htmlFor="bankName">Bank Name</label>
                <br />
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    type="text"
                    id="bankName"
                    value={form.bankName}
                    onChange={(e) => setForm({ ...form, bankName: e.target.value })}
                    placeholder="Enter bank name"
                />
                <br />
                <label htmlFor="currency">Currency</label>
                <br />
                <select
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    id="currency"
                    value={form.currency}
                    onChange={(e) => setForm({ ...form, currency: e.target.value })}
                >
                    <option value="">-- Select Currency --</option>
                    {CURRENCY.map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
                <br />
                <label htmlFor="balance">Balance</label>
                <br />
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    type="text"
                    id="balance"
                    value={form.balance}
                    onChange={(e) => setForm({ ...form, balance: e.target.value })}
                    placeholder="Enter balance"
                />
                <br />
                <button
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    onClick={onSubmit}
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Account"}
                </button>
            </form>
        </div>
    )
  }