'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProjectTile from '@/components/molecules/ProjectTile';
import Text from '@/components/atoms/Text';
import AnimationController from '@/lib/animations';
import { Project } from '@/types';

interface ParallaxGalleryProps {
  projects: Project[];
  className?: string;
}

const ParallaxGallery: React.FC<ParallaxGalleryProps> = ({
  projects,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms for different layers
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    if (containerRef.current) {
      AnimationController.createFloatingTiles(containerRef.current);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut" as const
      }
    }
  };

  // Filter featured projects for floating tiles
  const featuredProjects = projects.filter(project => project.featured).slice(0, 6);

  return (
    <section
      ref={containerRef}
      className={`relative py-32 overflow-hidden ${className}`}
    >
      {/* Background with parallax */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900"
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative min-h-screen flex items-center justify-center"
        >
          {/* Central Title */}
          <motion.div
            style={{ y: titleY }}
            variants={titleVariants}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          >
            <div className="text-center">
              <Text
                variant="h1"
                weight="bold"
                className="text-8xl md:text-9xl lg:text-[12rem] font-display leading-none tracking-tighter opacity-20 select-none"
              >
                LET'S
              </Text>
              <Text
                variant="h1"
                weight="bold"
                className="text-8xl md:text-9xl lg:text-[12rem] font-display leading-none tracking-tighter opacity-20 select-none -mt-8"
              >
                BUILD
              </Text>
              <Text
                variant="h1"
                weight="bold"
                className="text-8xl md:text-9xl lg:text-[12rem] font-display leading-none tracking-tighter text-gradient select-none -mt-8"
              >
                TOGETHER
              </Text>
            </div>
          </motion.div>

          {/* Floating Project Tiles */}
          <div className="relative w-full min-h-[60vh]">
            {featuredProjects.map((project, index) => {
              // Calculate positions for orbital layout
              const angle = (index / featuredProjects.length) * 2 * Math.PI;
              const radius = Math.min(typeof window !== 'undefined' ? window.innerWidth : 1200, 600) * 0.3;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius * 0.6; // Flatten the orbit

              return (
                <motion.div
                  key={project.id}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{
                    x: x,
                    y: y
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: {
                      delay: index * 0.2,
                      duration: 0.8,
                      ease: "backOut"
                    }
                  }}
                  viewport={{ once: true }}
                >
                  <ProjectTile
                    project={project}
                    index={index}
                    floating
                    className="hover:z-30"
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Decorative Elements */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-1/4 left-1/4 w-32 h-32 border border-purple-500/20 rounded-full"
          />

          <motion.div
            animate={{
              rotate: -360,
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full"
          />

          {/* Floating particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-500/40 rounded-full"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${30 + (i * 5)}%`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3 + (i * 0.5),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            />
          ))}
        </motion.div>

        {/* Section Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 relative z-20"
        >
          <Text
            variant="body"
            color="secondary"
            className="max-w-2xl mx-auto leading-relaxed"
          >
            Explore my featured projects by clicking on the floating tiles above. 
            Each piece represents a unique challenge solved through thoughtful design 
            and strategic thinking.
          </Text>
        </motion.div>
      </div>
    </section>
  );
};

export default ParallaxGallery;