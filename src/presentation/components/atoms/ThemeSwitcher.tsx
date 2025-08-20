'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/src/presentation/hooks/useTheme';
import { useStrings } from '@/presentation/hooks/useStrings';
import Icon from './Icon';

interface ThemeSwitcherProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
  className = '', 
  size = 'md',
  showLabel = false 
}) => {
  const { mode, toggleTheme, isDark } = useTheme();
  const { t } = useStrings();

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <motion.button
        onClick={toggleTheme}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className={`
          ${sizeClasses[size]}
          relative flex items-center justify-center
          rounded-xl bg-dynamic-background-secondary/50 hover:bg-dynamic-background-tertiary/50
          border border-dynamic-border hover:border-dynamic-accent
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-dynamic-accent focus:ring-offset-2
        `}
        aria-label={t('accessibility.toggleTheme')}
        title={`Toggle theme (${isDark ? 'Light' : 'Dark'} mode)`}
      >
        <motion.div
          initial={false}
          animate={{ 
            rotate: isDark ? 0 : 180,
            scale: isDark ? 1 : 0.8
          }}
          transition={{ 
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          <Icon 
            name={isDark ? 'moon' : 'sun'} 
            size={iconSizes[size]}
            className={isDark ? 'text-blue-400' : 'text-yellow-400'}
          />
        </motion.div>
        
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-dynamic-gradient-primary opacity-20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.button>
      
      {showLabel && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm text-dynamic-text-secondary font-medium"
        >
          {isDark ? 'Dark' : 'Light'} Mode
        </motion.span>
      )}
    </div>
  );
};

export default ThemeSwitcher;