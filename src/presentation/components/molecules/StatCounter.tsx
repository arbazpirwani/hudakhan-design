'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Text from '@/src/presentation/components/atoms/Text';
import Icon, { IconName } from '@/src/presentation/components/atoms/Icon';

interface StatCounterProps {
  value: string;
  label: string;
  suffix?: string;
  icon?: IconName;
  delay?: number;
  className?: string;
}

const StatCounter: React.FC<StatCounterProps> = ({
  value,
  label,
  suffix = '',
  icon,
  delay = 0,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState('0');

  // Extract numeric value and suffix from the value string
  const parseValue = (val: string) => {
    const numericPart = val.replace(/[^0-9.]/g, '');
    const suffixPart = val.replace(/[0-9.]/g, '');
    return {
      numeric: parseFloat(numericPart) || 0,
      suffix: suffixPart || suffix
    };
  };

  const { numeric: targetValue } = parseValue(value);

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const duration = 2000; // 2 seconds
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = targetValue * easeOut;
        
        // Format the display value
        if (targetValue >= 1000000) {
          setDisplayValue((currentValue / 1000000).toFixed(1) + 'M');
        } else if (targetValue >= 1000) {
          setDisplayValue((currentValue / 1000).toFixed(1) + 'K');
        } else {
          setDisplayValue(Math.floor(currentValue).toString());
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value); // Set final value
        }
      };
      
      // Start animation after delay
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, delay);
    }
  }, [isInView, targetValue, value, delay]);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        delay: delay / 1000
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "backOut" as const,
        delay: (delay / 1000) + 0.2
      }
    }
  };

  const numberVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        delay: (delay / 1000) + 0.3
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`text-center ${className}`}
    >
      {/* Icon */}
      {icon && (
        <motion.div
          variants={iconVariants}
          className="mb-4 flex justify-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Icon name={icon} size={32} color="white" />
          </div>
        </motion.div>
      )}

      {/* Counter Value */}
      <motion.div
        variants={numberVariants}
        className="mb-2"
      >
        <Text
          variant="h3"
          weight="bold"
          color="gradient"
          className="font-mono"
        >
          {displayValue}
        </Text>
      </motion.div>

      {/* Label */}
      <Text
        variant="body"
        color="secondary"
        weight="medium"
        className="uppercase tracking-wider"
      >
        {label}
      </Text>

      {/* Decorative line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: (delay / 1000) + 0.5
        }}
        viewport={{ once: true }}
        className="mx-auto mt-3 h-0.5 bg-gradient-to-r from-transparent via-dynamic-accent to-transparent max-w-20"
      />
    </motion.div>
  );
};

export default StatCounter;