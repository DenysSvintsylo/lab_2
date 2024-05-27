import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import Register_form from './Register_form';


const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));


jest.mock('axios');


window.alert = jest.fn();

describe('Register_form component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the registration form', () => {
    render(
      <BrowserRouter>
        <Register_form />
      </BrowserRouter>
    );

    expect(screen.getByText('Вітаємо вас!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('First_name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last_name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password confirm')).toBeInTheDocument();
    expect(screen.getByText('Зареєструвати')).toBeInTheDocument();
  });

  test('handles form submission successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: 'User registered successfully' });

    render(
      <BrowserRouter>
        <Register_form />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('First_name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('Last_name'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'johndoe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password confirm'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Львів' },
    });

    fireEvent.click(screen.getByText('Зареєструвати'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/create-user/', {
        username: 'johndoe',
        first_name: 'John',
        last_name: 'Doe',
        city: 1,
        password: 'password123',
        fav_malls: [],
      });
      expect(window.alert).toHaveBeenCalledWith('User registered successfully!');
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('handles form submission failure', async () => {
    axios.post.mockRejectedValueOnce(new Error('Error registering user'));

    render(
      <BrowserRouter>
        <Register_form />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('First_name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('Last_name'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'johndoe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password confirm'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Львів' },
    });

    fireEvent.click(screen.getByText('Зареєструвати'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/create-user/', {
        username: 'johndoe',
        first_name: 'John',
        last_name: 'Doe',
        city: 1,
        password: 'password123',
        fav_malls: [],
      });
      expect(window.alert).toHaveBeenCalledWith('There was an error registering the user. Please try again later.');
    });
  });
});
