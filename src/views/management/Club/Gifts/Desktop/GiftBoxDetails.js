import React from 'react';
import { Box, Grid } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import { Star } from 'react-feather';
import Iphone13 from 'src/assets/img/icons/iphone13.jpeg';

export default function GiftBoxDetails() {
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
            صندوق ۱
          </InputLabelHeader>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <div style={{ display: 'inline-flex' }}>
                  <InputLabel style={{ color: '#00AAB5' }}>
                    اعتبار تا:
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {'تاریخ'}
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
                      padding: '0px 6px !important',
                      //   gap: '2px',
                      // width: 54.1px,
                      height: '22px',
                      background: '#CCEEF0',
                      borderRadius: '4px',
                      color: '#00AAB5'
                    }}
                  >
                    <InputLabel style={{ color: '#00AAB5' }}>
                      {/* {data.gift_grade
                      ? data.gift_grade
                      : data.gift_detail.gift_grade} */}
                      5000
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
                    {'طلایی'}
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
            {[1, 2, 3, 4, 5, 6].map((item, index) => {
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
                    <img src={Iphone13} width="71px" height={'110px'} />
                    <InputLabel>هندزفری</InputLabel>
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
