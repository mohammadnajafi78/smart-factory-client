import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ProductList from './ProductList';

export default function ReceivedDetailMobile(props) {
  const data = props.location.state;
  const [path, setPath] = useState(props.location.pathname.split('/')[4]);

  useEffect(() => {
    setPath(path);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '90px 20px',
          justifyContent: 'space-between',
          height: 'inherit',
          backgroundColor: 'white'
        }}
      >
        <ProductList data={data} />
      </Box>
    </>
  );
}
