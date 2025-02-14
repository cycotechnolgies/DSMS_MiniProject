import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the app component', () => {
    render(<App />);
    const linkElement = screen.getByText(/welcome/i);
    expect(linkElement).toBeInTheDocument();
});

test('checks button click behavior', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    buttonElement.click();
    const resultElement = screen.getByText(/you clicked the button/i);
    expect(resultElement).toBeInTheDocument();
});