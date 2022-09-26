import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import { Star } from 'react-feather';
import Iphone13 from 'src/assets/img/icons/iphone13.jpeg';
import MomentFa from 'src/utils/MomentFa';

export default function GiftBoxDetails(props) {
  const [data, setData] = useState(props.location.state.data[0]);

  return (
    <>
      <Box sx={{ mb: 2, width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: '15px',
            gap: '10px',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '8px'
          }}
        >
          <InputLabelHeader style={{ color: '#00346D' }}>
            {data?.name}
          </InputLabelHeader>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <div style={{ display: 'inline-flex' }}>
                  <InputLabel style={{ color: '#00AAB5' }}>
                    اعتبار تا:
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {MomentFa(data?.valid_date)}
                  </InputLabel>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div style={{ display: 'inline-flex' }}>
                  <InputLabel style={{ color: '#00AAB5' }}>امتیاز:</InputLabel>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '3px 6px !important',
                      //   gap: '2px',
                      // width: 54.1px,
                      // height: '22px',
                      background: '#CCEEF0',
                      borderRadius: '4px',
                      color: '#00AAB5'
                    }}
                  >
                    <InputLabel style={{ color: '#00AAB5' }}>
                      {/* {data.gift_grade
                      ? data.gift_grade
                      : data.gift_detail.gift_grade} */}
                      {data?.require_credit}
                    </InputLabel>
                    <Star style={{ width: '27px', height: '18px' }} />
                  </Box>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div style={{ display: 'inline-flex' }}>
                  <InputLabel style={{ color: '#00AAB5' }}>
                    سطح کاربری :
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {data?.grade}
                  </InputLabel>
                </div>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div style={{ display: 'inline-flex' }}>
                  <InputLabel style={{ color: '#00AAB5' }}>
                    توضیحات :
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {data?.description}
                  </InputLabel>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: '15px',
            gap: '10px',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '8px',
            mt: 2
          }}
        >
          <InputLabelHeader style={{ color: '#00346D' }}>
            جوایز صندوق
          </InputLabelHeader>
          <Grid container spacing={2}>
            {data?.gifts_list.map((item, index) => {
              return (
                <Grid item xs={2}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px 20px',
                      gap: '13.26px',
                      // width: '162px',
                      height: '200px',
                      background: '#CCEEF0',
                      borderRadius: '10px'
                    }}
                  >
                    <img src={item?.image} width="71px" height={'110px'} />
                    <InputLabel>{item?.name}</InputLabel>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
