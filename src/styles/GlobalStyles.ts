import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: ${({ theme }) => theme.fontFamily.base};
    font-size: ${({ theme }) => theme.fontSize.base};
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fontFamily.base};
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
  }
  
  h1 {
    font-size: ${({ theme }) => theme.fontSize.h1};
    line-height: 1.2;
  }
  
  h2 {
    font-size: ${({ theme }) => theme.fontSize.h2};
    line-height: 1.2;
  }
  
  h3 {
    font-size: ${({ theme }) => theme.fontSize.h3};
    line-height: 1.3;
  }
  
  h4 {
    font-size: ${({ theme }) => theme.fontSize.h4};
    line-height: 1.4;
  }
  
  h5 {
    font-size: ${({ theme }) => theme.fontSize.h5};
    line-height: 1.4;
  }
  
  h6 {
    font-size: ${({ theme }) => theme.fontSize.h6};
    line-height: 1.5;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    transition: all ${({ theme }) => theme.transition.speed} ease;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  small {
    font-size: ${({ theme }) => theme.fontSize.small};
    color: ${({ theme }) => theme.colors.textLight};
  }
  
  button {
    font-family: ${({ theme }) => theme.fontFamily.base};
  }
  
  // For mobile view
  @media (max-width: 768px) {
    body {
      padding-bottom: 70px; // Space for bottom navigation
    }
  }
`;

export default GlobalStyles;