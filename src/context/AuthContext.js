import React, { createContext, useContext, useReducer } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Initial state
const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  user: JSON.parse(localStorage.getItem('user')) || null,
  selectedCourse: null
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('isLoggedIn', 'true');
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload
      };
    case 'LOGOUT':
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      localStorage.removeItem('enrolledCourses');
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    case 'SET_SELECTED_COURSE':
      return {
        ...state,
        selectedCourse: action.payload
      };
    case 'CLEAR_SELECTED_COURSE':
      return {
        ...state,
        selectedCourse: null
      };
    default:
      return state;
  }
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const setSelectedCourse = (courseName) => {
    dispatch({ type: 'SET_SELECTED_COURSE', payload: courseName });
  };

  const clearSelectedCourse = () => {
    dispatch({ type: 'CLEAR_SELECTED_COURSE' });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout,
      setSelectedCourse,
      clearSelectedCourse
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};