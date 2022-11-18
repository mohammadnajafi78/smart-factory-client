import React, { useEffect, useState } from 'react';
import { Box, Divider, Drawer } from '@mui/material';
import IconButton from 'src/components/Desktop/Button/Icon';
import LinkButton from 'src/components/Desktop/Button/Link';
import InputLabel from 'src/components/Desktop/InputLabel';
import Received from 'src/assets/img/icons/received.svg';
import Presents from 'src/assets/img/icons/presents.svg';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import makeStyles from '@mui/styles/makeStyles';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { useHistory } from 'react-router-dom';
import useScore from 'src/hooks/useScore';
import ErrorImg from 'src/assets/img/icons/error.svg';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function GetAwardDesktop({ selected }) {
  // const data = { name: 'iPhone13', score: '۵۰۰۰', expireDate: '۲۰ اردیبهشت' };
  const [openFirst, setOpenFirst] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const { setScore } = useScore();
  const history = useHistory();
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState(null);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '0px 30px 30px',
          gap: '100px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '20px',
            width: '100%',
            // height: '570px',
            mt: 2
          }}
        >
          <InputLabel style={{ color: '#231F20', fontWeight: 500 }}>
            توضیحات
          </InputLabel>
          <InputLabel style={{ color: '#4F4C4D' }}>
            {selected && selected.description}
          </InputLabel>
        </Box>
        <Box>
          <IconButton
            onClick={() => setOpenFirst(true)}
            style={{ width: '400px' }}
          >
            <img
              src={Received}
              width="26px"
              height="20px"
              style={{ color: 'white' }}
            />
            {selected.gift_type && selected.gift_type != 4
              ? 'دریافت جایزه'
              : 'شرکت در قرعه کشی'}{' '}
          </IconButton>
        </Box>
      </Box>
      <CustomizedDialogs
        open={openFirst}
        handleClose={() => setOpenFirst(false)}
        title={'جایزه'}
        content={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '60px 0px 0px !important',
              gap: '20px',
              // height: '342px',
              background: '#FFFFFF'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0px',
                gap: '40px'
              }}
            >
              <img src={Presents} alt="awards" width={'61px'} height={'60px'} />
              <InputLabelHeader style={{ color: '#00346D', fontWeight: 500 }}>
                {selected.gift_type && selected.gift_type != 4
                  ? ' آیا از دریافت این جایزه مطمئن هستید؟'
                  : ' آیا از شرکت در قرعه کشی مطمئن هستید؟'}{' '}
              </InputLabelHeader>
            </Box>
          </Box>
        }
        actions={
          <Box
            sx={{
              display: 'inline-flex',
              justifyContent: 'space-between',
              gap: 2,
              width: '100%',
              height: '76px',
              // borderTop: '0.5px solid #D3D2D2',
              padding: '12px 16px'
            }}
          >
            <ConfirmButton
              disabled={false}
              variant="outlined"
              onClick={() => setOpenFirst(false)}
            >
              {'خیر'}
            </ConfirmButton>
            <ConfirmButton
              disabled={false}
              onClick={() => {
                if (selected.gift_type && selected.gift_type != 4) {
                  httpService
                    .post(`${API_BASE_URL}/api/club/user_gifts/`, {
                      gift: selected.id
                    })
                    .then(res => {
                      if (res.status === 201) {
                        setOpenFirst(false);
                        setOpenSecond(true);
                        setScore();
                      }
                    })
                    .catch(err => {
                      if (err.response.status === 417) {
                        setOpenError(true);
                        setError(err.response.data.error);
                        setOpenFirst(false);
                      }
                    });
                } else {
                  httpService
                    .post(`${API_BASE_URL}/api/club/lottery_participant/`, {
                      lot_id: data.id
                    })
                    .then(res => {
                      if (res.status === 201) {
                        setOpenFirst(false);
                        setOpenSecond(true);
                        setScore();
                      }
                    })
                    .catch(err => {
                      if (err.response.status === 417) {
                        setOpenError(true);
                        setError(err.response.data.error);
                        setOpenFirst(false);
                      }
                    });
                }
              }}
            >
              {'بله'}
            </ConfirmButton>
          </Box>
        }
      />

      <CustomizedDialogs
        open={openSecond}
        handleClose={() => setOpenSecond(false)}
        title={'جایزه'}
        content={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '60px 0px 0px !important',
              gap: '20px',
              // height: '342px',
              background: '#FFFFFF'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0px',
                gap: '40px'
              }}
            >
              <img src={Presents} alt="awards" width={'61px'} height={'60px'} />
              <InputLabelHeader style={{ color: '#00346D', fontWeight: 500 }}>
                شما جایزه را دریافت کردید
              </InputLabelHeader>
            </Box>
          </Box>
        }
        actions={
          <Box
            sx={{
              display: 'inline-flex',
              justifyContent: 'space-between',
              gap: 2,
              width: '100%',
              height: '76px',
              // borderTop: '0.5px solid #D3D2D2',
              padding: '12px 16px'
            }}
          >
            <LinkButton
              variant={'contained'}
              onClick={() => history.push('/club/received')}
            >
              مشاهده جوایز در لیست دریافتی ها
            </LinkButton>
          </Box>
        }
      />

      <CustomizedDialogs
        open={openError}
        handleClose={() => setOpenError(false)}
        title={'جایزه'}
        content={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '60px 0px 0px !important',
              gap: '20px',
              // height: '342px',
              background: '#FFFFFF',
              width: '300px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0px',
                gap: '40px'
              }}
            >
              <img src={ErrorImg} alt="awards" width={'61px'} height={'60px'} />
              <InputLabel style={{ color: '#00346D', fontWeight: 500 }}>
                {error}
              </InputLabel>
            </Box>
          </Box>
        }
        actions={
          <Box
            sx={{
              display: 'inline-flex',
              justifyContent: 'space-between',
              gap: 2,
              width: '100%',
              height: '76px',
              // borderTop: '0.5px solid #D3D2D2',
              padding: '12px 16px'
            }}
          >
            <ConfirmButton
              variant={'contained'}
              onClick={() => setOpenError(false)}
            >
              متوجه شدم
            </ConfirmButton>
          </Box>
        }
      />
    </>
  );
}
