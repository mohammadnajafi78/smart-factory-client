import { Box, Rating } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Image from 'src/assets/img/06.jpg';
import InputLabel from 'src/components/Desktop/InputLabel';

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
        borderRadius: '8px'
      }}
    >
      <img
        src={data?.files?.[0]?.file}
        style={{
          width: '100%',
          height: '222.03px',
          borderRadius: '8px',
          // borderBottom: '0.5px solid #D3D2D2',
          paddingBottom: '6px'
        }}
        alt={data?.name}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0px',
          gap: '36px',
          width: '100%'
        }}
      >
        <InputLabel>
          {data?.is_winner ? (
            <Box
              sx={{
                color: '#00AAB5',
                backgroundColor: '#DDF5F6',
                padding: '2px 6px',
                borderRadius: '4px'
              }}
            >
              برنده
            </Box>
          ) : (
            <Box
              sx={{
                backgroundColor: '#FDE8E8',
                color: '#F4777C',
                padding: '2px 6px',
                borderRadius: '4px'
              }}
            >
              بازنده
            </Box>
          )}
        </InputLabel>
        <Rating value={data?.overall_rate} size="small" readOnly />
      </Box>
      <InputLabel style={{ color: '#00346D' }}>
        {data?.user?.first_name + ' ' + data?.user?.last_name}
      </InputLabel>
    </Box>
  );
}
