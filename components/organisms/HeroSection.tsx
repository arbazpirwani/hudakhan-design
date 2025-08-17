'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import StatCounter from '@/components/molecules/StatCounter';
import AnimationController from '@/lib/animations';
import { PersonalInfo } from '@/types';
import { getAssetPath } from '@/lib/utils';

interface HeroSectionProps {
  personal: PersonalInfo;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  personal,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    AnimationController.initScrollTriggers();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const imageVariants = {
    hidden: { x: 100, opacity: 0, scale: 0.8 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut" as const,
        delay: 0.5
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  const stats = [
    { value: "3M+", label: "Downloads", icon: "trending-up" as const },
    { value: "300M", label: "PKR Revenue", icon: "zap" as const },
    { value: "4+", label: "Years Experience", icon: "award" as const },
    { value: "100K+", label: "Users Impacted", icon: "users" as const }
  ];

  return (
    <section
      ref={containerRef}
      className={`relative min-h-screen flex items-center overflow-hidden grain-texture ${className}`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20" />
      <motion.div
        style={{ scale }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]"
      />

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen py-20"
        >
          {/* Left Content */}
          <motion.div
            style={{ y, opacity }}
            className="space-y-8"
          >
            {/* Greeting */}
            <motion.div variants={textVariants}>
              <Text
                variant="overline"
                color="accent"
                className="mb-4"
              >
                👋 Hello, I'm {personal.name.split(' ')[0]}
              </Text>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={textVariants}>
              <Text
                variant="h1"
                weight="bold"
                className="leading-tight mb-6"
              >
                <span className="text-gradient">Crafting Digital</span>
                <br />
                <span className="text-white">Experiences That</span>
                <br />
                <span className="text-white">Drive Impact</span>
              </Text>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={textVariants}>
              <Text
                variant="body"
                color="secondary"
                className="text-xl leading-relaxed max-w-lg"
              >
                {personal.tagline} • {personal.bio.substring(0, 100)}...
              </Text>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={textVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                variant="primary"
                href={getAssetPath("/projects")}
                magnetic
                icon={<Icon name="eye" size={20} />}
              >
                View My Work
              </Button>
              <Button
                variant="secondary"
                href={getAssetPath("/contact")}
                icon={<Icon name="mail" size={20} />}
              >
                Let's Connect
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={textVariants}
              className="pt-8"
            >
              <Text
                variant="caption"
                color="secondary"
                className="mb-4 uppercase tracking-wider"
              >
                Impact by Numbers
              </Text>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <StatCounter
                    key={stat.label}
                    value={stat.value}
                    label={stat.label}
                    icon={stat.icon}
                    delay={index * 200}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            variants={imageVariants}
            className="relative"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative z-10"
            >
              {/* Main Image Container */}
              <div className="relative w-full max-w-lg mx-auto">
                <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-2">
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    <Image
                      src="/huda-khan-profile.jpg"
                      alt={personal.name}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                      priority
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-purple-500/30 rounded-full" />
                <div className="absolute top-1/2 -left-8 w-4 h-4 bg-pink-500 rounded-full animate-bounce" />
                <div className="absolute top-1/4 -right-12 w-6 h-6 bg-purple-500 rounded-full opacity-60" />
              </div>
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.6, ease: "backOut" }}
              className="absolute top-8 -left-4 bg-white text-gray-900 px-4 py-2 rounded-full shadow-xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Available for hire</span>
              </div>
            </motion.div>

            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
              className="absolute bottom-8 -right-4 card p-4 max-w-xs"
            >
              <Text variant="caption" color="accent" weight="medium" className="mb-1">
                Currently at
              </Text>
              <Text variant="body" weight="semibold">
                Bazaar Technologies
              </Text>
              <Text variant="caption" color="secondary">
                Senior Brand Designer
              </Text>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="absolute bottom-8 inset-x-0 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2">
            <Text variant="caption" color="secondary">
              Scroll to explore
            </Text>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon name="chevron-down" size={20} color="rgb(156, 163, 175)" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;