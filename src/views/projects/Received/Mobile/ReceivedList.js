import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ReceivedItem from './ReceivedItem';
import IconButton from 'src/components/Desktop/Button/Icon';
import newProject from 'src/assets/img/newProject.png';
import { NavLink, useHistory } from 'react-router-dom';

export default function ReceivedList({ received, type, typeName }) {
  const history = useHistory();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '74vh'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '12px 0px 12px',
          gap: '14px',
          // height: '1000px',
          overflowY: 'auto'
        }}
      >
        {received &&
          received.length > 0 &&
          received.map((item, index) => {
            return (
              <ReceivedItem
                data={item}
                key={index}
                type={type}
                typeName={typeName}
              />
            );
          })}
      </Box>
      {/* <IconButton
        onClick={() => {
          history.push({
            pathname: '/project/received/new'
            // state: data
          });
        }}
      >
        <img
          src={newProject}
          width="26px"
          height="20px"
          style={{ color: 'white' }}
        />
        ثبت درخواست جدید
      </IconButton> */}
    </Box>
  );
}
