import React, { useState } from 'react';
import { Box, Drawer, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import InputLabel from 'src/components/Mobile/InputLabel';
import CancelImg from 'src/assets/img/cancel.svg';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { useHistory } from 'react-router-dom';
import MomentFa from 'src/utils/MomentFa';
import Close from 'src/assets/img/close.svg';
import Done from 'src/assets/img/done.svg';
import local_mall from 'src/assets/img/local_mall.svg';
import AcceptConfirm from './AcceptConfirm';
import CancelConfirm from './CancelConfirm';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function Confirmation(props) {
  const data = props.data;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [steps, setSteps] = useState(0);
  const history = useHistory();
  const user_id = JSON.parse(localStorage.getItem('user')).id;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '15px 20px 20px 20px',
          height: 'inherit',
          backgroundColor: 'white',
          height: '70vh',
          overflow: 'auto'
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 15px',
                gap: '10px',

                width: '75px',
                height: '84px',

                background: '#F4F4F4',
                borderRadius: '8px'
              }}
            >
              <img
                src={data?.user_info?.user_profile_image}
                style={{ width: '44px', height: '60px' }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '12px',

                width: '100%',
                height: '70px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0px',
                  gap: '8px',

                  width: '100%',
                  height: '25px'
                }}
              >
                <InputLabel
                  style={{
                    fontWeight: 500,
                    fontSize: '16px',
                    color: '#00346D',
                    lineHeight: '17px'
                  }}
                >
                  {data?.user_info?.first_name +
                    ' ' +
                    data?.user_info?.last_name}
                </InputLabel>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '3px 6px !important',
                    background: '#CCEEF0',
                    borderRadius: '4px',
                    color: '#00AAB5'
                  }}
                >
                  <InputLabel style={{ color: '#00AAB5', fontSize: '12px' }}>
                    {data?.current_state?.label}
                  </InputLabel>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'start',
                  alignItems: 'center',
                  padding: '0px',
                  gap: '4px',
                  // backgroundColor: '#DDF5F6',
                  color: '#335D8A',
                  width: '100%',
                  // height: '25px',
                  padding: '3px 6px',
                  borderRadius: '4px'
                }}
              >
                <InputLabel
                  style={{
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#335D8A',
                    lineHeight: '16px'
                  }}
                >
                  {`ثبت: ${MomentFa(data?.create_date)}`}
                </InputLabel>
              </Box>
            </Box>
          </Box>
        </Box>

        {steps === 0 && data.flow_info.current_state_user === user_id && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '12px',
              gap: '10px',
              background: '#E6EBF0',
              borderRadius: '8px',
              marginTop: '30px'
            }}
          >
            <InputLabel
              style={{
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '25px',
                color: '#00346D',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <img src={local_mall} style={{ marginLeft: '5px' }} />
              وضعیت سفارش را مشخص کنید:
            </InputLabel>

            <Box
              sx={{
                display: 'inline-flex',
                justifyContent: 'flex-end',
                width: '100%',
                gap: 2
              }}
            >
              <ConfirmButton
                disabled={false}
                variant="outlined"
                style={{
                  background: '#33BBC4',
                  color: 'white',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '18px',
                  width: '120px'
                }}
                onClick={() => {
                  // history.push('/sale/products/order/1');
                  setSteps(2);
                }}
                type={'button'}
              >
                <img src={Close} style={{ marginLeft: '5px' }} />
                {'عدم تایید'}
              </ConfirmButton>
              <ConfirmButton
                style={{
                  background: '#00346D',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '18px',
                  width: '120px'
                }}
                onClick={() => setSteps(1)}
              >
                <img src={Done} style={{ marginLeft: '5px' }} />
                {'تایید سفارش'}
              </ConfirmButton>
            </Box>
          </Box>
        )}

        {steps === 1 && (
          <AcceptConfirm steps={steps} setSteps={setSteps} data={data} />
        )}
        {steps === 2 && (
          <CancelConfirm steps={steps} setSteps={setSteps} data={data} />
        )}
      </Box>

      <Drawer
        anchor={'bottom'}
        open={open}
        onClose={() => setOpen(false)}
        classes={{
          paper: classes.paper
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 15px 0px !important',
            // gap: '10px',
            background: '#FFFFFF',
            width: '100%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '10px',
              width: '100%'
            }}
          >
            <InputLabel style={{ color: '#00346D' }}>
              آدرس جدید را وارد کنید:
            </InputLabel>
            <Box sx={{ mt: 1, width: '100%' }}>
              <InputLabel style={{ color: '#A7A5A6' }}>نام آدرس</InputLabel>
              <TextField
                id="name"
                aria-describedby="my-helper-text"
                fullWidth
                placeholder="نام آدرس"
                sx={{
                  background: '#F2F2F2',
                  borderRadius: '4px',
                  margin: '3px 3px'
                }}
                // value={values.name}
                // onChange={handleChange}
                // onBlur={handleBlur}
              />
            </Box>
            <Box sx={{ mt: 1, width: '100%' }}>
              <InputLabel style={{ color: '#A7A5A6' }}>کد پستی</InputLabel>
              <TextField
                id="name"
                aria-describedby="my-helper-text"
                fullWidth
                placeholder="کد پستی"
                sx={{
                  background: '#F2F2F2',
                  borderRadius: '4px',
                  margin: '3px 3px'
                }}
                // value={values.name}
                // onChange={handleChange}
                // onBlur={handleBlur}
              />
            </Box>
            <Box sx={{ mt: 1, width: '100%' }}>
              <InputLabel style={{ color: '#A7A5A6' }}>
                توضیحات بیشتر
              </InputLabel>
              <TextField
                id="name"
                aria-describedby="my-helper-text"
                fullWidth
                placeholder="توضیحات بیشتر"
                sx={{
                  background: '#F2F2F2',
                  borderRadius: '4px',
                  margin: '3px 3px'
                }}
                // value={values.name}
                // onChange={handleChange}
                // onBlur={handleBlur}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
              justifyContent: 'space-between',
              gap: 2,
              width: '100%',
              height: '76px',
              borderTop: '0.5px solid #D3D2D2',
              padding: '12px 16px'
            }}
          >
            <ConfirmButton
              disabled={false}
              // variant="outlined"
              style={{
                background: '#FFFFFF',
                color: '#6685A7',
                border: '0.8px solid #6685A7'
              }}
              // onClick={() => setOpen(false)}
            >
              <img src={CancelImg} />
              {'عدم تایید'}
            </ConfirmButton>
            <ConfirmButton disabled={false} onClick={() => {}}>
              {'تایید سفارش'}
            </ConfirmButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
