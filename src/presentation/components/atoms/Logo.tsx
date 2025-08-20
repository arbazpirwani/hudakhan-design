'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  animated = true,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.6
      }
    }
  };

  const LogoContent = () => (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <motion.div
        variants={animated ? logoVariants : {}}
        initial={animated ? "initial" : false}
        animate={animated ? "animate" : false}
        whileHover={animated ? "hover" : {}}
        className="relative"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-dynamic-accent to-dynamic-accent-secondary rounded-xl flex items-center justify-center">
          <motion.div
            animate={animated ? { rotate: 360 } : {}}
            transition={animated ? { duration: 20, repeat: Infinity, ease: "linear" } : {}}
            className="w-6 h-6"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-dynamic-text-primary"
            >
              <path
                d="M12 2L13.09 8.26L19 7L14.74 12L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12L5 7L10.91 8.26L12 2Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Logo Text */}
      <motion.div
        variants={animated ? textVariants : {}}
        initial={animated ? "initial" : false}
        animate={animated ? "animate" : false}
        className={`font-display font-bold ${sizeClasses[size]} text-dynamic-text-primary`}
      >
        <span className="text-gradient">Huda</span>
        <span className="text-dynamic-text-primary ml-1">Khan</span>
      </motion.div>
    </div>
  );

  return (
    <Link href="/" className="block">
      <LogoContent />
    </Link>
  );
};

export default Logo;