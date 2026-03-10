import React from 'react'
import clsx from 'clsx'

export default function GlassButton({ children, variant = 'primary', className = '', ...props }) {
  const base = 'px-4 py-2 rounded-md font-semibold transition duration-150 focus:outline-none'
  const variants = {
    primary: 'btn-primary',
    ghost: 'btn-ghost'
  }
  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}
