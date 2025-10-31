/**
 * Animation utilities for WOTD-level micro-interactions
 * Based on Awwwards best practices
 */

// Spring animation configuration (natural, bouncy feel)
export const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20,
  mass: 1,
};

// Smooth animation configuration (elegant, professional)
export const smoothConfig = {
  type: "tween",
  duration: 0.3,
  ease: [0.4, 0.0, 0.2, 1], // Material Design easing
};

// Button press animation (scale down + slight rotation)
export const buttonPressAnimation = {
  scale: 0.95,
  rotate: -1,
  transition: springConfig,
};

// Button release animation (return to normal)
export const buttonReleaseAnimation = {
  scale: 1,
  rotate: 0,
  transition: springConfig,
};

// Card hover animation (lift + glow)
export const cardHoverAnimation = {
  y: -4,
  scale: 1.02,
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  transition: smoothConfig,
};

// Card tap animation (press down)
export const cardTapAnimation = {
  scale: 0.98,
  transition: springConfig,
};

// Fade in from bottom (scroll-triggered)
export const fadeInUpAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] },
};

// Fade in from left (page transitions)
export const fadeInLeftAnimation = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] },
};

// Scale fade in (modals, dialogs)
export const scaleFadeAnimation = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2, ease: [0.4, 0.0, 0.2, 1] },
};

// Ripple effect configuration
export const rippleAnimation = {
  initial: { scale: 0, opacity: 0.5 },
  animate: { scale: 2, opacity: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

// Success checkmark animation
export const successAnimation = {
  initial: { scale: 0, rotate: -180 },
  animate: { scale: 1, rotate: 0 },
  transition: { type: "spring", stiffness: 200, damping: 15 },
};

// Error shake animation
export const errorShakeAnimation = {
  x: [0, -10, 10, -10, 10, 0],
  transition: { duration: 0.5 },
};

// Loading pulse animation
export const pulseAnimation = {
  scale: [1, 1.05, 1],
  opacity: [1, 0.8, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// Shimmer loading animation (skeleton)
export const shimmerAnimation = {
  backgroundPosition: ["200% 0", "-200% 0"],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "linear",
  },
};

// Stagger children animation (list items)
export const staggerContainerAnimation = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Stagger child item animation
export const staggerItemAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] },
};

// Glow pulse animation (for badges, notifications)
export const glowPulseAnimation = {
  boxShadow: [
    "0 0 0 0 rgba(102, 126, 234, 0.4)",
    "0 0 0 10px rgba(102, 126, 234, 0)",
  ],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// Slide in from right (notifications)
export const slideInRightAnimation = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0 },
  transition: { type: "spring", stiffness: 300, damping: 30 },
};

// Bounce animation (success feedback)
export const bounceAnimation = {
  y: [0, -20, 0, -10, 0],
  transition: { duration: 0.6, ease: "easeOut" },
};

// Rotate animation (loading spinners)
export const rotateAnimation = {
  rotate: 360,
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: "linear",
  },
};

// Page transition variants
export const pageTransitionVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

// Modal backdrop animation
export const backdropAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

// Utility function to create custom spring animation
export const createSpringAnimation = (stiffness = 300, damping = 20) => ({
  type: "spring" as const,
  stiffness,
  damping,
  mass: 1,
});

// Utility function to create custom tween animation
export const createTweenAnimation = (duration = 0.3, ease = [0.4, 0.0, 0.2, 1]) => ({
  type: "tween" as const,
  duration,
  ease,
});
