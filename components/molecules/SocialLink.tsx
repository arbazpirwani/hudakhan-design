'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Icon, { IconName } from '@/components/atoms/Icon';

interface SocialLinkProps {
  href: string;
  icon: IconName;
  label: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'filled';
}

const SocialLink: React.FC<SocialLinkProps> = ({
  href,
  icon,
  label,
  className = '',
  size = 'md',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const variantClasses = {
    default: `
      border-2 border-gray-600 hover:border-purple-500
      bg-transparent hover:bg-purple-500/10
    `,
    minimal: `
      border-none bg-transparent
      hover:bg-gray-800
    `,
    filled: `
      border-none bg-gray-800 hover:bg-purple-500
    `
  };

  const linkVariants = {
    initial: { 
      scale: 1,
      rotate: 0
    },
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 17
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const iconVariants = {
    initial: { 
      rotate: 0,
      color: "rgb(156, 163, 175)" // gray-400
    },
    hover: { 
      rotate: -5,
      color: "rgb(255, 255, 255)", // white
      transition: {
        duration: 0.2
      }
    }
  };

  const tooltipVariants = {
    initial: { 
      opacity: 0,
      y: 10,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.div className="relative group">
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        variants={linkVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className={`
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          flex items-center justify-center rounded-full
          transition-all duration-300 ease-out
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
          ${className}
        `}
        aria-label={label}
      >
        <motion.div variants={iconVariants}>
          <Icon 
            name={icon} 
            size={iconSizes[size]}
            className="transition-colors duration-300"
          />
        </motion.div>
      </motion.a>

      {/* Tooltip */}
      <motion.div
        variants={tooltipVariants}
        initial="initial"
        whileHover="visible"
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 pointer-events-none"
      >
        <div className="bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded whitespace-nowrap border border-gray-700">
          {label}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SocialLink;