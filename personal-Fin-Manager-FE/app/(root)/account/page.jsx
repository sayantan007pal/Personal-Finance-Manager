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
    const [accounts, setAccounts] = useState(null);
    const [accountError, setAccountError] = useState(null);
    const fetchAccounts = async () => {
        try {
            const res = await api.get("/api/accounts");
            setAccounts(res.data.data || null);
        } catch (err) {
            console.log("Failed to fetch accounts", err.message);
            setAccountError("No account data available yet")
        }
    }
    useEffect(() => {
        fetchAccounts();
    }, []);

    const onSubmit = async () => {
        if (!form.accountType || !form.accountName || !form.accountNumber || !form.bankName || !form.currency || !form.balance) {
            toast.error("Please fill all fields");
            return;
        }
        try {
            setLoading(true);
            await api.post("/api/accounts", {
                accountType: form.accountType,
                accountName: form.accountName,
                accountNumber: form.accountNumber,
                bankName: form.bankName,
                currency: form.currency,
                balance: parseFloat(form.balance),
            });
            toast.success("Account added successfully");
            setForm({
                accountType: "",
                accountName: "",
                accountNumber: "",
                bankName: "",
                currency: "",
                balance: "",
            });
            fetchAccounts();
        } catch (err) {
            console.log("Failed to add account", err.message);
            toast.error("Failed to add account");
        } finally {
            setLoading(false);
        }
    };

    const getAmount = (account) => {
        const transactions = account.transactions || [];
        return transactions.reduce((total, txn) => {
            if (txn.type === "CREDIT") {
                return total + txn.amount;
            } else {
                return total - txn.amount;
            }
        }, 0);
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

            <hr />

                  {/* Account Info */}
      {accountError ? (
        <div>
          <h2>Account Info</h2>
          <p style={{ color: "gray", fontStyle: "italic" }}>{accountError}</p>
        </div>
      ) : accounts ? (
        <div>
          <h2>Account Info</h2>
          <p><strong>Bank:</strong> {accounts.bankName}</p>
          <p><strong>Account:</strong> {accounts.accountName} ({accounts.accountType})</p>
          <p><strong>Currency:</strong> {accounts.currency}</p>
          <p><strong>Last 4 Digits:</strong> {accounts.accountNumberLastFour}</p>
        </div>
      ) : (
        <div>
          <h2>Account Info</h2>
          <p style={{ color: "gray", fontStyle: "italic" }}>No account data available yet</p>
        </div>
      )}
        </div>


        
    )
  }