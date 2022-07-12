import React, { useState } from 'react';
import { Box } from '@mui/material';
import ReceivedListDesktop from './ReceivedList';
import Received from 'src/assets/img/icons/received.svg';
import ReceivedItemDesktop from '../ReceivedItem/Desktop';

export default function ReceivedDesktop() {
  const [selected, setSelected] = useState(null);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          width: '40%',
          paddingLeft: '130px',
          justifyContent: 'center',
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Box sx={{ width: '100%' }}>
          <ReceivedListDesktop selected={selected} setSelected={setSelected} />
        </Box>
      </Box>
      <Box
        sx={{
          flex: '1 1 auto',
          width: '50%',
          backgroundColor: 'white',
          paddingTop: '50px'
        }}
      >
        {selected ? (
          // <GetCommentDesktop selected={selected} />
          <ReceivedItemDesktop selected={selected} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              pt: 20,
              gap: '60px'
            }}
          >
            <img src={Received} width="90px" height="90px" />
            <p>جهت مشاهده جزئیات جایزه دریافتی، روی آن کلیک کنید</p>
          </Box>
        )}
      </Box>
    </div>
  );
}
