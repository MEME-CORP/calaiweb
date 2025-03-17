import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/atomic/Input';
import Button from '../../components/atomic/Button';
import Checkbox from '../../components/atomic/Checkbox';
import Typography from '../../components/atomic/Typography';
import { useAuthStore } from '../../store/authStore';
import { useOnboardingStore } from '../../store/onboardingStore';

// Define form validation schema
const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  margin-top: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const RegistrationScreen: React.FC = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const resetOnboarding = useOnboardingStore((state) => state.resetOnboarding);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });
  
  const onSubmit = async (data: RegistrationFormValues) => {
    try {
      setIsLoading(true);
      setServerError(null);
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Register the user
      register(data.email, data.name);
      
      // Reset onboarding state to ensure a clean start
      resetOnboarding();
      
      // Navigate to onboarding
      navigate('/onboarding');
    } catch (error) {
      console.error('Registration error:', error);
      setServerError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthLayout 
      title="Create an Account" 
      subtitle="Join us for a healthier lifestyle"
      footer={
        <Typography variant="body">
          Already have an account? <Link to="/login">Sign in</Link>
        </Typography>
      }
    >
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        {serverError && <ErrorText>{serverError}</ErrorText>}
        
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          error={errors.name?.message}
          {...registerField('name')}
        />
        
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...registerField('email')}
        />
        
        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          error={errors.password?.message}
          {...registerField('password')}
        />
        
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          {...registerField('confirmPassword')}
        />
        
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          error={errors.acceptTerms?.message}
          {...registerField('acceptTerms')}
        />
        
        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          isLoading={isLoading}
          style={{ marginTop: '16px' }}
        >
          Create Account
        </Button>
      </FormContainer>
    </AuthLayout>
  );
};

export default RegistrationScreen;