'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Text from './Text';

interface InputProps {
  label: string;
  type?: 'text' | 'email' | 'tel' | 'url';
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  type = 'text',
  placeholder,
  required = false,
  error,
  className = '',
  name,
  value,
  onChange,
  onBlur,
  ...props
}, ref) => {
  const inputId = `input-${name || label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`space-y-2 ${className}`}
    >
      <label htmlFor={inputId} className="block">
        <Text variant="body" weight="medium" className="mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </Text>
      </label>
      
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`
            w-full px-4 py-3 rounded-xl
            bg-dynamic-background-secondary border border-dynamic-border
            text-dynamic-text-primary placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-dynamic-accent focus:border-transparent
            transition-all duration-300
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
          `}
          {...props}
        />
        
        {/* Focus animation */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={false}
          animate={{
            boxShadow: error 
              ? '0 0 0 2px rgba(239, 68, 68, 0.2)'
              : '0 0 0 0px rgba(139, 92, 246, 0)'
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Text variant="caption" className="text-red-400">
            {error}
          </Text>
        </motion.div>
      )}
    </motion.div>
  );
});

Input.displayName = 'Input';

export default Input;