import React from 'react';
import { Box, Grid } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import { Star } from 'react-feather';
import GiftReceiverTable from './GiftReceiverTable';
// import Participants from './Participants';

export default function GiftDetails() {
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
            هاردیسک یک ترابایت
          </InputLabelHeader>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div style={{ display: 'inline-flex' }}>
                  <InputLabel style={{ color: '#00AAB5' }}>
                    اعتبار تا:
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {'تاریخ'}
                  </InputLabel>
                </div>
              </Grid>
              <Grid item xs={6}>
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
                      5000
                    </InputLabel>
                    <Star style={{ width: '27px', height: '18px' }} />
                  </Box>
                </div>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{ display: 'inline-flex' }}>
                <InputLabel style={{ color: '#00AAB5' }}>
                  {' '}
                  دسته بندی:
                </InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>
                  {'هدایای تبلیغاتی'}
                </InputLabel>
              </div>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div style={{ display: 'block' }}>
                  <InputLabel style={{ color: '#00AAB5', width: '20%' }}>
                    توضیحات:
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است. لورم
                    ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                    استفاده از طراحان گرافیک است. لورم ایپسوم متن ساختگی با
                    تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان
                    گرافیک است. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                    صنعت چاپ، و با استفاده از طراحان گرافیک است.
                  </InputLabel>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <GiftReceiverTable />
    </>
  );
}
