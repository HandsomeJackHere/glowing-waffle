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

function loadItems() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (e) {
    console.error('Error loading budget data from localStorage:', e)
    return []
  }
}

export default function App() {
  const [items, setItems] = useState(() => loadItems())
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ desc: '', amount: '', type: 'expense' })

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      console.error('Error saving budget data to localStorage:', e)
    }
  }, [items])

  const resetForm = () => {
    setForm({ desc: '', amount: '', type: 'expense' })
    setEditingId(null)
  }

  const openAddModal = () => {
    resetForm()
    setOpen(true)
  }

  const openEditModal = (item) => {
    setForm({ desc: item.desc, amount: String(item.amount), type: item.type })
    setEditingId(item.id)
    setOpen(true)
  }

  const addItem = (e) => {
    e && e.preventDefault()
    const value = parseFloat(form.amount)
    if (!form.desc.trim() || Number.isNaN(value)) return

    if (editingId) {
      setItems(prev => prev.map(i => i.id === editingId ? { ...i, desc: form.desc.trim(), amount: value, type: form.type } : i))
    } else {
      setItems(prev => [{ id: uid(), desc: form.desc.trim(), amount: value, type: form.type, createdAt: Date.now() }, ...prev])
    }

    resetForm()
    setOpen(false)
  }

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id))
  const clearAll = () => setItems([])

  const income = useMemo(() => items.filter(i => i.type === 'income').reduce((s, i) => s + i.amount, 0), [items])
  const expense = useMemo(() => items.filter(i => i.type === 'expense').reduce((s, i) => s + i.amount, 0), [items])
  const balance = income - expense

  return (
    <div className="app-container min-h-screen">
      <GlassNavbar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <GlassCard className="p-6">
            <div className="text-sm text-slate-400">Balance</div>
            <div className="text-3xl font-bold mt-2">₹{balance.toFixed(2)}</div>
            <div className="flex gap-4 mt-4">
              <div className="text-sm text-slate-400">Income</div>
              <div className="text-sm font-semibold">₹{income.toFixed(2)}</div>
              <div className="text-sm text-slate-400">Expense</div>
              <div className="text-sm font-semibold">₹{expense.toFixed(2)}</div>
            </div>
            <div className="mt-6">
              <GlassButton onClick={() => setOpen(true)}>Add Entry</GlassButton>
            </div>
          </GlassCard>
        </div>

        <div className="md:col-span-2">
          <GlassCard className="p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="text-lg font-semibold">Entries</div>
              <GlassButton variant="ghost" onClick={clearAll} disabled={items.length === 0}>Clear All</GlassButton>
            </div>
            {items.length === 0 ? (
              <div className="text-slate-300">No entries yet.</div>
            ) : (
              <div className="overflow-auto max-h-[60vh] rounded-xl border border-slate-700 bg-[#0b111a] shadow-lg">
                <table className="w-full text-left text-sm table-fixed border-collapse">
                  <thead className="bg-[#111827] sticky top-0">
                    <tr>
                      <th className="px-3 py-2 font-semibold text-slate-300">Description</th>
                      <th className="px-3 py-2 font-semibold text-slate-300">Type</th>
                      <th className="px-3 py-2 font-semibold text-slate-300">Amount</th>
                      <th className="px-3 py-2 font-semibold text-slate-300">Created</th>
                      <th className="px-3 py-2 font-semibold text-slate-300 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id} className="border-t border-slate-700 hover:bg-slate-800/40">
                        <td className="px-3 py-2 text-slate-100">{item.desc}</td>
                        <td className="px-3 py-2"><span className={`px-2 py-1 rounded-full text-xs font-medium ${item.type === 'expense' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}`}>{item.type}</span></td>
                        <td className={`px-3 py-2 font-semibold ${item.type === 'expense' ? 'text-rose-300' : 'text-emerald-300'}`}>{item.type === 'expense' ? '-₹' : '+₹'}{Math.abs(item.amount).toFixed(2)}</td>
                        <td className="px-3 py-2 text-xs text-slate-400">{new Date(item.createdAt).toLocaleString()}</td>
                        <td className="px-3 py-2 text-right space-x-2">
                          <GlassButton variant="ghost" onClick={() => openEditModal(item)}>Edit</GlassButton>
                          <GlassButton variant="ghost" onClick={() => removeItem(item.id)}>Delete</GlassButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </GlassCard>
        </div>
      </div>

      <GlassModal isOpen={open} onClose={() => setOpen(false)}>
        <form onSubmit={addItem} className="space-y-4">
          <div>
            <label className="text-sm text-slate-400">Description</label>
            <input className="mt-2 w-full p-2 rounded-md bg-[#010409] border border-[#30363d]" value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input className="p-2 rounded-md bg-[#010409] border border-[#30363d]" placeholder="Amount (₹)" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
            <select className="p-2 rounded-md bg-[#010409] border border-[#30363d]" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <GlassButton variant="ghost" onClick={() => { resetForm(); setOpen(false) }} type="button">Cancel</GlassButton>
            <GlassButton type="submit">{editingId ? 'Save' : 'Add'}</GlassButton>
          </div>
        </form>
      </GlassModal>
    </div>
  )
}
