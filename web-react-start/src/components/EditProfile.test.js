import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Edit_form from './Edit_form';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

describe('EditProfile component', () => {
  test('renders the component with loading indicator', () => {
    render(
      <BrowserRouter>
        <Edit_form />
      </BrowserRouter>
    );

    expect(screen.getByText('Завантаження...')).toBeInTheDocument();
  });

  test('fetches user data and cities data successfully', async () => {
    const userData = {
      first_name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
      city: 'New York',
    };

    const citiesData = [
      { id: 1, name: 'New York' },
      { id: 2, name: 'Los Angeles' },
    ];

    axios.get.mockResolvedValueOnce({ data: userData });
    axios.get.mockResolvedValueOnce({ data: citiesData });

    render(
      <BrowserRouter>
        <Edit_form />
      </BrowserRouter>
    );


  });




  test('handles error during form submission', async () => {
    axios.put.mockRejectedValueOnce(new Error('Error updating user'));

    render(
      <BrowserRouter>
        <Edit_form />
      </BrowserRouter>
    );

    try {
      fireEvent.submit(screen.getByTestId('registrationForm'));
    } catch (error) {

    }

  });
});