import React, { useEffect, useMemo, useState } from 'react'
import './index.css'
import GlassNavbar from './components/GlassNavbar'
import GlassCard from './components/GlassCard'
import GlassButton from './components/GlassButton'
import GlassModal from './components/GlassModal'

const STORAGE_KEY = 'budget_entries_v1'

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

export default function App() {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ desc: '', amount: '', type: 'expense' })

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
    e && e.preventDefault()
    const value = parseFloat(form.amount)
    if (!form.desc.trim() || Number.isNaN(value)) return
    setItems([{ id: uid(), desc: form.desc.trim(), amount: value, type: form.type, createdAt: Date.now() }, ...items])
    setForm({ desc: '', amount: '', type: 'expense' })
    setOpen(false)
  }

  const removeItem = (id) => setItems(items.filter(i => i.id !== id))

  const income = useMemo(() => items.filter(i => i.type === 'income').reduce((s, i) => s + i.amount, 0), [items])
  const expense = useMemo(() => items.filter(i => i.type === 'expense').reduce((s, i) => s + i.amount, 0), [items])
  const balance = income - expense

  return (
    <div className="p-6 min-h-screen">
      <GlassNavbar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <GlassCard className="p-6">
            <div className="text-sm text-white/70">Balance</div>
            <div className="text-3xl font-bold mt-2">₹{balance.toFixed(2)}</div>
            <div className="flex gap-4 mt-4">
              <div className="text-sm text-white/70">Income</div>
              <div className="text-sm font-semibold">₹{income.toFixed(2)}</div>
              <div className="text-sm text-white/70">Expense</div>
              <div className="text-sm font-semibold">₹{expense.toFixed(2)}</div>
            </div>
            <div className="mt-6">
              <GlassButton onClick={() => setOpen(true)}>Add Entry</GlassButton>
            </div>
          </GlassCard>
        </div>

        <div className="md:col-span-2">
          <GlassCard className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold">Entries</div>
            </div>
            <div className="space-y-3 max-h-[60vh] overflow-auto">
              {items.length === 0 && <div className="text-white/60">No entries yet.</div>}
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 rounded-lg bg-white/2">
                  <div>
                    <div className="font-semibold">{item.desc}</div>
                    <div className="text-xs text-white/60">{new Date(item.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`font-bold ${item.type === 'expense' ? 'text-rose-300' : 'text-emerald-300'}`}>{item.type === 'expense' ? '-₹' : '+₹'}{Math.abs(item.amount).toFixed(2)}</div>
                    <GlassButton variant="ghost" onClick={() => removeItem(item.id)}>Remove</GlassButton>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      <GlassModal isOpen={open} onClose={() => setOpen(false)}>
        <form onSubmit={addItem} className="space-y-4">
          <div>
            <label className="text-sm text-white/70">Description</label>
            <input className="mt-2 w-full p-2 rounded-lg bg-white/5" value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input className="p-2 rounded-lg bg-white/5" placeholder="Amount (₹)" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
            <select className="p-2 rounded-lg bg-white/5" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <GlassButton variant="ghost" onClick={() => setOpen(false)} type="button">Cancel</GlassButton>
            <GlassButton type="submit">Add</GlassButton>
          </div>
        </form>
      </GlassModal>
    </div>
  )
}
