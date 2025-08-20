import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ParallaxConfig, AnimationType } from '@/src/domain/entities/index';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const animationTimings = {
  hover: {
    button: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    card: "0.4s ease-out",
    link: "0.25s ease-in-out"
  },
  scroll: {
    fadeIn: "0.6s ease-out",
    slideUp: "0.8s cubic-bezier(0.16, 1, 0.3, 1)",
    stagger: "0.1s"
  },
  page: {
    transition: "0.5s ease-in-out",
    loader: "1.2s ease"
  }
};

export const parallaxConfig: ParallaxConfig = {
  heroSection: {
    textLayer: { speed: 0.5, offset: 0 },
    imageLayer: { speed: 0.8, offset: 50 },
    backgroundLayer: { speed: 0.3, offset: 0 }
  },
  
  floatingTiles: {
    tiles: [
      { id: 'easy-khata', speed: 0.6, orbit: 'ellipse', radius: 300 },
      { id: 'bazaar-app', speed: 0.4, orbit: 'circle', radius: 250 },
      { id: 'detergent', speed: 0.7, orbit: 'ellipse', radius: 350 },
      { id: 'industrial', speed: 0.5, orbit: 'circle', radius: 280 },
      { id: 'corporate', speed: 0.8, orbit: 'ellipse', radius: 320 },
      { id: 'campaigns', speed: 0.3, orbit: 'circle', radius: 290 }
    ],
    scrollTrigger: {
      start: "top center",
      end: "bottom center",
      scrub: 1.5,
      pin: true
    }
  }
};

export class AnimationController {
  static fadeIn(element: HTMLElement, delay: number = 0): gsap.core.Timeline {
    return gsap.timeline()
      .set(element, { opacity: 0, y: 30 })
      .to(element, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        delay
      });
  }

  static slideInLeft(element: HTMLElement, delay: number = 0): gsap.core.Timeline {
    return gsap.timeline()
      .set(element, { opacity: 0, x: -50 })
      .to(element, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        delay
      });
  }

  static slideInRight(element: HTMLElement, delay: number = 0): gsap.core.Timeline {
    return gsap.timeline()
      .set(element, { opacity: 0, x: 50 })
      .to(element, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        delay
      });
  }

  static scale(element: HTMLElement, delay: number = 0): gsap.core.Timeline {
    return gsap.timeline()
      .set(element, { opacity: 0, scale: 0.8 })
      .to(element, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay
      });
  }

  static staggerAnimation(
    elements: HTMLElement[], 
    animationType: AnimationType = 'fadeIn',
    staggerDelay: number = 0.1
  ): gsap.core.Timeline {
    const tl = gsap.timeline();
    
    elements.forEach((element, index) => {
      const delay = index * staggerDelay;
      
      switch (animationType) {
        case 'fadeIn':
          this.fadeIn(element, delay);
          break;
        case 'slideInLeft':
          this.slideInLeft(element, delay);
          break;
        case 'slideInRight':
          this.slideInRight(element, delay);
          break;
        case 'scale':
          this.scale(element, delay);
          break;
        default:
          this.fadeIn(element, delay);
      }
    });
    
    return tl;
  }

  static initScrollTriggers(): void {
    if (typeof window === 'undefined') return;

    // Refresh ScrollTrigger on route change
    ScrollTrigger.refresh();

    // Animate elements on scroll
    gsap.utils.toArray('.animate-on-scroll').forEach((element: any) => {
      gsap.fromTo(element, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Parallax backgrounds
    gsap.utils.toArray('.parallax-bg').forEach((element: any) => {
      gsap.to(element, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  }

  static createFloatingTiles(container: HTMLElement): void {
    if (typeof window === 'undefined') return;

    const tiles = container.querySelectorAll('.floating-tile');
    
    tiles.forEach((tile: any, index) => {
      const config = parallaxConfig.floatingTiles.tiles[index];
      if (!config) return;

      // Set initial position
      gsap.set(tile, {
        x: Math.cos(index * 60) * config.radius,
        y: Math.sin(index * 60) * config.radius
      });

      // Create orbital animation
      gsap.to(tile, {
        rotation: 360,
        duration: 20 + (index * 5), // Vary duration for each tile
        ease: "none",
        repeat: -1,
        transformOrigin: `${-config.radius}px center`
      });

      // Scroll-triggered movement
      gsap.to(tile, {
        y: `-=${config.speed * 100}`,
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });
  }

  static buttonHover(button: HTMLElement): void {
    const bg = button.querySelector('.btn-bg');

    button.addEventListener('mouseenter', () => {
      gsap.to(button, { y: -2, duration: 0.3, ease: "power2.out" });
      if (bg) {
        gsap.to(bg, { scale: 1.05, duration: 0.3, ease: "power2.out" });
      }
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, { y: 0, duration: 0.3, ease: "power2.out" });
      if (bg) {
        gsap.to(bg, { scale: 1, duration: 0.3, ease: "power2.out" });
      }
    });
  }

  static cardHover(card: HTMLElement): void {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out"
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    });
  }

  static magneticEffect(element: HTMLElement, strength: number = 0.3): void {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    });
  }

  static pageTransition(isEntering: boolean = true): Promise<void> {
    return new Promise((resolve) => {
      const tl = gsap.timeline({ onComplete: resolve });
      
      if (isEntering) {
        tl.from('.page-content', {
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: "power2.out"
        });
      } else {
        tl.to('.page-content', {
          opacity: 0,
          y: -30,
          duration: 0.4,
          ease: "power2.in"
        });
      }
    });
  }

  static countUp(element: HTMLElement, finalValue: number, suffix: string = ''): void {
    gsap.fromTo(element, 
      { textContent: 0 },
      {
        textContent: finalValue,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        onUpdate: function() {
          element.textContent = Math.ceil(this.targets()[0].textContent) + suffix;
        },
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }
}

export default AnimationController;