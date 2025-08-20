'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import NextLink from 'next/link';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  mobile?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className = '',
  mobile = false,
  onClick
}) => {
  const pathname = usePathname();
  // Remove basePath and trailing slash for comparison
  const cleanPathname = pathname.replace('/hudakhan-design', '').replace(/\/$/, '') || '/';
  const cleanHref = href.replace(/\/$/, '') || '/';
  const isActive = cleanPathname === cleanHref;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Remove focus after click to prevent focus ring staying
    setTimeout(() => {
      (e.target as HTMLAnchorElement).blur();
    }, 100);
    
    if (onClick) {
      onClick();
    }
  };

  const linkVariants = {
    initial: { opacity: 1 },
    hover: { 
      opacity: 0.8,
      transition: { duration: 0.2 }
    }
  };

  const underlineVariants: Variants = {
    inactive: { 
      width: '0%',
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }
    },
    active: { 
      width: '100%',
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }
    },
    hover: { 
      width: '100%',
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }
    }
  };

  const mobileVariants = {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 }
  };

  if (mobile) {
    return (
      <motion.div
        variants={mobileVariants}
        className={className}
      >
        <NextLink
          href={href}
          className={`
            block py-3 px-4 text-lg font-medium rounded-xl transition-colors duration-300
            ${isActive 
              ? 'text-dynamic-text-primary bg-dynamic-accent/20 border border-dynamic-accent/30' 
              : 'text-dynamic-text-secondary hover:text-dynamic-text-primary hover:bg-dynamic-background-secondary'
            }
          `}
          onClick={handleClick}
        >
          {children}
        </NextLink>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={linkVariants}
      initial="initial"
      whileHover="hover"
      className={`relative ${className}`}
    >
      <NextLink
        href={href}
        className={`
          relative py-2 px-1 font-medium transition-colors duration-300
          focus:outline-none focus-visible:ring-2 focus-visible:ring-dynamic-accent focus-visible:ring-offset-2
          ${isActive 
            ? 'text-dynamic-text-primary' 
            : 'text-dynamic-text-secondary hover:text-dynamic-text-primary'
          }
        `}
        onClick={handleClick}
      >
        <span className="relative">
          {children}
          {/* Animated underline */}
          <motion.div
            variants={underlineVariants}
            animate={isActive ? "active" : "inactive"}
            whileHover="hover"
            className="absolute bottom-0 left-0 h-0.5 bg-dynamic-gradient-primary"
            style={{ originX: 0 }}
          />
        </span>
      </NextLink>
    </motion.div>
  );
};

export default NavLink;