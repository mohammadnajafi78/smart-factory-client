import React, { useState } from 'react';
import { Box } from '@mui/material';
import ProjectList from './ProjectList';
import Received from 'src/assets/img/icons/received.svg';
import ProjectItemSelected from './ProjectItemSelected';

export default function ProjectDesktop() {
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
          <ProjectList
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
          paddingTop: '20px',
          paddingRight: '30px'
        }}
      >
        {selected ? (
          // <GetCommentDesktop selected={selected} />
          <ProjectItemSelected selected={selected} setRefresh={setRefresh} />
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
              جهت مشاهده جزئیات پروژه، روی آن کلیک کنید
            </p>
          </Box>
        )}
      </Box>
    </div>
  );
}
