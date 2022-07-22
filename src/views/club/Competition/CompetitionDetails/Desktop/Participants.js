import { Box, Rating } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Image from 'src/assets/img/06.jpg';

export default function Item({ data }) {
  const history = useHistory();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '16px 12px',
        gap: '12px',
        background: '#FFFFFF',
        boxShadow: '1px 1px 8px rgba(214, 212, 212, 0.25)',
        borderRadius: '8px',
        width: '100%'
      }}
      // onClick={() =>
      //   history.push({
      //     pathname: '/club/receivedItem',
      //     state: data
      //   })
      // }
    >
      <img
        src={Image}
        style={{
          width: '100%',
          height: '222.03px',
          borderRadius: '8px',
          borderBottom: '0.5px solid #D3D2D2',
          paddingBottom: '6px'
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '0px',
          gap: '36px',
          width: '100%'
        }}
      >
        {/* <Box> */}
        {/* <img src={Comment} /> */}
        <Rating value={1} size="small" readOnly />
        {/* </Box> */}
        {/* <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '8px'
          }}
        >

        </Box> */}
      </Box>
    </Box>
  );
}
