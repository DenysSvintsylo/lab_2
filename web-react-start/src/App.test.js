import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Changed import
import Test from './Test';
import userEvent from '@testing-library/user-event';


test('renders Test1 component for the /test1 route', () => {
    render(
        <BrowserRouter>
            <Test />
        </BrowserRouter>
    );

    userEvent.click(screen.getByText(/test1/i)); 
    expect(screen.getByText(/Test1 Page/i)).toBeInTheDocument();
});



test('renders Test2 component for the /test2 route', () => {
    render(
        <BrowserRouter>
            <Test />
        </BrowserRouter>
    );

    userEvent.click(screen.getByText(/test2/i)); 
    expect(screen.getByText(/test2 page/i)).toBeInTheDocument();
});


test('navigates to Test3 on clicking the test3 link', () => {
    render(
        <BrowserRouter>
            <Test />
        </BrowserRouter>
    );
    userEvent.click(screen.getByText(/test3/i));
    expect(screen.getByText(/test3 page/i)).toBeInTheDocument();
});
