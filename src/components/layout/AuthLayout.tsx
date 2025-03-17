import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showLogo?: boolean;
  footer?: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Logo = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  
  &:hover {
    text-decoration: none;
  }
`;

const LogoIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  svg {
    width: 36px;
    height: 36px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
`;

const ContentHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const ContentBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const FooterContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showLogo = true,
  footer,
}) => {
  return (
    <Container>
      {showLogo && (
        <LogoContainer>
          <Logo to="/">
            <LogoIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </LogoIcon>
            <LogoText>NutritionApp</LogoText>
          </Logo>
        </LogoContainer>
      )}
      
      <ContentContainer>
        <ContentHeader>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </ContentHeader>
        <ContentBody>{children}</ContentBody>
      </ContentContainer>
      
      {footer && <FooterContainer>{footer}</FooterContainer>}
    </Container>
  );
};

export default AuthLayout;