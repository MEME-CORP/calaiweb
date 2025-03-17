import React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
  height?: string;
  animated?: boolean;
}

interface StepIndicatorProps {
  steps: number;
  currentStep: number;
  labels?: string[];
}

// Linear Progress Bar
const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProgressLabel = styled.label`
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
`;

const ProgressTrack = styled.div<{ height: string }>`
  display: flex;
  height: ${({ height }) => height};
  overflow: hidden;
  font-size: 0.75rem;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  box-shadow: inset 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1);
`;

const ProgressFill = styled.div<{ value: number; max: number; color: string; animated: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  color: white;
  text-align: center;
  white-space: nowrap;
  background-color: ${({ color }) => color};
  width: ${({ value, max }) => `${(value / max) * 100}%`};
  transition: width ${({ theme }) => theme.transition.speed} ease;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  
  ${({ animated }) =>
    animated &&
    `
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-image: linear-gradient(
        -45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
      );
      background-size: 30px 30px;
      animation: progress-stripes 1s linear infinite;
      z-index: 1;
    }

    @keyframes progress-stripes {
      from { background-position: 30px 0; }
      to { background-position: 0 0; }
    }
  `}
`;

// Step Indicator
const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  position: relative;
`;

const StepLine = styled.div<{ progress: number }>`
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.border};
  z-index: 0;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ progress }) => `${progress}%`};
    background-color: ${({ theme }) => theme.colors.primary};
    transition: width ${({ theme }) => theme.transition.speed} ease;
  }
`;

const Step = styled.div<{ active: boolean; completed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const StepCircle = styled.div<{ active: boolean; completed: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: ${({ active, completed, theme }) =>
    completed ? theme.colors.primary : active ? theme.colors.background : theme.colors.backgroundAlt};
  border: 2px solid ${({ active, completed, theme }) =>
    completed ? theme.colors.primary : active ? theme.colors.primary : theme.colors.border};
  color: ${({ active, completed, theme }) =>
    completed ? theme.colors.text : active ? theme.colors.primary : theme.colors.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  transition: all ${({ theme }) => theme.transition.speed} ease;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const StepLabel = styled.span<{ active: boolean }>`
  font-size: 12px;
  color: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.textLight)};
  text-align: center;
  max-width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  color = '#3F51B5',
  height = '0.8rem',
  animated = false,
}) => {
  const clampedValue = Math.min(Math.max(value, 0), max);
  
  return (
    <ProgressBarContainer>
      {label && <ProgressLabel>{label}</ProgressLabel>}
      <ProgressTrack height={height}>
        <ProgressFill value={clampedValue} max={max} color={color} animated={animated} />
      </ProgressTrack>
    </ProgressBarContainer>
  );
};

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep, labels = [] }) => {
  const clampedStep = Math.min(Math.max(currentStep, 1), steps);
  const progress = ((clampedStep - 1) / (steps - 1)) * 100;
  
  return (
    <StepContainer>
      <StepLine progress={progress} />
      {Array.from({ length: steps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === clampedStep;
        const isCompleted = stepNumber < clampedStep;
        
        return (
          <Step key={index} active={isActive} completed={isCompleted}>
            <StepCircle active={isActive} completed={isCompleted}>
              {isCompleted ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                stepNumber
              )}
            </StepCircle>
            {labels[index] && <StepLabel active={isActive}>{labels[index]}</StepLabel>}
          </Step>
        );
      })}
    </StepContainer>
  );
};

export default { ProgressBar, StepIndicator };