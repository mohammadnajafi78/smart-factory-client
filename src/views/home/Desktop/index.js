import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import InputLabel from 'src/components/Desktop/InputLabel';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

export default function HomeDesktop() {
  const history = useHistory();
  const [programs, setPrograms] = useState([]);

  // { name: 'club', path: '/club/awards', text: 'کلاب' },
  // { name: 'management', path: '/management/user/allUsers', text: 'مدیریت' }

  useEffect(() => {
    httpService.get(`${API_BASE_URL}/api/utils/menu_items/`).then(res => {
      if (res.status === 200) {
        console.log('menu', res.data);
        setPrograms(res.data.filter(f => f.level === 1));
      }
    });
  }, []);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: '40px 80px',
        gap: '30px',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: '130px',
        width: '100%',
        marginTop: '60px'
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
                  width: '126.38px',
                  height: '120px',
                  background: '#FFFFFF',
                  boxShadow: '2px 2px 8px rgba(146, 146, 146, 0.25)',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                key={item?.id}
                onClick={() => history.push(item?.form_url)}
              >
                {item?.name}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
