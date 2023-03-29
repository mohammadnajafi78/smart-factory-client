import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import TripartiteItem from './TripartiteItem';

export default function TripartiteList({ Tripartite }) {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // padding: '12px 0px 12px',
          gap: '14px',
          // height: '1000px',
          overflowY: 'auto'
        }}
      >
        {Tripartite &&
          Tripartite.length > 0 &&
          Tripartite.map((item, index) => {
            return <TripartiteItem data={item} key={index} />;
          })}
      </Box>
    </div>
  );
}
