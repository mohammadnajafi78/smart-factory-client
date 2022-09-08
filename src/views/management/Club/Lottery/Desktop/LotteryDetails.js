import React from 'react';
import { Box, Grid } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import { Plus, Star } from 'react-feather';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import Iphone13 from 'src/assets/img/icons/iphone13.jpeg';

export default function LotteryDetails() {
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
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '16px',
              gap: '50px',
              background: '#FFFFFF',
              borderRadius: '8px',
              width: '100%',
              height: '290px'
            }}
          >
            <InputLabelHeader style={{ color: '#00346D' }}>
              برنده قرعه کشی
            </InputLabelHeader>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0px',
                width: '100%'
              }}
            >
              <InputLabel style={{ color: '#6685A7' }}>
                برنده هنوز مشخص نشده است
              </InputLabel>
              <ConfirmButton
                style={{ width: '130px', marginTop: '15px' }}
                onClick={() => {}}
                variant="contained"
              >
                <Plus />
                <div>تعیین برنده</div>
              </ConfirmButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '16px',
              gap: '50px',
              background: '#FFFFFF',
              borderRadius: '8px',
              width: '100%',
              height: '290px'
            }}
          >
            <InputLabelHeader style={{ color: '#00346D' }}>
              جایزه
            </InputLabelHeader>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                gap: '13.26px',
                // width: '162px',
                // height: '200px',
                background: '#CCEEF0',
                borderRadius: '10px',
                width: '100%'
              }}
            >
              <img src={Iphone13} width="71px" height={'110px'} />
              <InputLabel>هندزفری</InputLabel>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '16px 20px',
              gap: '13.26px',
              borderRadius: '8px',
              backgroundColor: 'white',
              width: '100%',
              height: '290px'
            }}
          >
            <InputLabelHeader
              style={{ color: '#00346D', fontSize: '40px', fontWeight: 700 }}
            >
              781
            </InputLabelHeader>
            <InputLabel style={{ color: '#00346D' }}>
              تعداد شرکت کنندگان
            </InputLabel>
          </Box>
        </Grid>
      </Grid>
      .
    </>
  );
}
