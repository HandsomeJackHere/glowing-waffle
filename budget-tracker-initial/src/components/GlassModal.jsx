import React from 'react'
import GlassCard from './GlassCard'

export default function GlassModal({ isOpen, onClose, children }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-xl p-6">
        <div className="card p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
