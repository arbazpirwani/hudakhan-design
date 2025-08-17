'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Logo from '@/components/atoms/Logo';
import Text from '@/components/atoms/Text';
import Link from '@/components/atoms/Link';
import SocialLink from '@/components/molecules/SocialLink';
import { PersonalInfo, SocialLinks, NavItem } from '@/types';

interface FooterProps {
  personal: PersonalInfo;
  social: SocialLinks;
  navigation: NavItem[];
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  personal,
  social,
  navigation,
  className = ''
}) => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  const marqueeVariants = {
    animate: {
      x: [0, -100],
      transition: {
        duration: 3,
        ease: "linear" as const,
        repeat: Infinity
      }
    }
  };

  const socialLinks = [
    { href: social.linkedin, icon: 'linkedin' as const, label: 'LinkedIn' },
    { href: social.behance, icon: 'external-link' as const, label: 'Behance' },
    { href: social.email, icon: 'mail' as const, label: 'Email' }
  ];

  return (
    <footer className={`bg-gray-950 border-t border-gray-800 ${className}`}>
      {/* Marquee Text */}
      <div className="relative overflow-hidden py-8 border-b border-gray-800">
        <motion.div
          variants={marqueeVariants}
          animate="animate"
          className="flex whitespace-nowrap"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <Text
              key={i}
              variant="h2"
              weight="bold"
              color="secondary"
              className="opacity-10 mr-16"
            >
              LET'S CREATE TOGETHER •
            </Text>
          ))}
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container-custom py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Logo size="lg" className="mb-6" />
            <Text
              variant="body"
              color="secondary"
              className="mb-6 max-w-md leading-relaxed"
            >
              {personal.bio}
            </Text>
            <div className="flex items-center space-x-4">
              {socialLinks.map((link) => (
                <SocialLink
                  key={link.label}
                  href={link.href}
                  icon={link.icon}
                  label={link.label}
                  size="md"
                  variant="default"
                />
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={itemVariants}>
            <Text
              variant="h6"
              weight="semibold"
              className="mb-6 text-gradient"
            >
              Navigation
            </Text>
            <nav className="space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  variant="footer"
                  className="block"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <Text
              variant="h6"
              weight="semibold"
              className="mb-6 text-gradient"
            >
              Get in Touch
            </Text>
            <div className="space-y-3">
              <Link
                href={`mailto:${personal.email}`}
                variant="footer"
                external
                className="block"
              >
                {personal.email}
              </Link>
              <Link
                href={`tel:${personal.phone}`}
                variant="footer"
                external
                className="block"
              >
                {personal.phone}
              </Link>
              <Text variant="caption" color="secondary">
                {personal.location}
              </Text>
            </div>

            {/* Availability Status */}
            <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <Text variant="caption" weight="medium" color="primary">
                  Available for Projects
                </Text>
              </div>
              <Text variant="caption" color="secondary">
                Usually responds within 24 hours
              </Text>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center pt-12 mt-12 border-t border-gray-800"
        >
          <Text variant="caption" color="secondary">
            © {currentYear} {personal.name}. All rights reserved.
          </Text>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="/privacy" variant="footer">
              Privacy Policy
            </Link>
            <Link href="/terms" variant="footer">
              Terms of Service
            </Link>
            <Text variant="caption" color="secondary">
              Made with ❤️ in {personal.location.split(',')[0]}
            </Text>
          </div>
        </motion.div>
      </motion.div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 z-40"
        aria-label="Back to top"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </motion.button>
    </footer>
  );
};

export default Footer;