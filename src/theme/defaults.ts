import type { ThemeDefaults } from '@/core';

/** The template's own accent and surfaces; the store's branding overrides the accent. */
export const themeDefaults: ThemeDefaults = {
  brand: '#9E5524',
  brand2: '#CFE8DA',
  surface: '#FFFDF9',
  // Raised cards are the least favorable reading surface in dark mode.
  darkSurface: '#35271E',
  displayFont: '"Caprasimo", "Noto Serif", Georgia, serif',
  bundledFonts: ['Caprasimo', 'Rethink Sans'],
  displayFallback: 'Georgia, serif',
};
