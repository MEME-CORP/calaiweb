import React, { forwardRef } from 'react';
import styled from 'styled-components';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  helperText?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-weight: 500;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const CheckboxControl = styled.div<{ checked: boolean; hasError: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: ${({ checked, theme }) => checked ? theme.colors.primary : theme.colors.background};
  border: 2px solid ${({ hasError, checked, theme }) => {
    if (hasError) return theme.colors.error;
    return checked ? theme.colors.primary : theme.colors.border;
  }};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-right: ${({ theme }) => theme.spacing.sm};
  transition: all ${({ theme }) => theme.transition.speed} ease;
  
  svg {
    width: 14px;
    height: 14px;
    color: ${({ theme }) => theme.colors.text};
    opacity: ${({ checked }) => (checked ? 1 : 0)};
    transition: opacity ${({ theme }) => theme.transition.speed} ease;
  }
  
  &:hover {
    border-color: ${({ theme, hasError }) => hasError ? theme.colors.error : theme.colors.primary};
  }
`;

const Text = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const HelperText = styled.span<{ hasError: boolean }>`
  margin-top: ${({ theme }) => theme.spacing.xs};
  margin-left: 28px;
  font-size: 12px;
  color: ${({ theme, hasError }) => hasError ? theme.colors.error : theme.colors.textLight};
`;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, helperText, checked, ...props }, ref) => {
    const hasError = !!error;
    const helpText = error || helperText;
    const isChecked = !!checked;

    return (
      <Container>
        <CheckboxLabel>
          <HiddenInput 
            type="checkbox" 
            checked={isChecked} 
            ref={ref} 
            {...props} 
          />
          <CheckboxControl checked={isChecked} hasError={hasError}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </CheckboxControl>
          <Text>{label}</Text>
        </CheckboxLabel>
        {helpText && <HelperText hasError={hasError}>{helpText}</HelperText>}
      </Container>
    );
  }
);

export default Checkbox;