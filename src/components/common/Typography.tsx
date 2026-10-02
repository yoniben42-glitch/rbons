import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
}

export const Display: React.FC<TypographyProps> = ({
  children,
  className = '',
  id,
  as: Component = 'h1',
}) => {
  return (
    <Component
      id={id}
      className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#191817] leading-[1.05] ${className}`}
    >
      {children}
    </Component>
  );
};

export const Body: React.FC<TypographyProps & { size?: 'normal' | 'large' | 'small' }> = ({
  children,
  className = '',
  id,
  size = 'normal',
  as: Component = 'p',
}) => {
  const sizeClass = {
    large: 'text-lg leading-relaxed',
    normal: 'text-base leading-relaxed',
    small: 'text-sm leading-relaxed',
  }[size];

  return (
    <Component
      id={id}
      className={`font-sans text-[#5E5247] ${sizeClass} ${className}`}
    >
      {children}
    </Component>
  );
};

export const Metadata: React.FC<TypographyProps> = ({
  children,
  className = '',
  id,
  as: Component = 'span',
}) => {
  return (
    <Component
      id={id}
      className={`font-sans text-xs uppercase tracking-[0.14em] font-medium text-[#8C7A6B] ${className}`}
    >
      {children}
    </Component>
  );
};

export const Caption: React.FC<TypographyProps> = ({
  children,
  className = '',
  id,
  as: Component = 'p',
}) => {
  return (
    <Component
      id={id}
      className={`font-sans text-xs sm:text-sm text-[#8C7A6B] leading-normal italic ${className}`}
    >
      {children}
    </Component>
  );
};
