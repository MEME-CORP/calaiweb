import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface AppNavigationProps {
  items: NavItem[];
}

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const NavItemLink = styled(Link)<{ active: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  text-decoration: none;
  color: ${({ active, theme }) => (active ? theme.colors.accent : theme.colors.textLighter)};
  
  &:hover {
    text-decoration: none;
  }
`;

const NavIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 4px;
`;

const NavText = styled.div`
  font-size: 0.75rem;
`;

export const AppNavigation: React.FC<AppNavigationProps> = ({ items }) => {
  const location = useLocation();
  
  return (
    <NavContainer>
      {items.map((item, index) => {
        const isActive = location.pathname === item.path;
        
        return (
          <NavItemLink key={index} to={item.path} active={isActive}>
            <NavIcon>{item.icon}</NavIcon>
            <NavText>{item.label}</NavText>
          </NavItemLink>
        );
      })}
    </NavContainer>
  );
};

export default AppNavigation;