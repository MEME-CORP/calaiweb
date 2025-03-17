import React from 'react';
import styled, { css } from 'styled-components';

type CardVariant = 'primary' | 'secondary' | 'accent' | 'default';

interface CardProps {
  variant?: CardVariant;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const CardContainer = styled.div<{ variant: CardVariant; hoverable: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: ${({ theme }) => theme.colors.background};
  background-clip: border-box;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: transform ${({ theme }) => theme.transition.speed} ease, 
              box-shadow ${({ theme }) => theme.transition.speed} ease;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  overflow: hidden;
  
  /* Variant styles */
  ${({ variant, theme }) =>
    variant === 'primary' &&
    css`
      border-top: 4px solid ${theme.colors.primary};
    `}
  
  ${({ variant, theme }) =>
    variant === 'secondary' &&
    css`
      border-top: 4px solid ${theme.colors.secondary1};
    `}
  
  ${({ variant, theme }) =>
    variant === 'accent' &&
    css`
      border-top: 4px solid ${theme.colors.accent};
    `}
  
  /* Hoverable effect */
  ${({ hoverable, theme }) =>
    hoverable &&
    css`
      cursor: pointer;
      &:hover {
        transform: translateY(-4px);
        box-shadow: ${theme.shadows.lg};
      }
    `}
`;

export const CardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: 0;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 600;
`;

export const CardBody = styled.div`
  flex: 1 1 auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

export const CardFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className,
  onClick,
  hoverable = false,
}) => {
  return (
    <CardContainer 
      variant={variant} 
      className={className} 
      onClick={onClick}
      hoverable={hoverable || !!onClick}
    >
      {children}
    </CardContainer>
  );
};

export default Card;