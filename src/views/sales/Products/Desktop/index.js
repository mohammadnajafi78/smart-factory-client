import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
// import GetProducts from '../GetProducts';
// import Products from './ProductsBox';
import ProductsList from './ProductsList';
import Present from 'src/assets/img/icons/present.svg';
import Menu from './Menu';

export default function ProductsDesktop() {
  const [selected, setSelected] = useState(null);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: '30px',
        padding: '12px',
        marginLeft: '130px'
      }}
    >
      <Box sx={{ width: '100%', padding: '30px 20px' }}>
        <Grid container>
          <Grid item sm={3}>
            <Menu />
          </Grid>
          <Grid item sm={9}>
            <ProductsList />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
