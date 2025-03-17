import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const InputContainer = styled.div<{ fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{ hasError: boolean; hasLeftIcon: boolean; hasRightIcon: boolean }>`
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme, hasError }) => (hasError ? theme.colors.error : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: border-color ${({ theme }) => theme.transition.speed} ease-in-out, 
              box-shadow ${({ theme }) => theme.transition.speed} ease-in-out;
  
  ${({ hasLeftIcon }) => hasLeftIcon && css`
    padding-left: 2.5rem;
  `}
  
  ${({ hasRightIcon }) => hasRightIcon && css`
    padding-right: 2.5rem;
  `}
  
  &:focus {
    border-color: ${({ theme, hasError }) => (hasError ? theme.colors.error : theme.colors.primary)};
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${({ theme, hasError }) => 
      hasError ? 'rgba(255, 107, 107, 0.25)' : 'rgba(255, 222, 89, 0.25)'};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textLighter};
  }
`;

const IconWrapper = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ position }) => position === 'left' ? 'left: 0.75rem;' : 'right: 0.75rem;'}
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textLight};
`;

const HelperText = styled.span<{ hasError: boolean }>`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: 0.875rem;
  color: ${({ theme, hasError }) => (hasError ? theme.colors.error : theme.colors.textLight)};
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, leftIcon, rightIcon, fullWidth = true, ...props }, ref) => {
    const hasError = !!error;
    const helpText = error || helperText;

    return (
      <InputContainer fullWidth={fullWidth}>
        {label && <Label>{label}</Label>}
        <InputWrapper>
          {leftIcon && <IconWrapper position="left">{leftIcon}</IconWrapper>}
          <StyledInput
            ref={ref}
            hasError={hasError}
            hasLeftIcon={!!leftIcon}
            hasRightIcon={!!rightIcon}
            {...props}
          />
          {rightIcon && <IconWrapper position="right">{rightIcon}</IconWrapper>}
        </InputWrapper>
        {helpText && <HelperText hasError={hasError}>{helpText}</HelperText>}
      </InputContainer>
    );
  }
);

export default Input;