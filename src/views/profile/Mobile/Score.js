import { Box, Drawer, Button, TextField, Divider } from '@mui/material';
import React, { useState } from 'react';
import InputLabel from 'src/components/Mobile/InputLabel';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { ArrowBack } from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles';
import { styled } from '@mui/material/styles';
import { Minus, Plus } from 'react-feather';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

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
export default function Score({ data }) {
  const [openTransfer, setOpenTransfer] = useState(false);
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState();

  const classes = useStyles();

  return (
    <>
      {data?.user_club && (
        <>
          <Box sx={{ mt: 1, mb: 1 }}>
            <InputLabel style={{ color: '#A7A5A6' }}>امتیاز من</InputLabel>
            <InputLabel
              style={{ color: '#231F20' }}
            >{`${data?.user_club?.spent_credit} از ${data?.user_club?.total_credit}`}</InputLabel>
          </Box>
          <Divider />
        </>
      )}
      {data?.user_club?.grade_info?.name && (
        <>
          <Box sx={{ mt: 1, mb: 1 }}>
            <InputLabel style={{ color: '#A7A5A6' }}>سطح من</InputLabel>
            <InputLabel style={{ color: '#231F20' }}>
              {data?.user_club?.grade_info?.name}
            </InputLabel>
          </Box>
          <Divider />
        </>
      )}
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
          fontFamily: 'IRANSans',
          mt: 2
        }}
        onClick={() => {
          setOpenTransfer(true);
        }}
      >
        انتقال امتیاز
        <ArrowBack color="#00346D" height="13px" width="13px" />
      </Button>

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
              value={userId}
              onChange={event => setUserId(event.target.value)}
            />
          </Box>

          <Box sx={{ mt: 2, width: '100%' }}>
            <InputLabel style={{ color: '#7B7979' }}>امتیاز</InputLabel>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
              <ConfirmButton variant="outlined" onClick={() => setCount(50)}>
                50 امتیاز
              </ConfirmButton>
              <ConfirmButton variant="outlined" onClick={() => setCount(100)}>
                100 امتیاز
              </ConfirmButton>
              <ConfirmButton variant="outlined" onClick={() => setCount(200)}>
                200 امتیاز
              </ConfirmButton>
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
            onClick={() => setOpenTransfer(false)}
          >
            {'لغو'}
          </ConfirmButton>
          <ConfirmButton
            disabled={false}
            style={{ width: '150px' }}
            onClick={() => {
              httpService
                .post(`${API_BASE_URL}/api/club/user_club/transfer_credit/`, {
                  user_id: userId,
                  credit: count
                })
                .then(res => {
                  if (res.status === 200) {
                    setOpenTransfer(false);
                    setScore();
                  }
                });
            }}
          >
            {'ثبت'}
          </ConfirmButton>
        </Box>
      </Drawer>
    </>
  );
}
