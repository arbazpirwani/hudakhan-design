'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
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

  const underlineVariants = {
    inactive: { 
      width: '0%',
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    active: { 
      width: '100%',
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    hover: { 
      width: '100%',
      transition: { duration: 0.3 }
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
            block py-3 px-4 text-lg font-medium rounded-lg transition-colors duration-300
            ${isActive 
              ? 'text-white bg-purple-500/20 border border-purple-500/30' 
              : 'text-gray-300 hover:text-white hover:bg-gray-800'
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
          focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2
          ${isActive 
            ? 'text-white' 
            : 'text-gray-300 hover:text-white'
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
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
            style={{ originX: 0 }}
          />
        </span>
      </NextLink>
    </motion.div>
  );
};

export default NavLink;