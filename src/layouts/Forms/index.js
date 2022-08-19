import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery, useTheme } from '@mui/material';
import FormsDashboardLayoutMobile from './Mobile';
import FormsDashboardLayoutDesktop from './Desktop';

const FormsDashboardLayout = props => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {mobileDevice ? (
        <FormsDashboardLayoutMobile {...props}>
          {props.children}
        </FormsDashboardLayoutMobile>
      ) : (
        <FormsDashboardLayoutDesktop {...props}>
          {props.children}
        </FormsDashboardLayoutDesktop>
      )}
    </>
  );
};

FormsDashboardLayout.propTypes = {
  children: PropTypes.node
};

export default FormsDashboardLayout;
