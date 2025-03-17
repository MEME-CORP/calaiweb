import React from 'react';
import styled from 'styled-components';
import Typography from '../../../components/atomic/Typography';
import Card from '../../../components/atomic/Card';
import { useProfileStore } from '../../../store/profileStore';

// Define goal types
export enum GoalType {
  WeightLoss = 'WEIGHT_LOSS',
  Maintenance = 'MAINTENANCE',
  MuscleGain = 'MUSCLE_GAIN'
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StepTitle = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const GoalCard = styled(Card)<{ selected: boolean }>`
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border: 2px solid ${({ selected, theme }) => 
    selected ? theme.colors.primary : 'transparent'};
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const CardBody = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  margin-right: ${({ theme }) => theme.spacing.md};
`;

const Content = styled.div`
  flex: 1;
`;

const GoalSelection: React.FC = () => {
  const { goalType, setGoalType } = useProfileStore();
  
  const handleGoalSelection = (goal: GoalType) => {
    setGoalType(goal);
  };
  
  return (
    <Container>
      <StepTitle variant="h3">What's your primary goal?</StepTitle>
      <Typography variant="body" color="light" gutterBottom>
        We'll customize your nutrition plan based on your goal.
      </Typography>
      
      <GoalCard 
        selected={goalType === GoalType.WeightLoss}
        onClick={() => handleGoalSelection(GoalType.WeightLoss)}
      >
        <CardBody>
          <IconContainer>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </IconContainer>
          <Content>
            <Typography variant="h5" gutterBottom>Weight Loss</Typography>
            <Typography variant="bodySmall" color="light">
              Calorie deficit to lose weight sustainably
            </Typography>
          </Content>
        </CardBody>
      </GoalCard>
      
      <GoalCard 
        selected={goalType === GoalType.Maintenance}
        onClick={() => handleGoalSelection(GoalType.Maintenance)}
      >
        <CardBody>
          <IconContainer>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </IconContainer>
          <Content>
            <Typography variant="h5" gutterBottom>Maintenance</Typography>
            <Typography variant="bodySmall" color="light">
              Balanced nutrition to maintain current weight
            </Typography>
          </Content>
        </CardBody>
      </GoalCard>
      
      <GoalCard 
        selected={goalType === GoalType.MuscleGain}
        onClick={() => handleGoalSelection(GoalType.MuscleGain)}
      >
        <CardBody>
          <IconContainer>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </IconContainer>
          <Content>
            <Typography variant="h5" gutterBottom>Muscle Gain</Typography>
            <Typography variant="bodySmall" color="light">
              Higher protein intake to support muscle growth
            </Typography>
          </Content>
        </CardBody>
      </GoalCard>
    </Container>
  );
};

export default GoalSelection;