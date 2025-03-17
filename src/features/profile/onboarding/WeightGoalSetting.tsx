import React from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Typography from '../../../components/atomic/Typography';
import Card from '../../../components/atomic/Card';
import Input from '../../../components/atomic/Input';
import { ProgressBar } from '../../../components/atomic/Progress';
import { useProfileStore } from '../../../store/profileStore';
import { GoalType } from './GoalSelection';

// Define weight change rate options
export enum WeightChangeRate {
  Slow = 'SLOW',
  Moderate = 'MODERATE',
  Fast = 'FAST'
}

// Rate descriptions
const rateDescriptions = {
  [WeightChangeRate.Slow]: {
    [GoalType.WeightLoss]: '0.25 kg per week',
    [GoalType.Maintenance]: 'Maintain current weight',
    [GoalType.MuscleGain]: '0.25 kg per week'
  },
  [WeightChangeRate.Moderate]: {
    [GoalType.WeightLoss]: '0.5 kg per week',
    [GoalType.Maintenance]: 'Maintain current weight with flexibility',
    [GoalType.MuscleGain]: '0.5 kg per week'
  },
  [WeightChangeRate.Fast]: {
    [GoalType.WeightLoss]: '1 kg per week',
    [GoalType.Maintenance]: 'Maintain weight with higher calorie allowance',
    [GoalType.MuscleGain]: '0.75 kg per week'
  },
};

// Define validation schema
const weightGoalSchema = z.object({
  targetWeight: z
    .number()
    .min(30, 'Target weight must be at least 30 kg')
    .max(300, 'Target weight must be less than 300 kg')
});

