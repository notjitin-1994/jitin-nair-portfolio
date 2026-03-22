'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  animation?: 'fadeInUp' | 'fadeIn' | 'fadeInScale' | 'slideInLeft' | 'slideInRight';
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 600,
  once = true,
  threshold = 0.1,
  animation = 'fadeInUp',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once, threshold]);

  const getAnimationStyles = () => {
    const baseTransition = `opacity ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms`;
    
    const animations = {
      fadeInUp: {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
      },
      fadeIn: {
        opacity: isVisible ? 1 : 0,
        transform: 'translate3d(0, 0, 0)',
      },
      fadeInScale: {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1) translate3d(0, 0, 0)' : 'scale(0.95) translate3d(0, 0, 0)',
      },
      slideInLeft: {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(-30px, 0, 0)',
      },
      slideInRight: {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(30px, 0, 0)',
      },
    };

    return {
      ...animations[animation],
      transition: baseTransition,
      willChange: 'opacity, transform',
    };
  };

  return (
    <div
      ref={ref}
      className={`gpu-accelerated ${className}`}
      style={getAnimationStyles()}
    >
      {children}
    </div>
  );
}

// Batch reveal for multiple items with stagger
interface StaggerRevealProps {
  children: ReactNode[];
  className?: string;
  childClassName?: string;
  staggerDelay?: number;
  baseDelay?: number;
  threshold?: number;
}

export function StaggerReveal({
  children,
  className = '',
  childClassName = '',
  staggerDelay = 100,
  baseDelay = 0,
  threshold = 0.1,
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.children;
    const observers: IntersectionObserver[] = [];

    Array.from(items).forEach((item, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const newSet = new Set(prev);
                newSet.add(index);
                return newSet;
              });
            }, baseDelay + index * staggerDelay);
            observer.unobserve(item);
          }
        },
        { threshold }
      );
      observer.observe(item);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [staggerDelay, baseDelay, threshold]);

  return (
    <div ref={containerRef} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={`gpu-accelerated ${childClassName}`}
          style={{
            opacity: visibleItems.has(index) ? 1 : 0,
            transform: visibleItems.has(index) 
              ? 'translate3d(0, 0, 0)' 
              : 'translate3d(0, 15px, 0)',
            transition: `opacity 500ms cubic-bezier(0.25, 0.1, 0.25, 1), transform 500ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
            willChange: 'opacity, transform',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

// Simple fade in wrapper for immediate use
interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className = '', delay = 0 }: FadeInProps) {
  return (
    <div
      className={`anim-fade-in-up anim-initial gpu-accelerated ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
