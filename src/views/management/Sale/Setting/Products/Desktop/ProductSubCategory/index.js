import React from 'react';
import { Box } from '@mui/material';
import ProductSubCategoryTable from './table';

export default function ProductSubCategory(props) {
  // const [data, setData] = useState(props.location.state.data[0]);

  return (
    <Box>
      <ProductSubCategoryTable />
    </Box>
  );
}
