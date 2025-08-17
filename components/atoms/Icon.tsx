'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Layout, 
  Package, 
  Video, 
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Star,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Github,
  Linkedin,
  Download,
  Eye,
  Heart,
  Award,
  Users,
  TrendingUp,
  Zap
} from 'lucide-react';

export type IconName = 
  | 'palette' 
  | 'layout' 
  | 'package' 
  | 'video'
  | 'arrow-right'
  | 'arrow-left'
  | 'external-link'
  | 'mail'
  | 'phone'
  | 'map-pin'
  | 'star'
  | 'menu'
  | 'x'
  | 'chevron-down'
  | 'chevron-up'
  | 'github'
  | 'linkedin'
  | 'download'
  | 'eye'
  | 'heart'
  | 'award'
  | 'users'
  | 'trending-up'
  | 'zap';

interface IconProps {
  name: IconName;
  size?: number | string;
  className?: string;
  animated?: boolean;
  hover?: boolean;
  color?: string;
  strokeWidth?: number;
}

const iconMap = {
  'palette': Palette,
  'layout': Layout,
  'package': Package,
  'video': Video,
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  'external-link': ExternalLink,
  'mail': Mail,
  'phone': Phone,
  'map-pin': MapPin,
  'star': Star,
  'menu': Menu,
  'x': X,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'github': Github,
  'linkedin': Linkedin,
  'download': Download,
  'eye': Eye,
  'heart': Heart,
  'award': Award,
  'users': Users,
  'trending-up': TrendingUp,
  'zap': Zap
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className = '',
  animated = false,
  hover = false,
  color = 'currentColor',
  strokeWidth = 2,
  ...props
}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: name === 'star' ? 180 : 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    tap: { scale: 0.95 }
  };

  const rotateVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const bounceVariants = {
    animate: {
      y: [0, -4, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const getAnimationVariant = () => {
    if (!animated) return {};
    
    switch (name) {
      case 'star':
        return rotateVariants;
      case 'heart':
        return pulseVariants;
      case 'trending-up':
      case 'zap':
        return bounceVariants;
      default:
        return {};
    }
  };

  const motionProps = {
    variants: hover ? iconVariants : getAnimationVariant(),
    initial: hover ? "initial" : false,
    animate: animated && !hover ? "animate" : false,
    whileHover: hover ? "hover" : {},
    whileTap: hover ? "tap" : {},
    ...(hover && {
      transition: { type: "spring" as const, stiffness: 400, damping: 17 }
    })
  };

  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      {...motionProps}
      {...props}
    >
      <IconComponent
        size={size}
        color={color}
        strokeWidth={strokeWidth}
      />
    </motion.div>
  );
};

export default Icon;