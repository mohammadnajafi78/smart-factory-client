import React, { useState } from 'react';
import { Box } from '@mui/material';
import GetAwards from '../GetAwards';
import Awards from './AwardsBox';
import AwardsList from './AwardsList';
import Present from 'src/assets/img/icons/present.svg';

export default function AwardsDesktop() {
  const [selected, setSelected] = useState(null);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: '30px'
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
        <Box sx={{ width: '100%', padding: '30px 0px' }}>
          <Awards />
          <Box sx={{ width: '100%', padding: '10px 30px 30px' }}>
            <AwardsList selected={selected} setSelected={setSelected} />
          </Box>
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
          <GetAwards selected={selected} />
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
            <img src={Present} width="90px" height="90px" />
            <p style={{ color: '#6685A7' }}>
              جهت مشاهده جزئیات جوایز، روی آن کلیک کنید
            </p>
          </Box>
        )}
      </Box>
    </div>
  );
}
