import React from 'react'
import { motion } from '@motionone/react'
import clsx from 'clsx'

export default function GlassCard({ children, className = '', ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateY(6px)' }}
      animate={{ opacity: 1, transform: 'translateY(0px)' }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.36 }}
      className={clsx('glass-base glass-glow floating p-6', className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
