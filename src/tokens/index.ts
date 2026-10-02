/**
 * RBONSU PHOTOGRAPHY — DESIGN TOKEN SYSTEM
 * Phase 0 Design System Architecture
 *
 * An editorial neutral visual system designed specifically
 * to frame and elevate photography without visual interference.
 */

export const colors = {
  // Deep charcoal (Foreground, primary text, high-contrast accents)
  charcoal: {
    950: '#121211',
    900: '#191817',
    800: '#22201E',
    700: '#2F2C29',
    600: '#3D3936',
  },
  // Warm ivory (Atmospheric page backgrounds, card surfaces, canvas)
  ivory: {
    50: '#FAF8F5',
    100: '#F4F1EB',
    200: '#ECE7DD',
    300: '#E2DBD0',
  },
  // Soft stone (Hairline dividers, secondary UI surfaces, tonal borders)
  stone: {
    200: '#E6E1D8',
    300: '#D8D3CA',
    400: '#BCB6AA',
    500: '#9E9789',
  },
  // Muted bronze / earthy warmth (Curatorial accents, metadata tags, secondary titles)
  bronze: {
    400: '#BFAB99',
    500: '#A69280',
    600: '#8C7A6B',
    700: '#5E5247',
    800: '#423931',
  },
  // Subtle cool gray (Technical metadata, timestamps, camera metadata)
  coolgray: {
    300: '#B2B4B7',
    400: '#9A9C9E',
    500: '#787A7D',
    600: '#5A5B5E',
  },
  // Semantic Aliases
  semantic: {
    canvas: '#FAF8F5',
    canvasMuted: '#F4F1EB',
    surface: '#FFFFFF',
    textPrimary: '#191817',
    textSecondary: '#5E5247',
    textMuted: '#8C7A6B',
    borderSubtle: '#ECE7DD',
    borderMedium: '#D8D3CA',
    borderFocus: '#22201E',
  },
} as const;

export const borders = {
  hairline: '1px solid #ECE7DD',
  muted: '1px solid #D8D3CA',
  focus: '2px solid #22201E',
  radius: {
    none: '0px',
    subtle: '2px',
    minimal: '4px',
    pill: '9999px',
  },
} as const;

export const motionTokens = {
  easings: {
    editorial: [0.19, 1, 0.22, 1] as const, // cinematic ease-out
    gentle: [0.25, 1, 0.5, 1] as const,
    fade: [0.4, 0, 0.2, 1] as const,
  },
  durations: {
    quick: 0.25,
    base: 0.45,
    deliberate: 0.75,
    cinematic: 1.1,
  },
} as const;
