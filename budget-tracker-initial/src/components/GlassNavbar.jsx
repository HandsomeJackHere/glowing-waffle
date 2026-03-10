import React from 'react'
import GlassCard from './GlassCard'

export default function GlassNavbar({ title = 'buget palnner local' }) {
  return (
    <div className="mb-6">
      <div className="navbar card p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <div className="text-lg font-bold">{title}</div>
            <div className="text-sm text-slate-400">Local, private, and simple</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-400">Dark</div>
          </div>
        </div>
      </div>
    </div>
  )
}
