// Global theme and style variables
export const theme = {
  colors: {
    primary: '#FFDE59', // Yellow
    primaryDark: '#E6C84F', // Slightly darker yellow for hover states
    secondary1: '#4ECDC4', // Teal
    secondary2: '#FF9F1C', // Orange
    secondary3: '#FF6B6B', // Red
    accent: '#3F51B5', // Blue
    text: '#2F2E41', // Dark gray for text
    textLight: '#615F7E', // Lighter text color
    textLighter: '#9795B5', // Even lighter text
    background: '#FFFFFF', // White background
    backgroundAlt: '#F8F9FE', // Light grey for alternating backgrounds
    border: '#E6E8F0', // Light border color
    error: '#FF6B6B', // Red for errors
    success: '#4ECDC4', // Teal for success
    warn: '#FF9F1C', // Orange for warnings
  },
  fontFamily: {
    base: "'Poppins', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
  },
  fontSize: {
    base: '14px',
    h1: '24px',
    h2: '22px',
    h3: '20px',
    h4: '18px',
    h5: '16px',
    h6: '14px',
    small: '12px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    pill: '50rem',
    circle: '50%',
  },
  shadows: {
    sm: '0 2px 4px rgba(0,0,0,0.08)',
    md: '0 4px 8px rgba(0,0,0,0.15)',
    lg: '0 8px 16px rgba(0,0,0,0.15)',
  },
  transition: {
    speed: '0.2s',
  },
};

export type ThemeType = typeof theme;