type WeightGoalFormValues = z.infer<typeof weightGoalSchema>;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StepTitle = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const RateOptions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const RateCard = styled(Card)<{ selected: boolean }>`
  flex: 1;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  border: 2px solid ${({ selected, theme }) => 
    selected ? theme.colors.primary : 'transparent'};
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const SummaryContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const WeightGoalSetting: React.FC = () => {
  const { 
    goalType, 
    weight, 
    targetWeight, 
    weightChangeRate, 
    setTargetWeight, 
    setWeightChangeRate,
    setWeightChangeGoal
  } = useProfileStore();
  
  const {
    control,
    formState: { errors },
  } = useForm<WeightGoalFormValues>({
    resolver: zodResolver(weightGoalSchema),
    defaultValues: {
      targetWeight: targetWeight || weight,
    },
  });
  
  // Set default weight change rate if not set
  React.useEffect(() => {
    if (!weightChangeRate) {
      setWeightChangeRate(WeightChangeRate.Moderate);
    }
  }, [weightChangeRate, setWeightChangeRate]);
  
  // Handle rate selection
  const handleRateSelection = (rate: WeightChangeRate) => {
    setWeightChangeRate(rate);
  };
  
  // Calculate weight difference
  const weightDifference = targetWeight && weight ? targetWeight - weight : 0;
  
  // Calculate progress percentage for weight goal
  const progressPercentage = React.useMemo(() => {
    if (!weight || !targetWeight || !weightDifference) return 50; // Default to middle
    
    if (goalType === GoalType.Maintenance) return 50; // Middle for maintenance
    
    // For weight loss, show progress towards lower weight
    if (goalType === GoalType.WeightLoss) {
      // If target is higher than current (shouldn't happen for weight loss), show 0%
      if (weightDifference >= 0) return 0;
      
      // Calculate how close to target (10kg loss = 0%, 1kg loss = 90%)
      const maxLoss = weight * 0.3; // Assume max loss is 30% of current weight
      const remainingLoss = Math.abs(weightDifference);
      const progressPercent = 100 - (remainingLoss / maxLoss) * 100;
      
      return Math.min(Math.max(progressPercent, 0), 100);
    }
    
    // For muscle gain, show progress towards higher weight
    if (goalType === GoalType.MuscleGain) {
      // If target is lower than current (shouldn't happen for muscle gain), show 0%
      if (weightDifference <= 0) return 0;
      
      // Calculate how close to target (10kg gain = 100%, 1kg gain = 10%)
      const maxGain = weight * 0.2; // Assume max gain is 20% of current weight
      const progressPercent = (weightDifference / maxGain) * 100;
      
      return Math.min(Math.max(progressPercent, 0), 100);
    }
    
    return 50; // Fallback
  }, [weight, targetWeight, weightDifference, goalType]);
  
  // Calculate estimated time to reach goal
  const estimatedTimeWeeks = React.useMemo(() => {
    if (!weightDifference || goalType === GoalType.Maintenance) return 0;
    
    const absWeightDiff = Math.abs(weightDifference);
    
    // Calculate weekly rate based on selection
    let weeklyRate = 0.5; // Default moderate rate
    
    if (weightChangeRate === WeightChangeRate.Slow) {
      weeklyRate = 0.25;
    } else if (weightChangeRate === WeightChangeRate.Fast) {
      weeklyRate = goalType === GoalType.MuscleGain ? 0.75 : 1.0;
    }
    
    return Math.ceil(absWeightDiff / weeklyRate);
  }, [weightDifference, goalType, weightChangeRate]);
  
  // Update weight change goal on target weight or rate change
  React.useEffect(() => {
    if (targetWeight && weightChangeRate) {
      setWeightChangeGoal({
        currentWeight: weight || 0,
        targetWeight,
        rate: weightChangeRate
      });
    }
  }, [targetWeight, weightChangeRate, weight, setWeightChangeGoal]);
  
  return (
    <Container>
      <StepTitle variant="h3">Weight Goal Setting</StepTitle>
      <Typography variant="body" color="light" gutterBottom>
        {goalType === GoalType.Maintenance 
          ? "Set your weight maintenance preferences" 
          : "Set your target weight and how quickly you want to reach it"}
      </Typography>
      
      <Controller
        name="targetWeight"
        control={control}
        render={({ field }) => (
          <Input
            label="Target Weight (kg)"
            type="number"
            placeholder="Enter your target weight"
            error={errors.targetWeight?.message}
            value={field.value || ''}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              field.onChange(value);
              setTargetWeight(value);
            }}
          />
        )}
      />
      
      <Typography variant="body" weight="medium" style={{ marginTop: '16px' }}>
        How quickly do you want to {goalType === GoalType.WeightLoss ? 'lose' : goalType === GoalType.MuscleGain ? 'gain' : 'maintain'} weight?
      </Typography>
      
      <RateOptions>
        <RateCard 
          selected={weightChangeRate === WeightChangeRate.Slow}
          onClick={() => handleRateSelection(WeightChangeRate.Slow)}
        >
          <Typography variant="h5" gutterBottom>Slow</Typography>
          <Typography variant="bodySmall" color="light">
            {rateDescriptions[WeightChangeRate.Slow][goalType]}
          </Typography>
        </RateCard>
        
        <RateCard 
          selected={weightChangeRate === WeightChangeRate.Moderate}
          onClick={() => handleRateSelection(WeightChangeRate.Moderate)}
        >
          <Typography variant="h5" gutterBottom>Moderate</Typography>
          <Typography variant="bodySmall" color="light">
            {rateDescriptions[WeightChangeRate.Moderate][goalType]}
          </Typography>
        </RateCard>
        
        <RateCard 
          selected={weightChangeRate === WeightChangeRate.Fast}
          onClick={() => handleRateSelection(WeightChangeRate.Fast)}
        >
          <Typography variant="h5" gutterBottom>Fast</Typography>
          <Typography variant="bodySmall" color="light">
            {rateDescriptions[WeightChangeRate.Fast][goalType]}
          </Typography>
        </RateCard>
      </RateOptions>
      
      {goalType !== GoalType.Maintenance && weight && targetWeight && (
        <>
          <Typography variant="body" weight="medium">
            Progress Toward Goal
          </Typography>
          
          <ProgressBar 
            value={progressPercentage} 
            max={100} 
            color={goalType === GoalType.WeightLoss ? '#FF6B6B' : '#4ECDC4'} 
          />
          
          <SummaryContainer>
            <SummaryRow>
              <Typography variant="body">Current Weight:</Typography>
              <Typography variant="body" weight="medium">{weight} kg</Typography>
            </SummaryRow>
            
            <SummaryRow>
              <Typography variant="body">Target Weight:</Typography>
              <Typography variant="body" weight="medium">{targetWeight} kg</Typography>
            </SummaryRow>
            
            <SummaryRow>
              <Typography variant="body">Total to {weightDifference < 0 ? 'Lose' : 'Gain'}:</Typography>
              <Typography variant="body" weight="medium">{Math.abs(weightDifference)} kg</Typography>
            </SummaryRow>
            
            {estimatedTimeWeeks > 0 && (
              <SummaryRow>
                <Typography variant="body">Estimated Time:</Typography>
                <Typography variant="body" weight="medium">
                  {estimatedTimeWeeks} {estimatedTimeWeeks === 1 ? 'week' : 'weeks'}
                </Typography>
              </SummaryRow>
            )}
          </SummaryContainer>
        </>
      )}
    </Container>
  );
};

export default WeightGoalSetting;