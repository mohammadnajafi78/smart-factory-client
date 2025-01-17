import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Desktop/InputLabel';
import Item from './Item';
import LinkIconButton from 'src/components/Desktop/Button/LinkIcon';
import Present from 'src/assets/img/icons/present.svg';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { useSnackbar } from 'notistack';

export default function CompetitionListDesktop({
  selected,
  setSelected,
  setNewCompetition,
  setParticipateNewCompetition
}) {
  const history = useHistory();
  const [competition, setCompetition] = useState([]);
  const [newComp, setNewComp] = useState([]);
  const [scroll, setScroll] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  function handleScroll() {
    setScroll(window.pageYOffset);
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/club/matches/?type=new`)
      .then(res => {
        if (res.status === 200) {
          setNewComp(res.data);
        }
      })
      .catch(ex => {
        if (ex.response.status === 417) {
          enqueueSnackbar(ex.response.data.error, { variant: 'error' });
        } else {
          enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
            variant: 'error'
          });
        }
      });

    httpService
      .get(`${API_BASE_URL}/api/club/matches/`)
      .then(res => {
        if (res.status === 200) {
          setCompetition(res.data);
        }
      })
      .catch(ex => {
        if (ex.response.status === 417) {
          enqueueSnackbar(ex.response.data.error, { variant: 'error' });
        } else {
          enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
            variant: 'error'
          });
        }
      });
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '12px 0px 0px'
        // height: '1000px'
        // overflow: 'auto'
      }}
    >
      {newComp.length > 0 && (
        <Box
          sx={{
            width: '100%',
            height: '174.17px',
            filter: 'drop-shadow(1px 1px 8px rgba(82, 82, 82, 0.25))',
            background:
              'linear-gradient(91.93deg, #5FD5DD -10%, #00AAB5 109.19%)',
            // opacity: 0.7,
            borderRadius: '10px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '11.92px',
              height: '100.92px'
            }}
          >
            <InputLabelHeader style={{ color: 'white' }}>
              مسابقه جدید
            </InputLabelHeader>
            <InputLabel style={{ color: 'white' }}>
              {newComp && newComp[0]?.description}
            </InputLabel>
          </Box>
          <LinkIconButton
            onClick={() => {
              if (newComp && newComp[0]) {
                setNewCompetition(true);
                setSelected(newComp && newComp[0]);
              }
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
      )}

      {competition.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '12px 0px 0px',
            gap: '4px',
            width: '100%'

            // width: 360px;
            // height: '380.83px'
          }}
        >
          <InputLabelHeader
            style={{
              padding: '0px 14px 4px',
              gap: '10px'
            }}
          >
            مسابقات قبلی
          </InputLabelHeader>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '12px 0px 0px',
              gap: '14px',
              width: '100%'
              // overflow: 'auto',
              // height: '510px'
            }}
          >
            {competition &&
              competition.map((item, key) => (
                <Item
                  data={item}
                  key={key}
                  selected={selected}
                  setSelected={setSelected}
                  setNewCompetition={setNewCompetition}
                  setParticipateNewCompetition={setParticipateNewCompetition}
                />
              ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
