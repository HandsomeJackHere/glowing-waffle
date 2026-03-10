import React from 'react'
import clsx from 'clsx'

export default function GlassButton({ children, variant = 'primary', className = '', ...props }) {
  const base = 'px-4 py-2 rounded-lg font-semibold transition-transform duration-200 focus:outline-none'
  const variants = {
    primary: 'bg-white/10 border border-white/20 text-white hover:shadow-lg',
    ghost: 'bg-transparent border border-white/10 text-white hover:bg-white/5'
  }
  return (
    <button className={clsx(base, variants[variant], 'hover:scale-105', className)} {...props}>
      {children}
    </button>
  )
}
