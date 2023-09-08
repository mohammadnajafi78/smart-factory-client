import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import RequestItem from './RequestItem';
import IconButton from 'src/components/Desktop/Button/Icon';
import newProject from 'src/assets/img/newProject.png';
import { NavLink, useHistory } from 'react-router-dom';

export default function RequestList({ request, type, typeName }) {
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
        {request &&
          request.length > 0 &&
          request.map((item, index) => {
            return (
              <RequestItem
                data={item}
                key={index}
                type={type}
                typeName={typeName}
              />
            );
          })}
      </Box>
      <IconButton
        onClick={() => {
          history.push({
            pathname: '/project/request/new'
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
      </IconButton>
    </Box>
  );
}
