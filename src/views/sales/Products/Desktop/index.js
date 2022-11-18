import React, { useState } from 'react';
import { Box } from '@mui/material';
// import GetProducts from '../GetProducts';
// import Products from './ProductsBox';
// import ProductsList from './ProductsList';
import Present from 'src/assets/img/icons/present.svg';

export default function ProductsDesktop() {
  const [selected, setSelected] = useState(null);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: '30px',
        padding: '12px'
      }}
    >
      <Box></Box>
    </Box>
  );
}
