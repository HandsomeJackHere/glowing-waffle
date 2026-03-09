import React from 'react'
import { motion } from '@motionone/react'
import clsx from 'clsx'

export default function GlassButton({ children, variant = 'primary', className = '', ...props }) {
  const base = 'px-4 py-2 rounded-lg font-semibold transition focus:outline-none'
  const variants = {
    primary: 'bg-white/10 border border-white/20 text-white hover:shadow-lg',
    ghost: 'bg-transparent border border-white/10 text-white hover:bg-white/5'
  }
  return (
    <motion.button whileHover={{ scale: 1.03 }} className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </motion.button>
  )
}
