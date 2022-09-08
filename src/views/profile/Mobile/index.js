import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  TextField,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import Score from './Score';
import { ArrowBack, KeyboardArrowLeft } from '@mui/icons-material';
import InputLabel from 'src/components/Mobile/InputLabel';
import useAuth from 'src/hooks/useAuth';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import makeStyles from '@mui/styles/makeStyles';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { Minus, Plus } from 'react-feather';
import { alpha, styled } from '@mui/material/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-input': {
    textAlign: 'center'
  }
});
export default function ProfileMobile() {
  const [data, setData] = useState();
  const [openTransfer, setOpenTransfer] = useState(false);
  const [count, setCount] = useState(0);
  const history = useHistory();
  const { logout } = useAuth();
  const classes = useStyles();

  useEffect(() => {
    httpService.get(`${API_BASE_URL}/api/users/get_user_profile/`).then(res => {
      if (res.status === 200) {
        setData(res.data);
      }
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          padding: '25px 10px',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%'
        }}
      >
        <Score />
        <Button
          color="primary"
          fullWidth
          type="submit"
          variant={'outlined'}
          sx={{
            color: '#00346D',
            backgroundColor: '#ECF1F8',
            height: '48px',
            borderRadius: '8px',
            border: '0.733333px solid #00346D',
            fontSize: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 11px',
            fontWeight: 500,
            width: '98%',
            margin: 0,
            fontFamily: 'IRANSans'
          }}
          onClick={() => {
            setOpenTransfer(true);
          }}
        >
          انتقال امتیاز
          <ArrowBack color="#00346D" height="13px" width="13px" />
        </Button>
        <Divider variant="middle" sx={{ margin: '20px 0px', width: '98%' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px',
            width: '98%'
          }}
        >
          <InputLabel style={{ color: '#6685A7' }}>سطح شما</InputLabel>
          <InputLabel style={{ color: '#00346D' }}>
            {data?.user_club?.grade_info?.name}
          </InputLabel>
        </Box>
        <Divider variant="middle" sx={{ margin: '3px 0px', width: '98%' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px',
            width: '98%'
          }}
          onClick={() =>
            history.push({
              pathname: '/profile/detail',
              state: {
                data: data
              }
            })
          }
        >
          <InputLabel style={{ color: '#00346D' }}>اطلاعات کاربری</InputLabel>
          <KeyboardArrowLeft style={{ color: '#00346D' }} />
        </Box>
        <Divider variant="middle" sx={{ margin: '3px 0px', width: '98%' }} />
        <InputLabel
          style={{ color: '#ED1C24', cursor: 'pointer' }}
          onClick={() => {
            logout();
          }}
        >
          خروج از حساب کاربری
        </InputLabel>
      </Box>
      <Drawer
        anchor={'bottom'}
        open={openTransfer}
        onClose={() => {
          setOpenTransfer(false);
        }}
        classes={{
          paper: classes.paper
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: '30px 20px 40px',
            gap: '20px',
            background: '#FFFFFF',
            mb: 6
          }}
        >
          <InputLabel>جهت انتقال امتیاز، اطلاعات زیر را وارد کنید:</InputLabel>
          <Box sx={{ mt: 2, width: '100%' }}>
            <InputLabel style={{ color: '#7B7979' }}>
              کد کاربر دریافت کننده
            </InputLabel>
            <TextField
              id="address"
              aria-describedby="my-helper-text"
              fullWidth
              sx={{
                background: '#F2F2F2',
                borderRadius: '4px',
                margin: '6px 3px'
              }}
              // value={values.address}
              // onChange={handleChange}
            />
          </Box>

          <Box sx={{ mt: 2, width: '100%' }}>
            <InputLabel style={{ color: '#7B7979' }}>امتیاز</InputLabel>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
              <ConfirmButton variant="outlined">50 امتیاز</ConfirmButton>
              <ConfirmButton variant="outlined">100 امتیاز</ConfirmButton>
              <ConfirmButton variant="outlined">200 امتیاز</ConfirmButton>
            </Box>
            <Divider sx={{ m: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
              <ConfirmButton
                variant="outlined"
                sx={{ width: '50px' }}
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                <Plus />
              </ConfirmButton>
              <CssTextField
                value={count}
                onChange={event => setCount(event.target.value)}
                sx={{ textAlign: 'center' }}
              />
              <ConfirmButton
                variant="outlined"
                sx={{ width: '50px' }}
                onClick={() => {
                  setCount(count - 1);
                }}
              >
                <Minus />
              </ConfirmButton>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: '0%',
            width: '55%',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60px',
            gap: '12px',
            width: '100%',
            borderTop: '1px solid #D3D2D2',
            paddingTop: '5px'
          }}
        >
          <ConfirmButton
            disabled={false}
            variant="outlined"
            style={{ width: '150px' }}
            //   onClick={() => setOpen(false)}
          >
            {'لغو'}
          </ConfirmButton>
          <ConfirmButton disabled={false} style={{ width: '150px' }}>
            {'ثبت'}
          </ConfirmButton>
        </Box>
      </Drawer>
    </>
  );
}
