import React, { useMemo } from 'react';
import styled from 'styled-components';

import Typography from '../../components/atomic/Typography';
import { ProgressBar } from '../../components/atomic/Progress';
import Card from '../../components/atomic/Card';
import { useMealStore } from '../../store/mealStore';
import { MacroPercentages } from '../meals/types';

// Styled components
const Container = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const MacroCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  overflow: visible;
`;

const MacroCardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const MacroHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PieChartContainer = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
`;

const PieChart = styled.svg`
  transform: rotate(-90deg);
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

const PieChartCenter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 50%;
  pointer-events: none;
`;

const MacroDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const MacroDetail = styled.div<{ color: string }>`
  position: relative;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: ${({ color }) => color};
    border-top-left-radius: ${({ theme }) => theme.borderRadius.md};
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;

const ProgressSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ProgressItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

// Define macro colors
const macroColors = {
  protein: '#4ECDC4', // Teal
  carbs: '#FF9F1C',   // Orange
  fat: '#FF6B6B',     // Red
};

const MacroBreakdown: React.FC = () => {
  const { getDailyTotals, getDailyTargets } = useMealStore();
  
  // Get daily totals and targets
  const totals = getDailyTotals();
  const targets = getDailyTargets();
  
  // Calculate macro percentages
  const macroPercentages = useMemo<MacroPercentages>(() => {
    const { protein, carbs, fat } = totals;
    const totalMacros = protein + carbs + fat;
    
    if (totalMacros === 0) {
      return { protein: 33.33, carbs: 33.33, fat: 33.34 };
    }
    
    return {
      protein: Math.round((protein / totalMacros) * 100),
      carbs: Math.round((carbs / totalMacros) * 100),
      fat: Math.round((fat / totalMacros) * 100),
    };
  }, [totals]);
  
  // Calculate progress percentages
  const calorieProgress = useMemo(() => {
    if (targets.calories === 0) return 0;
    return Math.min(Math.round((totals.calories / targets.calories) * 100), 100);
  }, [totals.calories, targets.calories]);
  
  const proteinProgress = useMemo(() => {
    if (targets.protein === 0) return 0;
    return Math.min(Math.round((totals.protein / targets.protein) * 100), 100);
  }, [totals.protein, targets.protein]);
  
  const carbsProgress = useMemo(() => {
    if (targets.carbs === 0) return 0;
    return Math.min(Math.round((totals.carbs / targets.carbs) * 100), 100);
  }, [totals.carbs, targets.carbs]);
  
  const fatProgress = useMemo(() => {
    if (targets.fat === 0) return 0;
    return Math.min(Math.round((totals.fat / targets.fat) * 100), 100);
  }, [totals.fat, targets.fat]);
  
  // Generate SVG paths for pie chart
  const generatePieChart = () => {
    const { protein, carbs, fat } = macroPercentages;
    
    // Calculate the SVG paths for each slice
    let cumulativePercentage = 0;
    const slices = [];
    
    // Helper function to create SVG path
    const createSlice = (percentage: number, color: string) => {
      if (percentage === 0) return null;
      
      const startAngle = cumulativePercentage * 3.6; // 3.6 degrees per percentage
      cumulativePercentage += percentage;
      const endAngle = cumulativePercentage * 3.6;
      
      // Convert angles to radians
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      
      // Calculate the end points of the arc
      const radius = 90;
      const x1 = radius * Math.cos(startRad);
      const y1 = radius * Math.sin(startRad);
      const x2 = radius * Math.cos(endRad);
      const y2 = radius * Math.sin(endRad);
      
      // Create the arc path
      const largeArcFlag = percentage > 50 ? 1 : 0;
      
      const pathData = [
        `M ${radius} ${radius}`, // Move to center
        `L ${radius + x1} ${radius + y1}`, // Line to start of arc
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${radius + x2} ${radius + y2}`, // Arc
        'Z', // Close path
      ].join(' ');
      
      return <path key={color} d={pathData} fill={color} />;
    };
    
    // Create slices
    if (protein > 0) {
      slices.push(createSlice(protein, macroColors.protein));
    }
    if (carbs > 0) {
      slices.push(createSlice(carbs, macroColors.carbs));
    }
    if (fat > 0) {
      slices.push(createSlice(fat, macroColors.fat));
    }
    
    return slices;
  };
  
  return (
    <Container>
      <MacroCard>
        <MacroCardContent>
          <MacroHeader>
            <Typography variant="h4">Macro Breakdown</Typography>
            <Typography variant="body">Today</Typography>
          </MacroHeader>
          
          <ChartContainer>
            <PieChartContainer>
              <PieChart viewBox="0 0 180 180" width="180" height="180">
                {generatePieChart()}
              </PieChart>
              <PieChartCenter>
                <Typography variant="h3">{totals.calories}</Typography>
                <Typography variant="bodySmall" color="light">calories</Typography>
              </PieChartCenter>
            </PieChartContainer>
          </ChartContainer>
          
          <MacroDetails>
            <MacroDetail color={macroColors.protein}>
              <Typography variant="bodySmall" color="light">Protein</Typography>
              <Typography variant="h5">{totals.protein}g</Typography>
              <Typography variant="bodySmall" color="light">
                {macroPercentages.protein}%
              </Typography>
            </MacroDetail>
            
            <MacroDetail color={macroColors.carbs}>
              <Typography variant="bodySmall" color="light">Carbs</Typography>
              <Typography variant="h5">{totals.carbs}g</Typography>
              <Typography variant="bodySmall" color="light">
                {macroPercentages.carbs}%
              </Typography>
            </MacroDetail>
            
            <MacroDetail color={macroColors.fat}>
              <Typography variant="bodySmall" color="light">Fat</Typography>
              <Typography variant="h5">{totals.fat}g</Typography>
              <Typography variant="bodySmall" color="light">
                {macroPercentages.fat}%
              </Typography>
            </MacroDetail>
          </MacroDetails>
          
          <ProgressSection>
            <Typography variant="h5" gutterBottom>Daily Targets</Typography>
            
            <ProgressItem>
              <ProgressHeader>
                <Typography variant="body">Calories</Typography>
                <Typography variant="body">{totals.calories} / {targets.calories}</Typography>
              </ProgressHeader>
              <ProgressBar
                value={calorieProgress}
                max={100}
                height="0.6rem"
                color="#3F51B5"
                animated
              />
            </ProgressItem>
            
            <ProgressItem>
              <ProgressHeader>
                <Typography variant="body">Protein</Typography>
                <Typography variant="body">{totals.protein}g / {targets.protein}g</Typography>
              </ProgressHeader>
              <ProgressBar
                value={proteinProgress}
                max={100}
                height="0.6rem"
                color={macroColors.protein}
              />
            </ProgressItem>
            
            <ProgressItem>
              <ProgressHeader>
                <Typography variant="body">Carbs</Typography>
                <Typography variant="body">{totals.carbs}g / {targets.carbs}g</Typography>
              </ProgressHeader>
              <ProgressBar
                value={carbsProgress}
                max={100}
                height="0.6rem"
                color={macroColors.carbs}
              />
            </ProgressItem>
            
            <ProgressItem>
              <ProgressHeader>
                <Typography variant="body">Fat</Typography>
                <Typography variant="body">{totals.fat}g / {targets.fat}g</Typography>
              </ProgressHeader>
              <ProgressBar
                value={fatProgress}
                max={100}
                height="0.6rem"
                color={macroColors.fat}
              />
            </ProgressItem>
          </ProgressSection>
        </MacroCardContent>
      </MacroCard>
    </Container>
  );
};

export default MacroBreakdown;