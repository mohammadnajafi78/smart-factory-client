import React from 'react';
import { Box } from '@mui/material';
import ProductTypeTable from './table';

export default function ProductType(props) {
  // const [data, setData] = useState(props.location.state.data[0]);

  return (
    <Box>
      <ProductTypeTable />
    </Box>
  );
}
