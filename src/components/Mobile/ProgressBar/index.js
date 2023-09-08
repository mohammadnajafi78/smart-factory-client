import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses
} from '@mui/material/CircularProgress';
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 0,
  marginTop: '5px',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#D3D2D2'
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#00AAB5'
  }
}));

export default function CustomizedProgressBars(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <BorderLinearProgress variant="determinate" value={props.percentage} />
    </Box>
  );
}
