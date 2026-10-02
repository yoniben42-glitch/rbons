import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'cinema' | 'full';
  className?: string;
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer';
  id?: string;
}

const sizeClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  cinema: 'max-w-[1720px]',
  full: 'max-w-full',
};

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'cinema',
  className = '',
  as: Component = 'div',
  id,
}) => {
  return (
    <Component
      id={id}
      className={`w-full mx-auto px-5 sm:px-8 md:px-12 lg:px-16 ${sizeClasses[size]} ${className}`}
    >
      {children}
    </Component>
  );
};
