import React from 'react'
import clsx from 'clsx'

export default function GlassCard({ children, className = '', ...props }) {
  return (
    <div className={clsx('card p-6 card-body', className)} {...props}>
      {children}
    </div>
  )
}
