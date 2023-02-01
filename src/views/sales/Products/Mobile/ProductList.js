import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ProductItem from './ProductItem';

export default function ProductsList({ products }) {
  return (
    <div>
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
        {products &&
          products.length > 0 &&
          products.map((item, index) => {
            return <ProductItem data={item} key={index} />;
          })}
      </Box>
    </div>
  );
}
