import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import Participants from './Participants';
import MomentFa from 'src/utils/MomentFa';
import { filter } from 'lodash';

export default function Details(props) {
  const [data, setData] = useState(props.location.state.data[0]);

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
          {data?.name}
        </InputLabelHeader>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div style={{ display: 'inline-flex' }}>
                <InputLabel style={{ color: '#00AAB5' }}>
                  زمان برگزاری:
                </InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>
                  {MomentFa(data?.start_date)}
                </InputLabel>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <InputLabel style={{ color: '#00AAB5' }}>وضعیت:</InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>
                  <>
                    {data?.status?.toLowerCase() === 'performing' ? (
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
                        <InputLabel
                          style={{ color: '#00AAB5', paddingLeft: 0 }}
                        >
                          در حال برگزاری
                        </InputLabel>
                      </Box>
                    ) : (
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
                          background: '#FDE8E8',
                          borderRadius: '4px',
                          color: '#F4777C !important'
                        }}
                      >
                        <InputLabel
                          style={{ color: '#F4777C', paddingLeft: 0 }}
                        >
                          {data?.status?.toLowerCase() === 'finished'
                            ? 'برگزار شده'
                            : 'برگزار نشده'}
                        </InputLabel>
                      </Box>
                    )}
                  </>
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
                  {data?.details}
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
                {data?.prizes.map((item, key) => {
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
                {data?.prizes.map((item, key) => {
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
                        borderRadius: '8px',
                        backgroundColor: '#CCEEF0'
                      }}
                    >
                      <img src={item?.image} width="100px" height="100px" />
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
              {data?.participant_count}
            </InputLabelHeader>
            <InputLabel style={{ color: '#00346D' }}>
              تعداد شرکت کنندگان
            </InputLabel>
          </Box>
        </Grid>
      </Grid>
      {data?.status?.toLowerCase() === 'finished' && (
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
            {data?.participants
              ?.filter(f => f.is_winner === true)
              .map((item, index) => {
                return (
                  <Grid xs={4} item>
                    <Participants data={item} />
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
