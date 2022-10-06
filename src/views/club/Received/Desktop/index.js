import React, { useState } from 'react';
import { Box } from '@mui/material';
import ReceivedListDesktop from './ReceivedList';
import Received from 'src/assets/img/icons/received.svg';
import ReceivedItemDesktop from '../ReceivedItem/Desktop';

export default function ReceivedDesktop() {
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: '40px'
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
          <ReceivedListDesktop
            selected={selected}
            setSelected={setSelected}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </Box>
      </Box>
      <Box
        sx={{
          flex: '1 1 auto',
          width: '50%',
          backgroundColor: 'white',
          paddingTop: '20px'
        }}
      >
        {selected ? (
          // <GetCommentDesktop selected={selected} />
          <ReceivedItemDesktop selected={selected} setRefresh={setRefresh} />
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
            <p style={{ color: '#6685A7' }}>
              جهت مشاهده جزئیات جایزه دریافتی، روی آن کلیک کنید
            </p>
          </Box>
        )}
      </Box>
    </div>
  );
}
