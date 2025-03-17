import React from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Typography from '../../../components/atomic/Typography';
import Input from '../../../components/atomic/Input';
import Card from '../../../components/atomic/Card';
import { useProfileStore } from '../../../store/profileStore';

// Define gender types
export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER'
}

// Define validation schema
const personalDetailsSchema = z.object({
  age: z
    .number()
    .min(13, 'Age must be at least 13')
    .max(120, 'Age must be less than 120'),
  gender: z.enum([Gender.Male, Gender.Female, Gender.Other]),
  height: z
    .number()
    .min(100, 'Height must be at least 100 cm')
    .max(300, 'Height must be less than 300 cm'),
  weight: z
    .number()
    .min(30, 'Weight must be at least 30 kg')
    .max(300, 'Weight must be less than 300 kg'),
});

type PersonalDetailsFormValues = z.infer<typeof personalDetailsSchema>;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StepTitle = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const GenderOptions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const GenderCard = styled(Card)<{ selected: boolean }>`
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

const FormRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const PersonalDetails: React.FC = () => {
  const { 
    age, 
    gender, 
    height, 
    weight, 
    setAge, 
    setGender, 
    setHeight, 
    setWeight 
  } = useProfileStore();
  
  const {
    control,
    setValue,
    formState: { errors },
  } = useForm<PersonalDetailsFormValues>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      age: age || undefined,
      gender: gender || Gender.Other,
      height: height || undefined,
      weight: weight || undefined,
    },
  });
  
  // Handle gender selection
  const handleGenderSelect = (selectedGender: Gender) => {
    setValue('gender', selectedGender);
    setGender(selectedGender);
  };
  
  return (
    <Container>
      <StepTitle variant="h3">Personal Details</StepTitle>
      <Typography variant="body" color="light" gutterBottom>
        This information helps us calculate your nutritional needs accurately.
      </Typography>
      
      <Form>
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <Input
              label="Age"
              type="number"
              placeholder="Enter your age"
              error={errors.age?.message}
              value={field.value || ''}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                field.onChange(value);
                setAge(value);
              }}
            />
          )}
        />
        
        <Typography variant="body" weight="medium">Gender</Typography>
        <GenderOptions>
          <GenderCard 
            selected={gender === Gender.Male}
            onClick={() => handleGenderSelect(Gender.Male)}
          >
            <Typography>Male</Typography>
          </GenderCard>
          <GenderCard 
            selected={gender === Gender.Female}
            onClick={() => handleGenderSelect(Gender.Female)}
          >
            <Typography>Female</Typography>
          </GenderCard>
          <GenderCard 
            selected={gender === Gender.Other}
            onClick={() => handleGenderSelect(Gender.Other)}
          >
            <Typography>Other</Typography>
          </GenderCard>
        </GenderOptions>
        
        <FormRow>
          <Controller
            name="height"
            control={control}
            render={({ field }) => (
              <Input
                label="Height (cm)"
                type="number"
                placeholder="Enter your height"
                error={errors.height?.message}
                value={field.value || ''}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  field.onChange(value);
                  setHeight(value);
                }}
              />
            )}
          />
          
          <Controller
            name="weight"
            control={control}
            render={({ field }) => (
              <Input
                label="Weight (kg)"
                type="number"
                placeholder="Enter your weight"
                error={errors.weight?.message}
                value={field.value || ''}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  field.onChange(value);
                  setWeight(value);
                }}
              />
            )}
          />
        </FormRow>
      </Form>
    </Container>
  );
};

export default PersonalDetails;