import React from 'react';
import { Box, Grid } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import Participants from './Participants';

export default function Details() {
  return (
    <Box>
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
          مسابقه ۱
        </InputLabelHeader>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div style={{ display: 'inline-flex' }}>
                <InputLabel style={{ color: '#00AAB5' }}>
                  زمان برگزاری:
                </InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>{'تاریخ'}</InputLabel>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ display: 'inline-flex' }}>
                <InputLabel style={{ color: '#00AAB5' }}>وضعیت:</InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>
                  {'در جریان'}
                </InputLabel>
              </div>
            </Grid>
          </Grid>
        </Box>
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
                  استفاده از طراحان گرافیک است. لورم ایپسوم متن ساختگی با تولید
                  سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است.
                </InputLabel>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={9}>
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
              height: '200px'
            }}
          >
            <InputLabelHeader style={{ color: '#00346D' }}>
              جوایز مسابقه
            </InputLabelHeader>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                width: '100%'
              }}
            >
              <div>
                {[1, 2, 3].map((item, key) => {
                  return (
                    <InputLabel style={{ color: '#4F4C4D' }}>
                      {item?.name}
                    </InputLabel>
                  );
                })}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end'
                }}
              >
                {[1, 2, 3].map((item, key) => {
                  return (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px 16px',
                        gap: '10px',
                        width: '73px',
                        height: '84px',
                        background: '#FFFFFF',
                        borderRadius: '8px'
                      }}
                    >
                      <img src={item?.image} width="44.26px" height="50px" />
                    </Box>
                  );
                })}
              </div>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '15px',
              gap: '10px',
              width: '100%',
              backgroundColor: 'white',
              borderRadius: '8px',
              height: '200px'
            }}
          >
            <InputLabelHeader
              style={{ color: '#00346D', fontSize: '40px', fontWeight: 700 }}
            >
              ۷۸۱
            </InputLabelHeader>
            <InputLabel style={{ color: '#00346D' }}>
              تعداد شرکت کنندگان
            </InputLabel>
          </Box>
        </Grid>
      </Grid>
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
          //   height: '200px',
          mt: 3
        }}
      >
        <InputLabelHeader style={{ color: '#00346D' }}>
          برندگان مسابقه
        </InputLabelHeader>
        <Grid container spacing={2}>
          {[1, 2, 3].map((item, index) => {
            return (
              <Grid xs={4} item>
                <Participants data={item} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
