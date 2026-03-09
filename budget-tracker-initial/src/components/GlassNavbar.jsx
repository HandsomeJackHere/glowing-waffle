import React from 'react'
import GlassCard from './GlassCard'

export default function GlassNavbar({ title = 'buget palnner local' }) {
  return (
    <div className="mb-6">
      <GlassCard className="p-4 flex items-center justify-between">
        <div>
          <div className="text-lg font-bold">{title}</div>
          <div className="text-sm text-white/70">Local, private, and beautiful</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-white/60">Dark</div>
        </div>
      </GlassCard>
    </div>
  )
}
