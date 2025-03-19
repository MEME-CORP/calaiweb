import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Typography from '../../components/atomic/Typography';
import Card from '../../components/atomic/Card';
import Button from '../../components/atomic/Button';
import { useMealStore } from '../../store/mealStore';
import { Meal, MealCategory } from './types';

// Styled components
const Container = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const MealCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  transition: transform ${({ theme }) => theme.transition.speed} ease;
  overflow: visible;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const MealCardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const MealHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const MealInfo = styled.div`
  flex: 1;
`;

const MealTime = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const MacroInfo = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const MacroItem = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ color }) => color};
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CategoryBadge = styled.span<{ category: MealCategory }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  font-size: 0.75rem;
  font-weight: 600;
  margin-right: ${({ theme }) => theme.spacing.xs};
  
  ${({ category, theme }) => {
    switch (category) {
      case MealCategory.Breakfast:
        return `
          background-color: ${theme.colors.secondary2};
          color: white;
        `;
      case MealCategory.Lunch:
        return `
          background-color: ${theme.colors.secondary1};
          color: white;
        `;
      case MealCategory.Dinner:
        return `
          background-color: ${theme.colors.accent};
          color: white;
        `;
      case MealCategory.Snack:
        return `
          background-color: ${theme.colors.secondary3};
          color: white;
        `;
      default:
        return `
          background-color: ${theme.colors.backgroundAlt};
          color: ${theme.colors.text};
        `;
    }
  }}
`;

// Category icons for the meal list
const categoryIcons = {
  [MealCategory.Breakfast]: '🍳',
  [MealCategory.Lunch]: '🍲',
  [MealCategory.Dinner]: '🍽️',
  [MealCategory.Snack]: '🍎',
};

// Category labels for the meal list
const categoryLabels = {
  [MealCategory.Breakfast]: 'Breakfast',
  [MealCategory.Lunch]: 'Lunch',
  [MealCategory.Dinner]: 'Dinner',
  [MealCategory.Snack]: 'Snack',
};

// Helper function to format time from ISO string
const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

interface MealListProps {
  showAddButton?: boolean;
}

const MealList: React.FC<MealListProps> = ({ showAddButton = true }) => {
  const navigate = useNavigate();
  const { meals, deleteMeal } = useMealStore();
  
  // Get today's date to filter meals
  const today = new Date().toISOString().split('T')[0];
  
  // Filter meals for today
  const todayMeals = meals.filter(meal => 
    meal.timestamp.startsWith(today)
  );
  
  // Group meals by category
  const mealsByCategory = todayMeals.reduce<Record<MealCategory, Meal[]>>((acc, meal) => {
    if (!acc[meal.category]) {
      acc[meal.category] = [];
    }
    acc[meal.category].push(meal);
    return acc;
  }, {} as Record<MealCategory, Meal[]>);
  
  // Sort categories in order: Breakfast, Lunch, Dinner, Snack
  const sortedCategories = [
    MealCategory.Breakfast,
    MealCategory.Lunch,
    MealCategory.Dinner,
    MealCategory.Snack,
  ].filter(category => mealsByCategory[category] && mealsByCategory[category].length > 0);
  
  const handleEditMeal = (mealId: string) => {
    // Navigate to edit meal page
    navigate(`/meals/edit/${mealId}`);
  };
  
  const handleDeleteMeal = (mealId: string) => {
    // Delete meal from store
    deleteMeal(mealId);
  };
  
  const handleAddMeal = () => {
    // Navigate to add meal page
    navigate('/meals/add');
  };
  
  // If no meals, show empty state
  if (todayMeals.length === 0) {
    return (
      <Container>
        <SectionTitle>
          <Typography variant="h4">Today's Meals</Typography>
          {showAddButton && (
            <Button 
              variant="primary" 
              size="sm" 
              onClick={handleAddMeal}
              leftIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              }
            >
              Add Meal
            </Button>
          )}
        </SectionTitle>
        
        <EmptyState>
          <Typography variant="h5" gutterBottom>No meals logged today</Typography>
          <Typography variant="body" color="light" gutterBottom>
            Start tracking your nutrition by adding your meals.
          </Typography>
          <Button 
            variant="primary" 
            onClick={handleAddMeal}
            style={{ marginTop: '16px' }}
          >
            Add Your First Meal
          </Button>
        </EmptyState>
      </Container>
    );
  }
  
  return (
    <Container>
      <SectionTitle>
        <Typography variant="h4">Today's Meals</Typography>
        {showAddButton && (
          <Button 
            variant="primary" 
            size="sm" 
            onClick={handleAddMeal}
            leftIcon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            }
          >
            Add Meal
          </Button>
        )}
      </SectionTitle>
      
      {sortedCategories.map(category => (
        <div key={category}>
          <Typography variant="h5" gutterBottom>
            {categoryIcons[category]} {categoryLabels[category]}
          </Typography>
          
          {mealsByCategory[category].map(meal => (
            <MealCard key={meal.id} hoverable>
              <MealCardContent>
                <MealHeader>
                  <MealInfo>
                    <MealTime>{formatTime(meal.timestamp)}</MealTime>
                    <Typography variant="h5">{meal.name}</Typography>
                    <Typography variant="bodySmall" color="light">
                      {meal.portion}
                    </Typography>
                  </MealInfo>
                  
                  <ActionButtons>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditMeal(meal.id)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteMeal(meal.id)}
                    >
                      Delete
                    </Button>
                  </ActionButtons>
                </MealHeader>
                
                <Typography variant="body" weight="semibold">
                  {meal.calories} calories
                </Typography>
                
                <MacroInfo>
                  <MacroItem color="#4ECDC4">
                    <Typography variant="bodySmall">P: {meal.protein}g</Typography>
                  </MacroItem>
                  <MacroItem color="#FF9F1C">
                    <Typography variant="bodySmall">C: {meal.carbs}g</Typography>
                  </MacroItem>
                  <MacroItem color="#FF6B6B">
                    <Typography variant="bodySmall">F: {meal.fat}g</Typography>
                  </MacroItem>
                </MacroInfo>
              </MealCardContent>
            </MealCard>
          ))}
        </div>
      ))}
    </Container>
  );
};

export default MealList;