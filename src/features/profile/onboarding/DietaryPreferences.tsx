import React from 'react';
import styled from 'styled-components';
import Typography from '../../../components/atomic/Typography';
import Checkbox from '../../../components/atomic/Checkbox';
import { useProfileStore } from '../../../store/profileStore';

// Define dietary preferences
export type DietaryPreference = 
  | 'VEGAN'
  | 'VEGETARIAN'
  | 'PESCATARIAN'
  | 'KETO'
  | 'PALEO'
  | 'GLUTEN_FREE'
  | 'DAIRY_FREE'
  | 'NUT_FREE'
  | 'LOW_CARB'
  | 'LOW_SUGAR';

// Dietary preference labels
const dietaryLabels: Record<DietaryPreference, string> = {
  VEGAN: 'Vegan',
  VEGETARIAN: 'Vegetarian',
  PESCATARIAN: 'Pescatarian',
  KETO: 'Keto',
  PALEO: 'Paleo',
  GLUTEN_FREE: 'Gluten-free',
  DAIRY_FREE: 'Dairy-free',
  NUT_FREE: 'Nut-free',
  LOW_CARB: 'Low carb',
  LOW_SUGAR: 'Low sugar'
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StepTitle = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PreferencesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const DietaryPreferences: React.FC = () => {
  const { dietaryPreferences, addDietaryPreference, removeDietaryPreference } = useProfileStore();
  
  const handlePreferenceChange = (preference: DietaryPreference, checked: boolean) => {
    if (checked) {
      addDietaryPreference(preference);
    } else {
      removeDietaryPreference(preference);
    }
  };
  
  // Helper to check if a preference is selected
  const isPreferenceSelected = (preference: DietaryPreference) => {
    return dietaryPreferences.includes(preference);
  };
  
  return (
    <Container>
      <StepTitle variant="h3">Dietary Preferences</StepTitle>
      <Typography variant="body" color="light" gutterBottom>
        Select any dietary preferences or restrictions you have.
      </Typography>
      
      <PreferencesContainer>
        {(Object.keys(dietaryLabels) as DietaryPreference[]).map((preference) => (
          <Checkbox
            key={preference}
            label={dietaryLabels[preference]}
            checked={isPreferenceSelected(preference)}
            onChange={(e) => handlePreferenceChange(preference, e.target.checked)}
          />
        ))}
      </PreferencesContainer>
      
      <Typography variant="bodySmall" color="light" style={{ marginTop: '16px' }}>
        We'll use these preferences to customize your meal recommendations.
      </Typography>
    </Container>
  );
};

export default DietaryPreferences;