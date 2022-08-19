import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import InputLabel from 'src/components/Mobile/InputLabel';

export default function HomeMobile() {
  const history = useHistory();
  const [programs, setPrograms] = useState([
    { name: 'club', path: '/club/awards', text: 'کلاب' },
    { name: 'management', path: '/management/user/allUsers', text: 'مدیریت' }
  ]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: '25px',
        gap: '30px',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <InputLabel style={{ color: '#00346D' }}>برنامه ها</InputLabel>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
          {programs.map((item, key) => {
            return (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px 16px',
                  gap: '10px',
                  width: '95.33px',
                  height: '84px',
                  background: '#FFFFFF',
                  boxShadow: '2px 2px 8px rgba(146, 146, 146, 0.25)',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                onClick={() => history.push(item.path)}
              >
                {item.text}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
