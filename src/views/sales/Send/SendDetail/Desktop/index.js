import React, { useEffect, useState } from 'react';
// import Products from './Products';
// import Location from './Location';
// import Delivery from './Deleivery';
// import Message from './Message';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import { ChevronRight } from 'react-feather';
import { useHistory } from 'react-router-dom';
import ProductList from './ProductList';
import Actions from './Actions';

export default function OrderMobile(props) {
  const [data, setData] = useState(props.location.state.data);
  const history = useHistory();

  useEffect(() => {
    setData(props.location.state.data);
  });

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          marginTop: '70px',
          padding: '20px',
          marginLeft: '140px'
        }}
      >
        <Box
          sx={{
            width: '100%',
            padding: '40px 40px 30px',
            backgroundColor: 'white',
            height: '100%'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Box
                sx={{ display: 'inline-flex', cursor: 'pointer' }}
                onClick={() => {
                  history.push('/sale/send');
                }}
              >
                <ChevronRight color="#335D8A" />
                <InputLabel
                  style={{
                    color: '#335D8A',
                    fontWeight: 400,
                    fontSize: '16px'
                  }}
                >
                  ارسالی ها
                </InputLabel>
              </Box>
              <Box>
                <Actions data={data.length > 0 ? data[0] : data} {...props} />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <ProductList data={data.length > 0 ? data[0] : data} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
