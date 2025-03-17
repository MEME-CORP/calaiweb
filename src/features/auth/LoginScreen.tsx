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

// Define form validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });
  
  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      login(data.email, data.rememberMe || false);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your account to continue"
      footer={
        <Typography variant="body">
          Don't have an account? <Link to="/register">Sign up</Link>
        </Typography>
      }
    >
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register('email')}
        />
        
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register('password')}
        />
        
        <LinksContainer>
          <Checkbox
            label="Remember me"
            {...register('rememberMe')}
          />
          
          <Link to="/forgot-password">
            <Typography variant="bodySmall" color="accent">
              Forgot password?
            </Typography>
          </Link>
        </LinksContainer>
        
        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          isLoading={isLoading}
        >
          Sign In
        </Button>
      </FormContainer>
    </AuthLayout>
  );
};

export default LoginScreen;