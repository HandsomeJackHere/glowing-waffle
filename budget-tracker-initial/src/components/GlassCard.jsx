import React from 'react'
import clsx from 'clsx'

export default function GlassCard({ children, className = '', ...props }) {
  return (
    <div className={clsx('glass-base glass-glow floating p-6 transition-transform duration-300 hover:scale-[1.02]', className)} {...props}>
      {children}
    </div>
  )
}
