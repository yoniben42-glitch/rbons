/**
 * RBONSU PHOTOGRAPHY — MOTION UTILITIES & VARIANTS
 *
 * Grounded in editorial storytelling with subtle, deliberate cadence.
 * Fully respects user prefers-reduced-motion preferences.
 */

import { Variants } from 'motion/react';
import { motionTokens } from '../tokens';

/**
 * Standard subtle fade up variant
 */
export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.durations.deliberate,
      ease: motionTokens.easings.editorial,
      delay: customDelay,
    },
  }),
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: motionTokens.durations.quick,
      ease: motionTokens.easings.fade,
    },
  },
};

/**
 * Editorial Image reveal variant (delicate scale and opacity without jarring shifts)
 */
export const imageRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.04,
  },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: motionTokens.durations.cinematic,
      ease: motionTokens.easings.editorial,
      delay: customDelay,
    },
  }),
};



/**
 * Page route transition variant
 */
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.durations.base,
      ease: motionTokens.easings.editorial,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: motionTokens.durations.quick,
      ease: motionTokens.easings.fade,
    },
  },
};
