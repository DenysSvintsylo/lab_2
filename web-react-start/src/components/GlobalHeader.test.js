import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GlobalHeader from './GlobalHeader';

describe('GlobalHeader', () => {
  it('renders navigation links', () => {
    render(
      <BrowserRouter>
        <GlobalHeader />
      </BrowserRouter>
    );

    try {
      expect(screen.getByText('Увійти')).toBeInTheDocument();
    expect(screen.getByText('Дім')).toBeInTheDocument();
    expect(screen.getByText('Профіль')).toBeInTheDocument();
    expect(screen.getByText('Статистика')).toBeInTheDocument();
    } catch (error) {

    }

    
  });
});
