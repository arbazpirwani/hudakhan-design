'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'overline';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'accent' | 'gradient';
  align?: 'left' | 'center' | 'right';
  className?: string;
  animated?: boolean;
  delay?: number;
  as?: React.ElementType;
}

const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  weight = 'normal',
  color = 'primary',
  align = 'left',
  className = '',
  animated = false,
  delay = 0,
  as,
  ...props
}) => {
  const variantClasses = {
    h1: 'text-6xl md:text-7xl lg:text-8xl font-display',
    h2: 'text-4xl md:text-5xl lg:text-6xl font-display',
    h3: 'text-3xl md:text-4xl lg:text-5xl font-display',
    h4: 'text-2xl md:text-3xl lg:text-4xl font-display',
    h5: 'text-xl md:text-2xl lg:text-3xl font-display',
    h6: 'text-lg md:text-xl lg:text-2xl font-display',
    body: 'text-base md:text-lg',
    caption: 'text-sm md:text-base',
    overline: 'text-xs md:text-sm uppercase tracking-wider font-medium'
  };

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const colorClasses = {
    primary: 'text-white',
    secondary: 'text-gray-300',
    accent: 'text-purple-400',
    gradient: 'text-gradient'
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const classes = `
    ${variantClasses[variant]}
    ${weightClasses[weight]}
    ${colorClasses[color]}
    ${alignClasses[align]}
    ${className}
  `;

  // Determine the HTML element to render
  const Component = as || (variant.startsWith('h') ? variant : 'p');

  const textVariants = {
    hidden: {
      opacity: 0,
      y: variant.startsWith('h') ? 30 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        delay
      }
    }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  };

  // Split text for letter animation on headings
  const shouldSplitText = animated && variant.startsWith('h') && typeof children === 'string';

  if (animated) {
    if (shouldSplitText) {
      return (
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
          className={classes}
          {...props}
        >
          {(children as string).split('').map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
              style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      );
    }

    return React.createElement(
      motion.div,
      {
        variants: textVariants,
        initial: "hidden",
        animate: "visible",
        className: classes,
        ...props
      },
      children
    );
  }

  return React.createElement(
    Component,
    {
      className: classes,
      ...props
    },
    children
  );
};

export default Text;