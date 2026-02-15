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
  const [profileError, setProfileError] = useState(null)
  const [transactionsError, setTransactionsError] = useState(null)
  const [accountError, setAccountError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      // Fetch profile — this is critical, so if it fails we show an error
      try {
        const profileRes = await api.get('/api/users/profile')
        setName(profileRes.data.name)
        setEmail(profileRes.data.email)
        setUsername(profileRes.data.username)
      } catch (err) {
        console.log("Failed to fetch profile", err.message)
        setProfileError("Failed to load profile data")
      }

      // Fetch transactions — gracefully handle if none exist
      try {
        const transactionsRes = await api.get('/api/transactions')
        setTransactions(transactionsRes.data.data || [])
      } catch (err) {
        console.log("Failed to fetch transactions", err.message)
        setTransactionsError("No transactions data available yet")
      }

      // Fetch account — gracefully handle if none exist
      try {
        const budgetsRes = await api.get('/api/accounts')
        setAccount(budgetsRes.data.data || null)
      } catch (err) {
        console.log("Failed to fetch account", err.message)
        setAccountError("No account data available yet")
      }

      setLoading(false)
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
  if (profileError) return <p>{profileError}</p>

  return (
    <div>
      <h1>Finance Dashboard</h1>
      <p>Welcome back, {name}</p>
      <p>Email: {email}</p>
      <p>Username: {username}</p>

      <hr />

      {/* Account Info */}
      {accountError ? (
        <div>
          <h2>Account Info</h2>
          <p style={{ color: "gray", fontStyle: "italic" }}>{accountError}</p>
        </div>
      ) : account ? (
        <div>
          <h2>Account Info</h2>
          <p><strong>Bank:</strong> {account.bankName}</p>
          <p><strong>Account:</strong> {account.accountName} ({account.accountType})</p>
          <p><strong>Currency:</strong> {account.currency}</p>
          <p><strong>Last 4 Digits:</strong> {account.accountNumberLastFour}</p>
        </div>
      ) : (
        <div>
          <h2>Account Info</h2>
          <p style={{ color: "gray", fontStyle: "italic" }}>No account data available yet</p>
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
      {transactionsError ? (
        <p style={{ color: "gray", fontStyle: "italic" }}>{transactionsError}</p>
      ) : transactions.length === 0 ? (
        <p style={{ color: "gray", fontStyle: "italic" }}>No transactions available yet</p>
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
      )}
    </div>
  )
}

export default Profile
