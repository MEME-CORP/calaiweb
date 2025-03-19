import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Typography from '../../components/atomic/Typography';
import Button from '../../components/atomic/Button';
import Card from '../../components/atomic/Card';
import MacroBreakdown from './MacroBreakdown';
import MealList from '../meals/MealList';
import { useMealStore } from '../../store/mealStore';
import { useProfileStore } from '../../store/profileStore';
import { GoalType } from '../profile/onboarding/GoalSelection';

// Styled components
const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  padding-bottom: 80px; // Space for bottom navigation
  max-width: 768px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const WelcomeCard = styled(Card)`
  position: relative;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary1} 100%);
`;

const WelcomeCardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  z-index: 1;
`;

const CircleDecoration = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: 0;
`;

const TopRightCircle = styled(CircleDecoration)`
  top: -50px;
  right: -50px;
`;

const BottomLeftCircle = styled(CircleDecoration)`
  bottom: -70px;
  left: -70px;
  width: 200px;
  height: 200px;
`;

const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.accent};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DashboardScreen: React.FC = () => {
  const navigate = useNavigate();
  const { getDailyTotals, getDailyTargets } = useMealStore();
  const { name, goalType, weight, targetWeight } = useProfileStore();
  
  // Get daily totals and targets
  const totals = getDailyTotals();
  const targets = getDailyTargets();
  
  // Calculate remaining calories
  const remainingCalories = Math.max(0, targets.calories - totals.calories);
  
  // Get current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = currentDate.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  // Get motivational message based on goal type
  const getMotivationalMessage = () => {
    switch (goalType) {
      case GoalType.WeightLoss:
        return `You're on track to reach your goal weight of ${targetWeight}kg!`;
      case GoalType.Maintenance:
        return 'Keep up the good work maintaining your healthy lifestyle!';
      case GoalType.MuscleGain:
        return 'Keep fueling those gains with proper nutrition!';
      default:
        return 'Track your meals and reach your nutrition goals!';
    }
  };
  
  const handleAddMeal = () => {
    navigate('/meals/add');
  };
  
  return (
    <Container>
      <Header>
        <Typography variant="h3">Dashboard</Typography>
        <Typography variant="body">{formattedDate}</Typography>
      </Header>
      
      <WelcomeCard>
        <TopRightCircle />
        <BottomLeftCircle />
        <WelcomeCardContent>
          <Typography variant="h4">{getGreeting()}, {name || 'there'}!</Typography>
          <Typography variant="body">{getMotivationalMessage()}</Typography>
        </WelcomeCardContent>
      </WelcomeCard>
      
      <QuickStats>
        <StatCard>
          <Typography variant="bodySmall" color="light">Calories Remaining</Typography>
          <StatValue>{remainingCalories}</StatValue>
          <Typography variant="bodySmall">
            {totals.calories} / {targets.calories} cal
          </Typography>
        </StatCard>
        
        <StatCard>
          <Typography variant="bodySmall" color="light">Today's Progress</Typography>
          <StatValue>
            {targets.calories > 0 
              ? Math.min(Math.round((totals.calories / targets.calories) * 100), 100)
              : 0}%
          </StatValue>
          <Typography variant="bodySmall">of daily goal</Typography>
        </StatCard>
      </QuickStats>
      
      <SectionHeader>
        <Typography variant="h4">Nutrition Overview</Typography>
      </SectionHeader>
      
      <MacroBreakdown />
      
      <MealList />
      
      <Button
        variant="primary"
        fullWidth
        size="lg"
        onClick={handleAddMeal}
        leftIcon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        }
      >
        Quick Add Meal
      </Button>
    </Container>
  );
};

export default DashboardScreen;