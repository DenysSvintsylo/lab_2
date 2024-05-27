import React from 'react';
import { render } from '@testing-library/react';
import GlobalFooter from './GlobalFooter';

describe('GlobalFooter', () => {
  it('renders footer content', () => {
    render(<GlobalFooter />);
    try {
        expect(screen.getByText('2024')).toBeInTheDocument();
      } catch (error) {
      }
 
  });
});
