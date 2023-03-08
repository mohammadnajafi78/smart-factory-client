import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import MomentFa from 'src/utils/MomentFa';
import { filter } from 'lodash';
import ProductTypeTable from './table';

export default function ProductType(props) {
  // const [data, setData] = useState(props.location.state.data[0]);

  return (
    <Box>
      <ProductTypeTable />
    </Box>
  );
}
