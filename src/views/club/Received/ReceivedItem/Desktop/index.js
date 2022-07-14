import React, { useState } from 'react';
import { Box, Drawer } from '@mui/material';
import { ChevronLeft, Star } from 'react-feather';
import InputLabel from 'src/components/Mobile/InputLabel';
import iphone13 from 'src/assets/img/icons/iphone13.jpeg';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import LinkIconButton from 'src/components/Mobile/Button/LinkIcon';
import Received from 'src/assets/img/icons/received.svg';
import makeStyles from '@mui/styles/makeStyles';
import QR from 'src/assets/img/icons/qr.jpeg';
import { height } from '@mui/system';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function ReceivedItemDesktop({ selected }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '12px 20px 0px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 0px'
            // gap: '480px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '16px'
              // height: '570px'
            }}
          >
            <InputLabelHeader>توضیحات</InputLabelHeader>
            <InputLabel>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است.
            </InputLabel>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: '30px 16px 40px',
                gap: '20px',
                background: '#FFFFFF'
              }}
            >
              <InputLabelHeader style={{ color: '#00346D' }}>
                نحوه انتقال
              </InputLabelHeader>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  flexDirection: 'column'
                }}
              >
                <InputLabel>
                  1- گیرنده جایزه، بروی دکمه “دریافت جایزه” بزند.
                </InputLabel>
                <InputLabel>2- کد QR زیر را اسکن کند.</InputLabel>
                <InputLabel>
                  3- جایزه به جوایز دریافتی کاربر گیرنده منتقل می شود
                </InputLabel>
              </Box>
              {/* <Box
              sx={{
                display: 'flex',
                // justifyContent: 'space-between',
                gap: 2,
                // borderTop: '0.5px solid #D3D2D2',
                padding: '12px 16px'
              }}
            >
              <img src={QR} width="128px" height="128px" />
            </Box> */}
            </Box>
          </Box>

          <LinkIconButton
            style={{ width: '400px' }}
            onClick={() => setOpen(true)}
          >
            <img
              src={Received}
              width="26px"
              height="20px"
              style={{ color: 'white' }}
            />
            <div>انتقال جایزه</div>
          </LinkIconButton>
        </Box>
      </Box>
      <CustomizedDialogs
        open={open}
        handleClose={() => setOpen(false)}
        title={'انتقال جایزه'}
        content={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 16px 12px',
              gap: '20px',
              background: '#FFFFFF'
            }}
          >
            <InputLabelHeader style={{ color: '#00346D' }}>
              {selected.name}
            </InputLabelHeader>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              <InputLabel>
                1- گیرنده جایزه، بروی دکمه “دریافت جایزه” بزند.
              </InputLabel>
              <InputLabel>2- کد QR زیر را اسکن کند.</InputLabel>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 2
                // padding: '12px 16px'
              }}
            >
              <img src={QR} width="348px" height="320px" />
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
            <ConfirmButton variant={'contained'} onClick={() => setOpen(false)}>
              بستن
            </ConfirmButton>
          </Box>
        }
      />
    </>
  );
}
