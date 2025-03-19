import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Typography from '../../components/atomic/Typography';
import Input from '../../components/atomic/Input';
import Button from '../../components/atomic/Button';
import Card, { CardHeader, CardBody, CardFooter } from '../../components/atomic/Card';
import { useMealStore } from '../../store/mealStore';
import { MealCategory } from './types';

// Define validation schema for meal entry
const mealEntrySchema = z.object({
  name: z.string().min(2, 'Food name must be at least 2 characters'),
  portion: z.string().min(1, 'Portion size is required'),
  calories: z.number().min(0, 'Calories must be a positive number'),
  protein: z.number().min(0, 'Protein must be a positive number'),
  carbs: z.number().min(0, 'Carbs must be a positive number'),
  fat: z.number().min(0, 'Fat must be a positive number'),
  category: z.nativeEnum(MealCategory),
});

type MealEntryFormValues = z.infer<typeof mealEntrySchema>;

// Styled components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const MacroRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const CategorySelector = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CategoryButton = styled.button<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ selected, theme }) => 
    selected ? theme.colors.primary : theme.colors.backgroundAlt};
  color: ${({ selected, theme }) => 
    selected ? theme.colors.text : theme.colors.textLight};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.speed} ease;
  
  &:hover {
    background-color: ${({ selected, theme }) => 
      selected ? theme.colors.primary : theme.colors.border};
  }
  
  .icon {
    font-size: 1.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

// Meal category icons and labels
const categoryOptions = [
  { value: MealCategory.Breakfast, label: 'Breakfast', icon: '🍳' },
  { value: MealCategory.Lunch, label: 'Lunch', icon: '🍲' },
  { value: MealCategory.Dinner, label: 'Dinner', icon: '🍽️' },
  { value: MealCategory.Snack, label: 'Snack', icon: '🍎' },
];

const ManualMealEntry: React.FC = () => {
  const navigate = useNavigate();
  const { addMeal } = useMealStore();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MealEntryFormValues>({
    resolver: zodResolver(mealEntrySchema),
    defaultValues: {
      name: '',
      portion: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      category: MealCategory.Breakfast,
    },
  });
  
  const selectedCategory = watch('category');
  
  const handleCategorySelect = (category: MealCategory) => {
    setValue('category', category);
  };
  
  const onSubmit = async (data: MealEntryFormValues) => {
    try {
      setIsLoading(true);
      // Add meal to store
      addMeal({
        ...data,
        id: Date.now().toString(), // Simple ID generation
        timestamp: new Date().toISOString(),
      });
      
      // Navigate back to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding meal:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/dashboard');
  };
  
  return (
    <Container>
      <Typography variant="h3" gutterBottom>Add Meal</Typography>
      
      <Card>
        <CardHeader>
          <Typography variant="h4">Meal Details</Typography>
        </CardHeader>
        
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FieldRow>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Food Name"
                    placeholder="Enter food name"
                    error={errors.name?.message}
                    {...field}
                  />
                )}
              />
              
              <Controller
                name="portion"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Portion Size"
                    placeholder="e.g., 100g, 1 cup"
                    error={errors.portion?.message}
                    {...field}
                  />
                )}
              />
            </FieldRow>
            
            <Controller
              name="calories"
              control={control}
              render={({ field }) => (
                <Input
                  label="Calories"
                  type="number"
                  placeholder="Enter calories"
                  error={errors.calories?.message}
                  value={field.value.toString()}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            
            <Typography variant="h5" gutterBottom>Macronutrients (g)</Typography>
            
            <MacroRow>
              <Controller
                name="protein"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Protein"
                    type="number"
                    placeholder="0"
                    error={errors.protein?.message}
                    value={field.value.toString()}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
              
              <Controller
                name="carbs"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Carbs"
                    type="number"
                    placeholder="0"
                    error={errors.carbs?.message}
                    value={field.value.toString()}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
              
              <Controller
                name="fat"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Fat"
                    type="number"
                    placeholder="0"
                    error={errors.fat?.message}
                    value={field.value.toString()}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </MacroRow>
            
            <Typography variant="h5" gutterBottom>Meal Category</Typography>
            
            <CategorySelector>
              {categoryOptions.map((option) => (
                <CategoryButton
                  key={option.value}
                  type="button"
                  selected={selectedCategory === option.value}
                  onClick={() => handleCategorySelect(option.value)}
                >
                  <span className="icon">{option.icon}</span>
                  <span>{option.label}</span>
                </CategoryButton>
              ))}
            </CategorySelector>
            
            <ActionsContainer>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
              >
                Cancel
              </Button>
              
              <Button 
                type="submit" 
                variant="primary" 
                isLoading={isLoading}
              >
                Save Meal
              </Button>
            </ActionsContainer>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ManualMealEntry;