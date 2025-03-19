import React from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const ButtonContainer = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $isLoading?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.speed} ease-in-out;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  
  /* Size variants */
  ${({ $size, theme }) =>
    $size === 'sm' &&
    css`
      font-size: 0.875rem;
      padding: 0.5rem 0.75rem;
    `}
  
  ${({ $size, theme }) =>
    $size === 'md' &&
    css`
      font-size: 1rem;
      padding: 0.75rem 1.25rem;
    `}
  
  ${({ $size, theme }) =>
    $size === 'lg' &&
    css`
      font-size: 1.125rem;
      padding: 0.875rem 1.5rem;
    `}
  
  /* Color variants */
  ${({ $variant, theme }) =>
    $variant === 'primary' &&
    css`
      background-color: ${theme.colors.primary};
      color: ${theme.colors.text};
      
      &:hover {
        background-color: ${theme.colors.primaryDark};
        box-shadow: ${theme.shadows.md};
      }
    `}
  
  ${({ $variant, theme }) =>
    $variant === 'secondary' &&
    css`
      background-color: ${theme.colors.secondary1};
      color: white;
      
      &:hover {
        background-color: #3CBEB6;
        box-shadow: ${theme.shadows.md};
      }
    `}
  
  ${({ $variant, theme }) =>
    $variant === 'accent' &&
    css`
      background-color: ${theme.colors.accent};
      color: white;
      
      &:hover {
        background-color: #3849A2;
        box-shadow: ${theme.shadows.md};
      }
    `}
  
  ${({ $variant, theme }) =>
    $variant === 'outline' &&
    css`
      background-color: transparent;
      border: 2px solid ${theme.colors.accent};
      color: ${theme.colors.accent};
      
      &:hover {
        background-color: ${theme.colors.accent};
        color: white;
        box-shadow: ${theme.shadows.md};
      }
    `}
  
  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }
  
  /* Loading state */
  position: relative;
  
  .button-content {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${({ $isLoading }) => ($isLoading ? 0 : 1)};
  }
  
  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .left-icon {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
  
  .right-icon {
    margin-left: ${({ theme }) => theme.spacing.xs};
  }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <ButtonContainer 
      $variant={variant} 
      $size={size} 
      $fullWidth={fullWidth} 
      $isLoading={isLoading}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Spinner className="spinner" />}
      
      <span className="button-content">
        {leftIcon && <span className="icon left-icon">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="icon right-icon">{rightIcon}</span>}
      </span>
    </ButtonContainer>
  );
};

export default Button;