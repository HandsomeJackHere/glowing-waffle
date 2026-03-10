import React from 'react'
import GlassCard from './GlassCard'

export default function GlassModal({ isOpen, onClose, children }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl p-6 transition-transform duration-200 scale-100">
        <GlassCard className="p-6">{children}</GlassCard>
      </div>
    </div>
  )
}
