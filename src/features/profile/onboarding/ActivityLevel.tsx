import React from 'react';
import styled from 'styled-components';
import Typography from '../../../components/atomic/Typography';
import Card from '../../../components/atomic/Card';
import { useProfileStore } from '../../../store/profileStore';

// Define activity level types
export enum ActivityLevel {
  Sedentary = 'SEDENTARY',
  LightlyActive = 'LIGHTLY_ACTIVE',
  ModeratelyActive = 'MODERATELY_ACTIVE',
  VeryActive = 'VERY_ACTIVE',
  ExtremelyActive = 'EXTREMELY_ACTIVE'
}

// Activity level descriptions
const activityDescriptions = {
  [ActivityLevel.Sedentary]: 
    'Little or no exercise, desk job',
  [ActivityLevel.LightlyActive]: 
    'Light exercise 1-3 days/week',
  [ActivityLevel.ModeratelyActive]: 
    'Moderate exercise 3-5 days/week',
  [ActivityLevel.VeryActive]: 
    'Hard exercise 6-7 days/week',
  [ActivityLevel.ExtremelyActive]: 
    'Very hard exercise, physical job or training twice a day'
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StepTitle = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ActivityCard = styled(Card)<{ selected: boolean }>`
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

const IconContainer = styled.div<{ level: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: ${({ theme, level }) => {
    const opacity = 0.2 + (level * 0.2);
    return `rgba(255, 222, 89, ${opacity})`;
  }};
  margin-right: ${({ theme }) => theme.spacing.md};
`;

const Content = styled.div`
  flex: 1;
`;

const ActivityLevelSelection: React.FC = () => {
  const { activityLevel, setActivityLevel } = useProfileStore();
  
  const handleActivitySelection = (level: ActivityLevel) => {
    setActivityLevel(level);
  };
  
  return (
    <Container>
      <StepTitle variant="h3">What's your activity level?</StepTitle>
      <Typography variant="body" color="light" gutterBottom>
        Select the option that best describes your regular activity level.
      </Typography>
      
      <ActivityCard 
        selected={activityLevel === ActivityLevel.Sedentary}
        onClick={() => handleActivitySelection(ActivityLevel.Sedentary)}
      >
        <CardBody>
          <IconContainer level={1}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
              <path d="M12 4v1"></path>
              <path d="M12 19v1"></path>
              <path d="M4 12H5"></path>
              <path d="M19 12h1"></path>
            </svg>
          </IconContainer>
          <Content>
            <Typography variant="h5" gutterBottom>Sedentary</Typography>
            <Typography variant="bodySmall" color="light">
              {activityDescriptions[ActivityLevel.Sedentary]}
            </Typography>
          </Content>
        </CardBody>
      </ActivityCard>
      
      <ActivityCard 
        selected={activityLevel === ActivityLevel.LightlyActive}
        onClick={() => handleActivitySelection(ActivityLevel.LightlyActive)}
      >
        <CardBody>
          <IconContainer level={2}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 20h-4L10 4h4"></path>
              <path d="M5 20v-6a7 7 0 0 1 14 0v6"></path>
            </svg>
          </IconContainer>
          <Content>
            <Typography variant="h5" gutterBottom>Lightly Active</Typography>
            <Typography variant="bodySmall" color="light">
              {activityDescriptions[ActivityLevel.LightlyActive]}
            </Typography>
          </Content>
        </CardBody>
      </ActivityCard>
      
      <ActivityCard 
        selected={activityLevel === ActivityLevel.ModeratelyActive}
        onClick={() => handleActivitySelection(ActivityLevel.ModeratelyActive)}
      >
        <CardBody>
          <IconContainer level={3}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 11.5V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1.4"></path>
              <path d="M14 10V8a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
              <path d="M10 9.9V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5"></path>
              <path d="M6 14v0a2 2 0 0 0 2 2v0a2 2 0 0 0 2-2v0"></path>
              <path d="M10 15v2a2 2 0 0 0 2 2v0a2 2 0 0 0 2-2v-4.5"></path>
              <path d="M14 13v0a2 2 0 0 0 2 2v0a2 2 0 0 0 2-2v-3"></path>
            </svg>
          </IconContainer>
          <Content>
            <Typography variant="h5" gutterBottom>Moderately Active</Typography>
            <Typography variant="bodySmall" color="light">
              {activityDescriptions[ActivityLevel.ModeratelyActive]}
            </Typography>
          </Content>
        </CardBody>
      </ActivityCard>
      
      <ActivityCard 
        selected={activityLevel === ActivityLevel.VeryActive}
        onClick={() => handleActivitySelection(ActivityLevel.VeryActive)}
      >
        <CardBody>
          <IconContainer level={4}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 17l6-6"></path>
              <path d="M12 17l4-4"></path>
              <path d="M20 17l-8-8"></path>
            </svg>
          </IconContainer>
          <Content>
            <Typography variant="h5" gutterBottom>Very Active</Typography>
            <Typography variant="bodySmall" color="light">
              {activityDescriptions[ActivityLevel.VeryActive]}
            </Typography>
          </Content>
        </CardBody>
      </ActivityCard>
      
      <ActivityCard 
        selected={activityLevel === ActivityLevel.ExtremelyActive}
        onClick={() => handleActivitySelection(ActivityLevel.ExtremelyActive)}
      >
        <CardBody>
          <IconContainer level={5}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13.73 21a9.97 9.97 0 0 1-10.68-8.51"></path>
              <path d="M18 2l3 3-3 3"></path>
              <path d="M2 12h12"></path>
              <path d="M19 10a7.31 7.31 0 0 1 1 3.67c0 4.53-3.86 7.43-7.95 7.43"></path>
              <path d="M12 2a7.49 7.49 0 0 1 6.18 3.27"></path>
            </svg>
          </IconContainer>
          <Content>
            <Typography variant="h5" gutterBottom>Extremely Active</Typography>
            <Typography variant="bodySmall" color="light">
              {activityDescriptions[ActivityLevel.ExtremelyActive]}
            </Typography>
          </Content>
        </CardBody>
      </ActivityCard>
    </Container>
  );
};

export default ActivityLevelSelection;