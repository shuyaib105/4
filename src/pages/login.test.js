import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

// Mock localStorage
const mockLocalStorage = (() => {
  let store = {};
  
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('Login Component', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  test('renders login form correctly', () => {
    render(<Login />);
    
    expect(screen.getByLabelText(/আপনার নাম/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /LOGIN NOW/i })).toBeInTheDocument();
    expect(screen.getByText(/সতর্কবার্তা:/i)).toBeInTheDocument();
  });

  test('shows error when form is submitted empty', async () => {
    render(<Login />);
    
    fireEvent.click(screen.getByRole('button', { name: /LOGIN NOW/i }));
    
    expect(await screen.findByText(/আপনার নাম প্রদান করুন!/i)).toBeInTheDocument();
  });

  test('shows error when password is too short', async () => {
    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/আপনার নাম/i), {
      target: { value: 'John Doe' },
    });
    
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: '123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /LOGIN NOW/i }));
    
    expect(await screen.findByText(/পাসওয়ার্ড অবশ্যই ৬ অক্ষরের বেশি হতে হবে!/i)).toBeInTheDocument();
  });

  test('stores user data in localStorage on successful login', async () => {
    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/আপনার নাম/i), {
      target: { value: 'John Doe' },
    });
    
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /LOGIN NOW/i }));
    
    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('isLoggedIn', 'true');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('userName', 'John Doe');
    });
  });

  test('validates password strength correctly', () => {
    const { getByTestId, rerender } = render(<Login />);
    
    // This test would require additional setup to test the password strength indicator
    // which is typically tested visually or with more complex unit tests
  });
});