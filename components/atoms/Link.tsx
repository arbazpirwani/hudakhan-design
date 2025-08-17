'use client';

import React from 'react';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import Icon, { IconName } from './Icon';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'default' | 'nav' | 'footer' | 'inline' | 'button';
  external?: boolean;
  className?: string;
  underline?: boolean;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  animated?: boolean;
  onClick?: () => void;
}

const Link: React.FC<LinkProps> = ({
  href,
  children,
  variant = 'default',
  external = false,
  className = '',
  underline = false,
  icon,
  iconPosition = 'right',
  animated = true,
  onClick,
  ...props
}) => {
  const baseClasses = `
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
    focus:ring-offset-gray-900 rounded-sm
  `;

  const variantClasses = {
    default: `
      text-white hover:text-purple-400
      ${underline ? 'border-b border-transparent hover:border-purple-400' : ''}
    `,
    nav: `
      text-gray-300 hover:text-white
      relative py-2
      after:content-[''] after:absolute after:bottom-0 after:left-0
      after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-purple-500 after:to-pink-500
      after:transition-all after:duration-300
      hover:after:w-full
    `,
    footer: `
      text-gray-400 hover:text-white
      text-sm
    `,
    inline: `
      text-purple-400 hover:text-purple-300
      underline decoration-purple-400/50 hover:decoration-purple-300
      underline-offset-2
    `,
    button: `
      inline-flex items-center justify-center
      px-4 py-2 rounded-lg
      bg-transparent border border-gray-600
      text-white hover:border-purple-500 hover:bg-purple-500/10
    `
  };

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${className}
  `;

  const linkVariants = {
    initial: { opacity: 1 },
    hover: { 
      opacity: 0.8,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  const iconVariants = {
    initial: { x: 0 },
    hover: { 
      x: iconPosition === 'right' ? 4 : -4,
      transition: { duration: 0.2 }
    }
  };

  const underlineVariants = {
    initial: { width: '0%' },
    hover: { 
      width: '100%',
      transition: { duration: 0.3 }
    }
  };

  const linkContent = (
    <span className="flex items-center gap-2">
      {icon && iconPosition === 'left' && (
        <motion.span
          variants={animated ? iconVariants : {}}
          className="flex-shrink-0"
        >
          <Icon name={icon} size={16} />
        </motion.span>
      )}
      <span className="relative">
        {children}
        {underline && variant === 'default' && (
          <motion.span
            variants={animated ? underlineVariants : {}}
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
          />
        )}
      </span>
      {icon && iconPosition === 'right' && (
        <motion.span
          variants={animated ? iconVariants : {}}
          className="flex-shrink-0"
        >
          <Icon name={icon} size={16} />
        </motion.span>
      )}
    </span>
  );

  const motionProps = animated ? {
    variants: linkVariants,
    initial: "initial",
    whileHover: "hover",
    whileTap: "tap"
  } : {};

  // External link
  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
        {...motionProps}
        {...props}
      >
        {linkContent}
      </motion.a>
    );
  }

  // Internal link
  return (
    <NextLink href={href} passHref legacyBehavior>
      <motion.a
        className={classes}
        onClick={onClick}
        {...motionProps}
        {...props}
      >
        {linkContent}
      </motion.a>
    </NextLink>
  );
};

export default Link;