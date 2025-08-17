'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Text from './Text';

interface TextareaProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
  name?: string;
  value?: string;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  placeholder,
  required = false,
  error,
  className = '',
  name,
  value,
  rows = 4,
  onChange,
  onBlur,
  ...props
}, ref) => {
  const textareaId = `textarea-${name || label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`space-y-2 ${className}`}
    >
      <label htmlFor={textareaId} className="block">
        <Text variant="body" weight="medium" className="mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </Text>
      </label>
      
      <div className="relative">
        <textarea
          ref={ref}
          id={textareaId}
          name={name}
          placeholder={placeholder}
          value={value}
          rows={rows}
          onChange={onChange}
          onBlur={onBlur}
          className={`
            w-full px-4 py-3 rounded-lg resize-none
            bg-gray-800 border border-gray-700
            text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
            transition-all duration-300
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
          `}
          {...props}
        />
        
        {/* Focus animation */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
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

Textarea.displayName = 'Textarea';

export default Textarea;