import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Typography from '../../components/atomic/Typography';
import { StepIndicator } from '../../components/atomic/Progress';
import Button from '../../components/atomic/Button';
import { useOnboardingStore } from '../../store/onboardingStore';
import { useProfileStore } from '../../store/profileStore';

// Import onboarding steps
import GoalSelection from './onboarding/GoalSelection';
import PersonalDetails from './onboarding/PersonalDetails';
import ActivityLevel from './onboarding/ActivityLevel';
import DietaryPreferences from './onboarding/DietaryPreferences';
import WeightGoalSetting from './onboarding/WeightGoalSetting';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
`;

const Content = styled.div`
  flex: 1;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
`;

const StepContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;

// Define step labels
const stepLabels = [
  'Goal',
  'Details',
  'Activity',
  'Diet',
  'Target'
];

const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentStep, 
    setCurrentStep, 
    completeOnboarding 
  } = useOnboardingStore();
  const { 
    setUserProfile,
    goalType,
    age,
    gender,
    height,
    weight,
    activityLevel,
    dietaryPreferences,
    weightChangeGoal
  } = useProfileStore();
  
  // Define total number of steps
  const totalSteps = 5;
  
  // Navigate to dashboard if onboarding is already completed
  useEffect(() => {
    if (useOnboardingStore.getState().isCompleted) {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  // Handle navigation between steps
  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Collect all profile data and save
      setUserProfile({
        goalType,
        age,
        gender,
        height,
        weight,
        activityLevel,
        dietaryPreferences,
        weightChangeGoal
      });
      
      completeOnboarding();
      navigate('/dashboard');
    }
  };
  
  // Render appropriate step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <GoalSelection />;
      case 2:
        return <PersonalDetails />;
      case 3:
        return <ActivityLevel />;
      case 4:
        return <DietaryPreferences />;
      case 5:
        return <WeightGoalSetting />;
      default:
        return <Typography>Invalid step</Typography>;
    }
  };
  
  return (
    <Container>
      <Header>
        <Typography variant="h2" gutterBottom>
          Let's Set Up Your Profile
        </Typography>
        <Typography variant="body" color="light">
          We'll use this information to create your personalized nutrition plan.
        </Typography>
      </Header>
      
      <Content>
        <StepContent>
          <StepIndicator
            steps={totalSteps}
            currentStep={currentStep}
            labels={stepLabels}
          />
          {renderStepContent()}
        </StepContent>
        
        <Actions>
          <Button
            variant="outline"
            onClick={goToPreviousStep}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          
          <Button
            variant="primary"
            onClick={goToNextStep}
          >
            {currentStep === totalSteps ? 'Finish' : 'Next'}
          </Button>
        </Actions>
      </Content>
    </Container>
  );
};

export default OnboardingFlow;