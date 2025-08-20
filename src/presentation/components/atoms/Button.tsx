'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import AnimationController from '@/src/presentation/utils/animations';
import { useTheme } from '@/src/presentation/hooks/useTheme';
import { useStrings } from '@/src/presentation/hooks/useStrings';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  disabled?: boolean;
  magnetic?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  external = false,
  disabled = false,
  magnetic = false,
  icon,
  iconPosition = 'right',
  type = 'button',
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (buttonRef.current && !disabled) {
      if (magnetic) {
        AnimationController.magneticEffect(buttonRef.current as HTMLElement, 0.3);
      } else {
        AnimationController.buttonHover(buttonRef.current as HTMLElement);
      }
    }
  }, [magnetic, disabled]);

  const baseClasses = `
    relative inline-flex items-center justify-center
    font-semibold transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    overflow-hidden group
  `;

  const variantClasses = {
    primary: `
      bg-dynamic-gradient-primary text-dynamic-text-primary
      hover:opacity-90
      focus:ring-dynamic-accent
    `,
    secondary: `
      bg-dynamic-background-secondary border border-dynamic-border
      text-dynamic-text-primary hover:bg-dynamic-background-tertiary
      hover:border-dynamic-accent
      focus:ring-dynamic-accent
    `,
    ghost: `
      text-dynamic-text-secondary hover:text-dynamic-accent
      focus:ring-dynamic-accent
    `
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-full',
    lg: 'px-8 py-4 text-lg rounded-full'
  };

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `;

  const buttonContent = (
    <>
      <span className="btn-bg absolute inset-0 bg-gradient-to-r from-dynamic-accent to-dynamic-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="btn-text relative flex items-center gap-2">
        {icon && iconPosition === 'left' && (
          <span className="transition-transform duration-300 group-hover:scale-110">
            {icon}
          </span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
    </>
  );

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 }
  };

  if (href && !disabled) {
    const linkProps = external 
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
      
    // Use Next.js Link for internal navigation, regular anchor for external
    if (external) {
      return (
        <motion.a
          ref={buttonRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...linkProps}
          {...motionProps}
          {...props}
        >
          {buttonContent}
        </motion.a>
      );
    }
    
    return (
      <NextLink href={href} passHref legacyBehavior>
        <motion.a
          ref={buttonRef as React.RefObject<HTMLAnchorElement>}
          className={classes}
          {...motionProps}
          {...props}
        >
          {buttonContent}
        </motion.a>
      </NextLink>
    );
  }

  return (
    <motion.button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={classes}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
};

export default Button;