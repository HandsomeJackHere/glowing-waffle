import React from 'react'
import { motion } from '@motionone/react'
import GlassCard from './GlassCard'

export default function GlassModal({ isOpen, onClose, children }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, transform: 'scale(0.98)' }}
        animate={{ opacity: 1, transform: 'scale(1)' }}
        transition={{ duration: 0.22 }}
        className="relative w-full max-w-xl p-6"
      >
        <GlassCard className="p-6">{children}</GlassCard>
      </motion.div>
    </div>
  )
}
