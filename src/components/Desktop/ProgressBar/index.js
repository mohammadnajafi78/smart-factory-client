import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [1, 2, 3];

export default function CustomizedProgressBars({ activeStep, steps }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          '.MuiStepIcon-root': {
            color: '#F2F2F2'
          }
          // '.MuiStepIcon-text': {
          //   fill: 'white'
          // }
        }}
      >
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
