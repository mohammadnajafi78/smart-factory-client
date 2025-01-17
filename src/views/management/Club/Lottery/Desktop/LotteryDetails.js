import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import { Plus, Star } from 'react-feather';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import Iphone13 from 'src/assets/img/icons/iphone13.jpeg';
import MomentFa from 'src/utils/MomentFa';

export default function LotteryDetails(props) {
  const [data, setData] = useState(props.location.state.data[0]);
  // const [data, setData] = useState([]);

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
              <Grid item xs={6}>
                <div style={{ display: 'inline-flex' }}>
                  <InputLabel style={{ color: '#00AAB5' }}>
                    اعتبار تا:
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {MomentFa(data?.date)}
                  </InputLabel>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
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
                      {data?.credit}
                    </InputLabel>
                    <Star style={{ width: '27px', height: '18px' }} />
                  </Box>
                </div>
              </Grid>
            </Grid>
          </Box>
          {/* <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{ display: 'inline-flex' }}>
                <InputLabel style={{ color: '#00AAB5' }}>دسته بندی:</InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>
                  {'هدایای تبلیغاتی'}
                </InputLabel>
              </div>
            </Grid>
          </Grid> */}
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div style={{ display: 'block' }}>
                  <InputLabel style={{ color: '#00AAB5', width: '20%' }}>
                    توضیحات:
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {data?.description}
                  </InputLabel>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {/* <Grid item xs={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '16px',
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
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0px',
                width: '100%',
                height: '100%'
              }}
            >
              <InputLabel style={{ color: '#6685A7' }}>
                برنده هنوز مشخص نشده است
              </InputLabel>
            </Box>
          </Box>
        </Grid> */}
        <Grid item xs={6}>
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
              <img
                src={data?.gift_detail?.image}
                width="71px"
                height={'110px'}
              />
              <InputLabel>{data?.gift_detail?.name}</InputLabel>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
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
              {data?.participants?.length}
            </InputLabelHeader>
            <InputLabel style={{ color: '#00346D' }}>
              تعداد شرکت کنندگان
            </InputLabel>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
