'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Text from '@/components/atoms/Text';
import Icon from '@/components/atoms/Icon';
import AnimationController from '@/lib/animations';
import { Project } from '@/types';

interface ProjectTileProps {
  project: Project;
  index: number;
  className?: string;
  floating?: boolean;
}

const ProjectTile: React.FC<ProjectTileProps> = ({
  project,
  index,
  className = '',
  floating = false
}) => {
  const tileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tileRef.current && !floating) {
      AnimationController.cardHover(tileRef.current);
    }
  }, [floating]);

  const tileVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 30
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        delay: index * 0.1
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3, delay: 0.1 }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 6 + (index * 0.5),
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  const tileClasses = floating
    ? `floating-tile relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden cursor-pointer group ${className}`
    : `relative w-full aspect-square rounded-2xl overflow-hidden cursor-pointer group ${className}`;

  return (
    <motion.div
      ref={tileRef}
      variants={floating ? floatingVariants : tileVariants}
      initial={floating ? false : "hidden"}
      animate={floating ? "animate" : false}
      whileInView={floating ? {} : "visible"}
      viewport={{ once: true, margin: "-50px" }}
      className={tileClasses}
    >
      <Link href={`/projects/${project.id}`}>
        {/* Project Image */}
        <div className="relative w-full h-full">
          <Image
            src={project.images.thumbnail}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            loading={floating ? "eager" : "lazy"}
            priority={floating}
          />
          
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            whileHover="visible"
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />

          {/* Content Overlay */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileHover="visible"
            className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100"
          >
            <div className="space-y-2">
              <Text
                variant={floating ? "caption" : "h6"}
                weight="semibold"
                className="text-white"
              >
                {project.title}
              </Text>
              
              {!floating && (
                <>
                  <Text
                    variant="caption"
                    color="secondary"
                    className="text-purple-300"
                  >
                    {project.category}
                  </Text>
                  
                  <div className="flex items-center gap-2 pt-2">
                    <Text variant="caption" color="secondary">
                      View Project
                    </Text>
                    <Icon 
                      name="arrow-right" 
                      size={14}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Featured Badge */}
          {project.featured && !floating && (
            <div className="absolute top-4 right-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                Featured
              </div>
            </div>
          )}

          {/* Metrics Preview */}
          {project.metrics && !floating && (
            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-lg">
                {project.metrics.downloads && `${project.metrics.downloads} downloads`}
                {project.metrics.revenue && `${project.metrics.revenue} revenue`}
                {project.metrics.users && `${project.metrics.users} users`}
              </div>
            </div>
          )}
        </div>

        {/* Non-floating tile content */}
        {!floating && (
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent">
            <Text variant="body" weight="medium" className="text-white mb-1">
              {project.title}
            </Text>
            <Text variant="caption" className="text-purple-300">
              {project.category} • {project.year}
            </Text>
          </div>
        )}
      </Link>
    </motion.div>
  );
};

export default ProjectTile;