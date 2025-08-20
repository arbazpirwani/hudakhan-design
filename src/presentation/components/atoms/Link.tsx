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
    focus:outline-none focus:ring-2 focus:ring-dynamic-accent focus:ring-offset-2
    focus:ring-offset-gray-900 rounded
  `;

  const variantClasses = {
    default: `
      text-dynamic-text-primary hover:text-dynamic-accent
      ${underline ? 'border-b border-transparent hover:border-dynamic-accent' : ''}
    `,
    nav: `
      text-dynamic-text-secondary hover:text-dynamic-text-primary
      relative py-2
      after:content-[''] after:absolute after:bottom-0 after:left-0
      after:w-0 after:h-0.5 after:bg-dynamic-gradient-primary
      after:transition-all after:duration-300
      hover:after:w-full
    `,
    footer: `
      text-dynamic-text-muted hover:text-dynamic-text-primary
      text-sm
    `,
    inline: `
      text-dynamic-accent hover:text-dynamic-text-primary
      underline decoration-dynamic-accent/50 hover:decoration-dynamic-text-primary
      underline-offset-2
    `,
    button: `
      inline-flex items-center justify-center
      px-4 py-2 rounded-xl
      bg-transparent border border-dynamic-border
      text-dynamic-text-primary hover:border-dynamic-accent hover:bg-dynamic-accent/10
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
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-dynamic-accent to-dynamic-accent-secondary"
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