'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Text from './Text';
import Icon from './Icon';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  options,
  placeholder = 'Select an option',
  required = false,
  error,
  className = '',
  name,
  value,
  onChange,
  onBlur,
  ...props
}, ref) => {
  const selectId = `select-${name || label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`space-y-2 ${className}`}
    >
      <label htmlFor={selectId} className="block">
        <Text variant="body" weight="medium" className="mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </Text>
      </label>
      
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`
            w-full px-4 py-3 rounded-lg appearance-none
            bg-gray-800 border border-gray-700
            text-white
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
            transition-all duration-300
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${!value ? 'text-gray-400' : ''}
          `}
          {...props}
        >
          <option value="" disabled className="text-gray-400">
            {placeholder}
          </option>
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              className="text-white bg-gray-800"
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <Icon name="chevron-down" size={20} color="rgb(156, 163, 175)" />
        </div>
        
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

Select.displayName = 'Select';

export default Select;