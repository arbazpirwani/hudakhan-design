'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/presentation/components/atoms/Logo';
import Button from '@/presentation/components/atoms/Button';
import Icon from '@/presentation/components/atoms/Icon';
import NavLink from '@/presentation/components/molecules/NavLink';
// import ThemeSwitcher from '@/presentation/components/atoms/ThemeSwitcher';
import { NavItem } from '@/domain/entities/index';
import { useStrings } from '@/presentation/hooks/useStrings';
import { useAssets } from '@/presentation/hooks/useAssets';
import { useTheme } from '@/src/presentation/hooks/useTheme';

interface HeaderProps {
  navigation: NavItem[];
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ navigation, className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useStrings();
  const { getDocumentPath } = useAssets();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        delay: 0.2
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    }
  };

  const menuItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut" as const
      }
    })
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <motion.header
        variants={headerVariants}
        initial="initial"
        animate="animate"
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled 
            ? 'bg-dynamic-background-tertiary/80 backdrop-blur-md border-b border-dynamic-border' 
            : 'bg-transparent'
          }
          ${className}
        `}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Logo size="sm" />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTA & Theme Switcher */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-dynamic-background-secondary/50 hover:bg-dynamic-background-tertiary/50 border border-dynamic-border hover:border-dynamic-accent transition-all duration-300"
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                <Icon name={isDark ? 'sun' : 'moon'} size={16} className={isDark ? 'text-yellow-400' : 'text-blue-400'} />
              </motion.button>
              <Button
                variant="secondary"
                href="/contact"
                icon={<Icon name="mail" size={16} />}
              >
                {t('navigation.contact')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-dynamic-background-secondary border border-dynamic-border hover:border-dynamic-accent transition-colors duration-300"
              aria-label={t('accessibility.openMenu')}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon name="x" size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon name="menu" size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-dynamic-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-16 left-0 right-0 z-50 bg-dynamic-background-tertiary/95 backdrop-blur-md border-b border-dynamic-border lg:hidden"
          >
            <div className="container-custom py-6">
              <nav className="space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.href}
                    variants={menuItemVariants}
                    custom={index}
                  >
                    <NavLink
                      href={item.href}
                      mobile
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Theme Switcher & CTA */}
              <motion.div
                variants={menuItemVariants}
                custom={navigation.length}
                className="pt-6 mt-6 border-t border-dynamic-border space-y-4"
              >
                <div className="flex justify-center">
                  <motion.button
                    onClick={toggleTheme}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-dynamic-background-secondary/50 hover:bg-dynamic-background-tertiary/50 border border-dynamic-border hover:border-dynamic-accent transition-all duration-300"
                  >
                    <Icon name={isDark ? 'sun' : 'moon'} size={20} className={isDark ? 'text-yellow-400' : 'text-blue-400'} />
                    <span className="text-sm text-dynamic-text-secondary font-medium">
                      {isDark ? 'Light' : 'Dark'} Mode
                    </span>
                  </motion.button>
                </div>
                <Button
                  variant="primary"
                  href="/contact"
                  className="w-full"
                  icon={<Icon name="mail" size={16} />}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('navigation.contact')}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;