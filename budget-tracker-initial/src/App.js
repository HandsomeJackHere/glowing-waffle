import React, { useEffect, useMemo, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'budget_entries_v1'

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

export default function App() {
  const [items, setItems] = useState([])
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (e) => {
    e.preventDefault()
    const value = parseFloat(amount)
    if (!desc.trim() || Number.isNaN(value)) return
    setItems([{ id: uid(), desc: desc.trim(), amount: value, type, createdAt: Date.now() }, ...items])
    setDesc('')
    setAmount('')
  }

  const removeItem = (id) => setItems(items.filter(i => i.id !== id))

  const clearAll = () => {
    if (window.confirm('Clear all entries?')) setItems([])
  }

  const income = useMemo(() => items.filter(i => i.type === 'income').reduce((s, i) => s + i.amount, 0), [items])
  const expense = useMemo(() => items.filter(i => i.type === 'expense').reduce((s, i) => s + i.amount, 0), [items])
  const balance = income - expense

  return (
    <div className="app-bg">
      <div className="container">
        <header className="header">
          <h1>buget palnner local</h1>
          <p className="subtitle">Beautifully simple budgeting — stored locally</p>
        </header>

        <main className="grid">
          <section className="card stats">
            <div className="balance">
              <div>
                <div className="label">Balance</div>
                <div className="value">₹{balance.toFixed(2)}</div>
              </div>
              <div className="mini">
                <div className="inc">Income<br/><strong>₹{income.toFixed(2)}</strong></div>
                <div className="exp">Expense<br/><strong>₹{expense.toFixed(2)}</strong></div>
              </div>
            </div>
            <div className="progress">
              <div className="bar" style={{width: `${Math.min(100, Math.abs(balance) / (Math.max(1, income + expense)) * 100)}%`}}></div>
            </div>
            <div className="actions">
              <button className="btn ghost" onClick={() => { setItems([]); localStorage.removeItem(STORAGE_KEY) }}>Reset Storage</button>
              <button className="btn" onClick={clearAll}>Clear Entries</button>
            </div>
          </section>

          <section className="card form">
            <form onSubmit={addItem} className="entry-form">
              <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
              <div className="row">
                <input placeholder="Amount (₹)" value={amount} onChange={e => setAmount(e.target.value)} />
                <select value={type} onChange={e => setType(e.target.value)}>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div className="row right">
                <button className="btn primary" type="submit">Add</button>
              </div>
            </form>
            <div className="list">
              {items.length === 0 && <div className="empty">No entries yet — add your first one.</div>}
              {items.map(item => (
                <div key={item.id} className={`item ${item.type}`}>
                  <div>
                    <div className="i-desc">{item.desc}</div>
                    <div className="i-date">{new Date(item.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="i-right">
                    <div className="i-amount">{item.type === 'expense' ? '-₹' : '+₹'}{Math.abs(item.amount).toFixed(2)}</div>
                    <button className="btn tiny" onClick={() => removeItem(item.id)}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="footer">Data stored only in your browser's <strong>localStorage</strong>.</footer>
      </div>
    </div>
  )
}
