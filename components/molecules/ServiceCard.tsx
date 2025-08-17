'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon, { IconName } from '@/components/atoms/Icon';
import Text from '@/components/atoms/Text';
import AnimationController from '@/lib/animations';
import { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  index: number;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  className = ''
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      AnimationController.cardHover(cardRef.current);
    }
  }, []);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        delay: index * 0.1
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "backOut" as const,
        delay: (index * 0.1) + 0.3
      }
    }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: (index * 0.1) + 0.4
      }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`
        card group cursor-pointer
        relative overflow-hidden
        ${className}
      `}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          variants={iconVariants}
          className="mb-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon 
              name={service.icon as IconName} 
              size={32} 
              color="white"
              animated
            />
          </div>
        </motion.div>

        {/* Title */}
        <Text
          variant="h5"
          weight="semibold"
          className="mb-3 group-hover:text-gradient transition-all duration-300"
        >
          {service.title}
        </Text>

        {/* Description */}
        <Text
          variant="body"
          color="secondary"
          className="mb-6 leading-relaxed"
        >
          {service.description}
        </Text>

        {/* Features List */}
        <motion.ul
          variants={listVariants}
          className="space-y-2"
        >
          {service.features.map((feature, featureIndex) => (
            <motion.li
              key={featureIndex}
              variants={listItemVariants}
              className="flex items-center gap-3 text-sm text-gray-300"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0" />
              <span className="group-hover:text-white transition-colors duration-300">
                {feature}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Learn More Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: (index * 0.1) + 0.8 }}
          className="mt-6 pt-4 border-t border-gray-700 group-hover:border-purple-500/30 transition-colors duration-300"
        >
          <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
            <span className="text-sm font-medium">Learn More</span>
            <Icon 
              name="arrow-right" 
              size={16} 
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-8 h-8 border border-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-4 left-4 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default ServiceCard;