'use client'
import React, { useState, useEffect } from 'react'
import api from '@/lib/api'

const Profile = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [transactions, setTransactions] = useState([])
  const [budgets, setBudgets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const profileRes = await api.get('/api/users/profile')
        setName(profileRes.data.name)
        setEmail(profileRes.data.email)

        // const transactionsRes = await api.get('/api/transactions')
        // setTransactions(transactionsRes.data)

        // const budgetsRes = await api.get('/api/budgets')
        // setBudgets(budgetsRes.data)
      } catch (err) {
        console.log("Failed to fetch data", err.message)
        setError("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const balance = totalIncome - totalExpenses

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>Finance Dashboard</h1>
      <p>Welcome back, {name}</p>
      <p>Email: {email}</p>

      <hr />

      {/* Summary Cards */}
      <div>
        <div>
          <h3>Total Income</h3>
          <p style={{ color: "green", fontSize: "24px" }}>
            ${totalIncome.toFixed(2)}
          </p>
        </div>

        <div>
          <h3>Total Expenses</h3>
          <p style={{ color: "red", fontSize: "24px" }}>
            ${totalExpenses.toFixed(2)}
          </p>
        </div>

        <div>
          <h3>Balance</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            ${balance.toFixed(2)}
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
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.description}</td>
              <td style={{ color: t.amount > 0 ? "green" : "red" }}>
                {t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      {/* Budget Section */}
      <h2>Budget Overview</h2>
      {budgets.map((b, index) => (
        <div key={index} style={{ marginBottom: "12px" }}>
          <p>
            <strong>{b.category}</strong> — ${b.spent.toFixed(2)} / ${b.limit.toFixed(2)}
          </p>
          <progress value={b.spent} max={b.limit}></progress>
          {b.spent > b.limit && (
            <span style={{ color: "red" }}> Over budget!</span>
          )}
        </div>
      ))}
    </div>
  )
}

export default Profile
