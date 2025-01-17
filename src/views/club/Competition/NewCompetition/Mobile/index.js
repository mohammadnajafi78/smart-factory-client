import React, { useState, useEffect, useRef } from 'react';
import { Box, Divider } from '@mui/material';
import { useHistory } from 'react-router-dom';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import Participants from './Participants';
import LinkIconButton from 'src/components/Mobile/Button/LinkIcon';
import Present from 'src/assets/img/icons/present.svg';
import iphone13 from 'src/assets/img/icons/iphone13.jpeg';

export default function NewCompetitionMobile(props) {
  // const [awards, setAwards] = useState(['1', '2', '3', '4']);
  const [awards, setAwards] = useState(props.location.state);
  const history = useHistory();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '12px 10px 0px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '16px 0px 0px',
          gap: '30px',
          borderBottom: '0.5px solid #D3D2D2',
          width: '100%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '16px'
          }}
        >
          <InputLabelHeader>توضیحات</InputLabelHeader>
          <InputLabel>{awards?.description}</InputLabel>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '16px'
          }}
        >
          <InputLabelHeader>جوایز مسابقه</InputLabelHeader>
          {/* <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              // padding: '3px',
              gap: '6px',
              backgroundColor: '#CCEEF0'
            }}
          >
            {awards &&
              awards.prizes.map((item, key) => {
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px 16px',
                      gap: '10px',
                      width: '65px',
                      height: '84px',
                      background: '#FFFFFF',
                      borderRadius: '8px'
                    }}
                  >
                    <img src={item?.image} width="44.26px" height="50px" />
                  </Box>
                );
              })}
          </Box> */}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '10px',
            gap: '10px',
            background: '#CCEEF0',
            borderRadius: '8px',
            width: '100%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px 6px',
              gap: '10px'
              // width: '65px',
              // height: '84px',
              // background: '#FFFFFF',
              // borderRadius: '8px'
            }}
          >
            {awards &&
              awards.prizes.map((item, key) => {
                return (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px 16px',
                        gap: '10px',
                        width: '65px',
                        height: '84px',
                        background: '#FFFFFF',
                        borderRadius: '8px'
                      }}
                    >
                      <img src={item?.image} width="44.26px" height="50px" />
                    </Box>
                  </>
                );
              })}
          </Box>

          <Divider sx={{ m: 1 }} color="#66CCD3" style={{ width: '90%' }} />
          {awards &&
            awards.prizes.map((item, key) => {
              return (
                <>
                  <InputLabel style={{ color: '#4F4C4D' }}>
                    {item?.name}
                  </InputLabel>
                </>
              );
            })}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '12px 0px',
          width: '100%',
          gap: '10px',
          marginTop: '6px'
        }}
      >
        <InputLabelHeader style={{ marginBottom: '6px' }}>
          شرکت کنندگان
        </InputLabelHeader>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2px',
            gap: '16px',
            width: '100%'
          }}
        >
          {awards &&
            awards.participants.map((item, key) => {
              return <Participants data={item} key={key} />;
            })}
          <LinkIconButton
            onClick={() => {
              history.push({
                pathname: '/club/participantComp',
                state: { data: awards }
              });
            }}
          >
            <img
              src={Present}
              width="26px"
              height="20px"
              style={{ color: 'white' }}
            />
            <div>شرکت در مسابقه</div>
          </LinkIconButton>
        </Box>
      </Box>
    </Box>
  );
}
