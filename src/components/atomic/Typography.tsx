import React from 'react';
import styled, { css } from 'styled-components';

type TextVariant = 'body' | 'bodySmall' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TextColor = 'default' | 'light' | 'lighter' | 'primary' | 'secondary' | 'accent' | 'error' | 'success';
type TextAlign = 'left' | 'center' | 'right';
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

interface TypographyProps {
  variant?: TextVariant;
  color?: TextColor;
  align?: TextAlign;
  weight?: TextWeight;
  className?: string;
  gutterBottom?: boolean;
  children: React.ReactNode;
}

const getElementByVariant = (variant: TextVariant): keyof JSX.IntrinsicElements => {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'bodySmall':
      return 'p';
    case 'body':
    default:
      return 'p';
  }
};

const getColorByType = (color: TextColor, theme: any) => {
  switch (color) {
    case 'light':
      return theme.colors.textLight;
    case 'lighter':
      return theme.colors.textLighter;
    case 'primary':
      return theme.colors.primary;
    case 'secondary':
      return theme.colors.secondary1;
    case 'accent':
      return theme.colors.accent;
    case 'error':
      return theme.colors.error;
    case 'success':
      return theme.colors.success;
    case 'default':
    default:
      return theme.colors.text;
  }
};

const getFontWeight = (weight: TextWeight) => {
  switch (weight) {
    case 'medium':
      return 500;
    case 'semibold':
      return 600;
    case 'bold':
      return 700;
    case 'normal':
    default:
      return 400;
  }
};

const StyledTypography = styled(
  ({ variant, color, align, weight, gutterBottom, className, children, ...props }: TypographyProps) => {
    const Component = getElementByVariant(variant || 'body');
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    );
  }
)<TypographyProps>`
  color: ${({ color, theme }) => getColorByType(color || 'default', theme)};
  text-align: ${({ align }) => align || 'left'};
  font-weight: ${({ weight }) => getFontWeight(weight || 'normal')};
  margin-bottom: ${({ gutterBottom, theme }) => (gutterBottom ? theme.spacing.md : 0)};
  
  ${({ variant, theme }) =>
    variant === 'h1' &&
    css`
      font-size: ${theme.fontSize.h1};
      line-height: 1.2;
    `}
  
  ${({ variant, theme }) =>
    variant === 'h2' &&
    css`
      font-size: ${theme.fontSize.h2};
      line-height: 1.2;
    `}
  
  ${({ variant, theme }) =>
    variant === 'h3' &&
    css`
      font-size: ${theme.fontSize.h3};
      line-height: 1.3;
    `}
  
  ${({ variant, theme }) =>
    variant === 'h4' &&
    css`
      font-size: ${theme.fontSize.h4};
      line-height: 1.4;
    `}
  
  ${({ variant, theme }) =>
    variant === 'h5' &&
    css`
      font-size: ${theme.fontSize.h5};
      line-height: 1.4;
    `}
  
  ${({ variant, theme }) =>
    variant === 'h6' &&
    css`
      font-size: ${theme.fontSize.h6};
      line-height: 1.5;
    `}
  
  ${({ variant, theme }) =>
    variant === 'bodySmall' &&
    css`
      font-size: ${theme.fontSize.small};
      line-height: 1.5;
    `}
`;

export const Typography: React.FC<TypographyProps> = (props) => {
  return <StyledTypography {...props} />;
};

export default Typography;