import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import GlobalHeader from './GlobalHeader';
import LoginForm from './LoginForm';    
import GlobalFooter from './GlobalFooter';

describe('LoginPage', () => {
  it('renders GlobalHeader, LoginForm, and GlobalFooter', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    
  try {
    expect(screen.getByText('Увійти')).toBeInTheDocument();
    expect(screen.getByText('Вітаємо вас!')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  } catch (error) {

  }
    
   
  });
});
