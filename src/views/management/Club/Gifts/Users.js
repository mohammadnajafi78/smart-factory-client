import React from 'react';
import { Box, Grid } from '@mui/material';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import Participants from './Participants';

export default function Users() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: '15px',
        gap: '10px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '8px'
      }}
    >
      <InputLabelHeader style={{ color: '#00346D' }}>مسابقه ۱</InputLabelHeader>
      <Grid container spacing={2}>
        {[1, 2, 3].map((item, index) => {
          return (
            <Grid xs={4} item>
              <Participants data={item} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
