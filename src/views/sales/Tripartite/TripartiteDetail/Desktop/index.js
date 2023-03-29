import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ProductList from './ProductList';

export default function ReceivedDetailDesktop(props) {
  const data = props.location.state.data;
  const [path, setPath] = useState(props.location.pathname.split('/')[4]);

  useEffect(() => {
    setPath(path);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          marginTop: '70px',
          padding: '30px',
          marginLeft: '140px',
          backgroundColor: 'white',
          marginRight: '20px'
        }}
      >
        <ProductList data={data} />
      </Box>
    </>
  );
}
