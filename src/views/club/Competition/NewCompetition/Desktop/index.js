import React, { useState } from 'react';
import { Box } from '@mui/material';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Desktop/InputLabel';
import Participants from './Participants';
import IconButton from 'src/components/Desktop/Button/Icon';
import Competition from 'src/assets/img/icons/competition.svg';

export default function NewCompetitionDesktop({
  selected,
  setSelected,
  setNewCompetition,
  setParticipateNewCompetition,
  participateNewCompetition
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0px 0px 50px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '0px 16px 0px',
          gap: '30px',
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
          <InputLabel>{selected.details}</InputLabel>
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
          <InputLabelHeader>جوایز مسابقه</InputLabelHeader>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              width: '100%'
            }}
          >
            <div>
              {selected.prizes.map((item, key) => {
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
              {selected.prizes.map((item, key) => {
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
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
          gap: '10px',
          marginTop: '20px',
          marginBottom: '30px'
        }}
      >
        <InputLabelHeader style={{ padding: '0px 20px' }}>
          شرکت کنندگان
        </InputLabelHeader>
        <Box
          sx={{
            display: 'grid',
            padding: '0px',
            gap: '16px',
            width: '100%',
            gridTemplateColumns: 'repeat(2, 1fr)'
          }}
        >
          {selected.participants &&
            selected.participants.map((item, key) => {
              return <Participants data={item} key={key} />;
            })}
          <Box
            sx={{
              position: 'absolute',
              bottom: '0%',
              width: '55%',
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '60px'
            }}
          >
            <IconButton
              style={{ width: '400px' }}
              onClick={() => {
                setNewCompetition(false);
                setParticipateNewCompetition(true);
                setSelected(selected);
              }}
            >
              <img
                src={Competition}
                width="26px"
                height="20px"
                style={{ color: 'white' }}
              />
              <div>شرکت در مسابقه</div>
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
