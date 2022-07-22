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
  const data = { name: 'iPhone13', score: '۵۰۰۰', expireDate: '۲۰ اردیبهشت' };
  const [openFirst, setOpenFirst] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '30px',
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
            // height: '570px',
            mt: 2
          }}
        >
          <InputLabel style={{ color: '#231F20', fontWeight: 500 }}>
            توضیحات
          </InputLabel>
          <InputLabel style={{ color: '#4F4C4D' }}>
            {selected && selected.name}
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است. لورم ایپسوم متن ساختگی با تولید سادگی
            نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است. لورم ایپسوم
            متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
            طراحان گرافیک است.
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
            <div>دریافت جایزه</div>
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
              <InputLabelHeader>
                آیا از دریافت این جایزه مطمئن هستید؟
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
                setOpenFirst(false);
                setOpenSecond(true);
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
              <InputLabelHeader>شما جایزه را دریافت کردید</InputLabelHeader>
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
            <LinkButton variant={'contained'}>
              مشاهده جوایز در لیست دریافتی ها
            </LinkButton>
          </Box>
        }
      />
    </>
  );
}
