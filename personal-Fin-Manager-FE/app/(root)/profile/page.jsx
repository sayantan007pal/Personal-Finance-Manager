'use client'
import React, { useState, useEffect } from 'react'
import api from '@/lib/api'

const Profile = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [transactions, setTransactions] = useState([])
  const [account, setAccount] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const profileRes = await api.get('/api/users/profile')
        setName(profileRes.data.name)
        setEmail(profileRes.data.email)
        setUsername(profileRes.data.username)

        const transactionsRes = await api.get('/api/transactions')
        setTransactions(transactionsRes.data.data)

        const budgetsRes = await api.get('/api/accounts')
        setAccount(budgetsRes.data.data)
      } catch (err) {
        console.log("Failed to fetch data", err.message)
        setError("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getAmount = (t) => parseFloat(t.amount?.$numberDecimal || t.amount || 0)

  const totalIncome = transactions
    .filter(t => t.type === "CREDIT")
    .reduce((sum, t) => sum + getAmount(t), 0)

  const totalExpenses = transactions
    .filter(t => t.type === "DEBIT")
    .reduce((sum, t) => sum + getAmount(t), 0)

  const balance = account ? parseFloat(account.balance?.$numberDecimal || account.balance || 0) : 0

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>Finance Dashboard</h1>
      <p>Welcome back, {name}</p>
      <p>Email: {email}</p>
      <p>Username: {username}</p>

      <hr />

      {/* Account Info */}
      {account && (
        <div>
          <h2>Account Info</h2>
          <p><strong>Bank:</strong> {account.bankName}</p>
          <p><strong>Account:</strong> {account.accountName} ({account.accountType})</p>
          <p><strong>Currency:</strong> {account.currency}</p>
          <p><strong>Last 4 Digits:</strong> {account.accountNumberLastFour}</p>
        </div>
      )}

      <hr />

      {/* Summary Cards */}
      <div>
        <div>
          <h3>Total Income</h3>
          <p style={{ color: "green", fontSize: "24px" }}>
            {account?.currency || "$"} {totalIncome.toFixed(2)}
          </p>
        </div>

        <div>
          <h3>Total Expenses</h3>
          <p style={{ color: "red", fontSize: "24px" }}>
            {account?.currency || "$"} {totalExpenses.toFixed(2)}
          </p>
        </div>

        <div>
          <h3>Balance</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {account?.currency || "$"} {balance.toFixed(2)}
          </p>
        </div>
      </div>

      <hr />

      {/* Recent Transactions */}
      <h2>Recent Transactions</h2>
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
          {transactions.map(t => (
            <tr key={t._id}>
              <td>{new Date(t.date).toLocaleDateString()}</td>
              <td>{t.description}</td>
              <td>{t.category}</td>
              <td>{t.type}</td>
              <td style={{ color: t.type === "CREDIT" ? "green" : "red" }}>
                {t.type === "CREDIT" ? "+" : "-"}{account?.currency || "$"} {getAmount(t).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Profile
