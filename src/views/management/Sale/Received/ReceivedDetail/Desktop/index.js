import { useEffect, useState } from 'react';
// import Products from './Products';
// import Location from './Location';
// import Delivery from './Deleivery';
// import Message from './Message';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { ChevronRight } from 'react-feather';
import { useHistory } from 'react-router-dom';
import InputLabel from 'src/components/Desktop/InputLabel';
import Actions from './Actions';
import ProductList from './ProductList';

export default function OrderMobile(props) {
  const [path, setPath] = useState(props.location.pathname.split('/')[4]);
  const [data, setData] = useState(props.location.state.data);
  const history = useHistory();

  useEffect(() => {
    setPath(props.location.pathname.split('/')[4]);
    setData(props.location.state.data);
  });

  return (
    <>
      {/* {data == 2 || data == 3 || data == undefined ? ( */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          // marginTop: '70px',
          padding: '20px'
          // marginLeft: '140px'
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
                  history.push('/management/sale/received');
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
                  دریافتی ها
                </InputLabel>
              </Box>
              {/* <Box>{data == 3 ? <Delivery /> : <Location />}</Box> */}
              <Box>
                {/* <Confirmation {...props} data={data[0]} /> */}
                <Actions {...props} data={data} />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <ProductList data={data} />
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '70px',
            padding: '20px',
            marginLeft: '140px'
          }}
        >
          <Message />
        </Box>
      )} */}
    </>
  );
}
