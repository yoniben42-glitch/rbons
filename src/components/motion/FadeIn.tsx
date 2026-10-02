import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { fadeInVariants } from '../../utilities/motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
  viewportOnce?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  className = '',
  id,
  viewportOnce = true,
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      custom={delay}
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewportOnce, margin: '-50px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
