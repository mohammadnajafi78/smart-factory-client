import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

const AuthGuard = ({ children }) => {
  console.log('children', children);

  const { isAuthenticated } = useAuth();

  console.log('isAuthenticated', isAuthenticated);
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
